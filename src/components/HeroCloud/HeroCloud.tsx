"use client";

// Live point-cloud viewer for the hero. Renders a decimated construction scan
// — the rohbau_02005 structural shell with exposed beams, columns, and MEP
// (positions + class label only; no RGB/provenance/embeddings ship to the
// browser; see scripts/build-hero-cloud.py). Points show in true color at rest
// and slowly auto-rotate. When `highlight` names one or more semantic classes,
// those points light up in their class color and grow while the rest dim.
//
// Loaded via next/dynamic({ ssr: false }) so `three` stays out of the initial
// bundle and nothing touches WebGL on the server.

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

type Manifest = {
  count: number
  offsets: { position: number; label: number }
  bounds: { min: number[]; max: number[]; diag: number }
  classes: { id: number; name: string; hex: string }[]
}

const MAX_CLASSES = 64

// Points are white and constant. A query only *colorizes* its target class
// (no dimming of the rest, so there's no distracting brightness flicker).
const vertexShader = /* glsl */ `
  attribute float aLabel;
  uniform vec3 uPalette[${MAX_CLASSES}];
  uniform float uActive[${MAX_CLASSES}];
  uniform float uSize;
  uniform float uScale;
  varying vec3 vColor;

  void main() {
    int ci = int(aLabel + 0.5);
    float act = uActive[ci];

    vColor = mix(vec3(0.92), uPalette[ci], act);
    vColor *= (1.0 + act * 0.25);

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float boost = 1.0 + act * 1.1;
    gl_PointSize = clamp(uSize * boost * uScale / -mv.z, 1.0, 9.0 * (uScale / 400.0 + 0.5));
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float a = smoothstep(0.25, 0.08, d);
    gl_FragColor = vec4(vColor, a);
  }
`

// Most object classes share one gray in the source palette, which would be
// invisible against the white cloud. Give the query-highlightable classes their
// own vivid, distinct hues so each answer reads clearly.
const HIGHLIGHT_COLORS: Record<string, string> = {
  beam: '#ffb638',
  column: '#37d495',
  wall: '#37c6e0',
  tga: '#8a7bff',
  'window cutout': '#ff6a4d',
  'wall cutout': '#ff6a4d',
  'ceiling cutout': '#ff6a4d',
  'door rough opening': '#ff6a4d',
}

export default function HeroCloud({
  highlight,
  onReady,
  onError,
  className,
}: {
  highlight: string[]
  onReady?: () => void
  onError?: () => void
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Bridges React props/lifecycle into the imperative render loop.
  const targetActiveRef = useRef<Float32Array>(new Float32Array(MAX_CLASSES))
  const nameToIdRef = useRef<Map<string, number>>(new Map())
  const highlightRef = useRef<string[]>(highlight)
  // Keep callbacks in refs so the init effect can run exactly once.
  const onReadyRef = useRef(onReady)
  const onErrorRef = useRef(onError)
  onReadyRef.current = onReady
  onErrorRef.current = onError

  // Recompute the target activation vector whenever the highlight set changes.
  useEffect(() => {
    highlightRef.current = highlight
    const map = nameToIdRef.current
    const target = new Float32Array(MAX_CLASSES)
    for (const name of highlight) {
      const id = map.get(name)
      if (id != null && id < MAX_CLASSES) target[id] = 1
    }
    targetActiveRef.current = target
  }, [highlight])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let renderer: THREE.WebGLRenderer | null = null
    let raf = 0
    const cleanups: (() => void)[] = []

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const start = async () => {
      let manifest: Manifest
      let buf: ArrayBuffer
      try {
        const [mRes, bRes] = await Promise.all([
          fetch('/hero-cloud/manifest.json'),
          fetch('/hero-cloud/cloud.bin'),
        ])
        if (!mRes.ok || !bRes.ok) throw new Error('hero-cloud fetch failed')
        manifest = await mRes.json()
        buf = await bRes.arrayBuffer()
      } catch (e) {
        if (!disposed) onErrorRef.current?.()
        return
      }
      if (disposed) return

      const N = manifest.count
      const pos = new Float32Array(buf, manifest.offsets.position, N * 3)
      const lab = new Uint16Array(buf, manifest.offsets.label, N)

      // Expand label to float for the ShaderMaterial attribute.
      const aLabel = new Float32Array(N)
      for (let i = 0; i < N; i++) aLabel[i] = lab[i]

      // class name -> id, and a palette lookup by class id.
      const nameToId = new Map<string, number>()
      const palette = new Float32Array(MAX_CLASSES * 3)
      const tmp = new THREE.Color()
      for (const c of manifest.classes) {
        nameToId.set(c.name, c.id)
        if (c.id < MAX_CLASSES) {
          tmp.set(HIGHLIGHT_COLORS[c.name] ?? c.hex)
          palette[c.id * 3] = tmp.r
          palette[c.id * 3 + 1] = tmp.g
          palette[c.id * 3 + 2] = tmp.b
        }
      }
      nameToIdRef.current = nameToId
      // Re-resolve any highlight that arrived before the manifest loaded.
      {
        const t = new Float32Array(MAX_CLASSES)
        for (const name of highlightRef.current) {
          const id = nameToId.get(name)
          if (id != null && id < MAX_CLASSES) t[id] = 1
        }
        targetActiveRef.current = t
      }

      let w = container.clientWidth || 560
      let h = container.clientHeight || 360

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
      } catch {
        if (!disposed) onErrorRef.current?.()
        return
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h)
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      renderer.domElement.style.display = 'block'
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(52, w / h, 0.05, manifest.bounds.diag * 12)
      const diag = manifest.bounds.diag
      // Build frame is standard +Y up (the source y-down was flipped at export).
      // Place the camera on a halo above the room, angled gently down into it;
      // auto-rotation then sweeps that halo around the vertical axis.
      camera.up.set(0, 1, 0)
      const dist = diag * 0.72
      const DEFAULT_POLAR = THREE.MathUtils.degToRad(60) // from vertical (shallow slope)
      camera.position.set(0, dist * Math.cos(DEFAULT_POLAR), dist * Math.sin(DEFAULT_POLAR))

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aLabel', new THREE.BufferAttribute(aLabel, 1))

      const curActive = new Float32Array(MAX_CLASSES)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uPalette: { value: palette },
          uActive: { value: curActive },
          uSize: { value: 0.02 },
          uScale: { value: (h * dpr) * 0.5 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: true,
        depthWrite: true,
      })

      const points = new THREE.Points(geo, material)
      scene.add(points)

      const AUTO_SPEED = 0.55
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 0, 0)
      controls.enablePan = false
      controls.enableZoom = false // keep page scroll working over the canvas
      controls.enableDamping = true
      controls.dampingFactor = 0.07
      controls.rotateSpeed = 0.42
      // Keep drags within a tasteful vertical band so the framing always reads.
      controls.minPolarAngle = THREE.MathUtils.degToRad(40)
      controls.maxPolarAngle = THREE.MathUtils.degToRad(78)
      controls.autoRotate = !reduceMotion
      controls.autoRotateSpeed = AUTO_SPEED
      controls.update()

      // Drag-to-explore that eases back into the idle spin. While the user
      // drags, auto-rotation is off; on release we wait a beat, then ramp the
      // spin speed 0 -> full so it resumes seamlessly (no jump), and drift the
      // vertical angle back toward the default slope.
      let dragging = false
      let resumeAt = Infinity // timestamp (ms) to begin ramping the spin back
      const RESUME_DELAY = 900
      const RESUME_RAMP = 1800
      if (!reduceMotion) {
        controls.addEventListener('start', () => {
          dragging = true
          controls.autoRotate = false
          resumeAt = Infinity
        })
        controls.addEventListener('end', () => {
          dragging = false
          resumeAt = performance.now() + RESUME_DELAY
        })
      }
      const easeInOut = (t: number) => t * t * (3 - 2 * t)

      const resize = () => {
        if (!renderer) return
        w = container.clientWidth || w
        h = container.clientHeight || h
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        material.uniforms.uScale.value = h * dpr * 0.5
      }
      const ro = new ResizeObserver(resize)
      ro.observe(container)
      cleanups.push(() => ro.disconnect())

      // Pause the loop when the tab is hidden or the hero scrolls offscreen.
      let visible = true
      let onScreen = true
      const io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0]?.isIntersecting ?? true
          if (onScreen && visible) loop()
        },
        { threshold: 0.01 },
      )
      io.observe(container)
      cleanups.push(() => io.disconnect())

      const onVis = () => {
        visible = !document.hidden
        if (visible && onScreen) loop()
      }
      document.addEventListener('visibilitychange', onVis)
      cleanups.push(() => document.removeEventListener('visibilitychange', onVis))

      let readyFired = false
      let last = performance.now()
      const driftSph = new THREE.Spherical()
      const driftOff = new THREE.Vector3()

      const render = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now

        // Ease per-class activation toward its target for a smooth cross-fade.
        const target = targetActiveRef.current
        const k = 1 - Math.pow(0.0025, dt) // ~time-constant, framerate independent
        for (let i = 0; i < MAX_CLASSES; i++) {
          curActive[i] += (target[i] - curActive[i]) * k
        }

        // While the user isn't dragging, gently ease the vertical slope back to
        // the default and (after the delay) ramp the idle spin back in.
        if (!dragging) {
          driftOff.copy(camera.position).sub(controls.target)
          driftSph.setFromVector3(driftOff)
          driftSph.phi += (DEFAULT_POLAR - driftSph.phi) * (1 - Math.pow(0.22, dt))
          driftOff.setFromSpherical(driftSph)
          camera.position.copy(controls.target).add(driftOff)

          if (now >= resumeAt) {
            controls.autoRotate = true
            controls.autoRotateSpeed = AUTO_SPEED * easeInOut(Math.min((now - resumeAt) / RESUME_RAMP, 1))
          }
        }

        controls.update()
        renderer!.render(scene, camera)

        if (!readyFired) {
          readyFired = true
          onReadyRef.current?.()
        }
      }

      const tick = (now: number) => {
        if (disposed || !visible || !onScreen) {
          raf = 0
          return
        }
        render(now)
        raf = requestAnimationFrame(tick)
      }
      const loop = () => {
        if (!raf && !disposed) {
          last = performance.now()
          raf = requestAnimationFrame(tick)
        }
      }
      loop()

      cleanups.push(() => {
        controls.dispose()
        geo.dispose()
        material.dispose()
        renderer?.dispose()
        if (renderer?.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
      })
    }

    start()

    return () => {
      disposed = true
      if (raf) cancelAnimationFrame(raf)
      for (const fn of cleanups) fn()
    }
  }, [])

  return <div ref={containerRef} className={className} aria-hidden="true" />
}
