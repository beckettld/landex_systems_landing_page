"use client";

// The /tesseract viewer: a real scan with the model Tesseract returned for it,
// drawn over the points, both in their real colours (the model in the bim
// site's real look). `view` cross-fades between the scan, the model, or both.
// Same render loop as the home page hero (HeroCloud): slow orbit, drag to look
// around, paused offscreen. One scene per mount; data from
// scripts/build-tesseract-scene.py (already centred, z up).
//
// Loaded via next/dynamic({ ssr: false }) so `three` stays out of the
// initial bundle.

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type TesseractView = 'scan' | 'both' | 'model'

type Manifest = { count: number; lo: number[]; hi: number[]; point_size: number; dist: number }
type Model = { groups: { kind: 'solid' | 'glass' | 'light'; p: number[]; i: number[]; c: number[] }[] }

const vertexShader = /* glsl */ `
  attribute vec3 aColor;
  uniform float uSize;
  uniform float uScale;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = clamp(uSize * uScale / -mv.z, 1.0, 4.0);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uAlpha;
  uniform float uBase;
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    gl_FragColor = vec4(vColor * uBase, smoothstep(0.25, 0.08, d) * uAlpha);
  }
`

export default function TesseractViewer({
  scene: sceneId,
  view,
  onReady,
  className,
}: {
  /** folder under public/tesseract-scene/; the parent remounts the viewer (key) to switch scenes */
  scene: string
  view: TesseractView
  onReady?: () => void
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef(view)
  const onReadyRef = useRef(onReady)
  viewRef.current = view
  onReadyRef.current = onReady

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let disposed = false
    let raf = 0
    let renderer: THREE.WebGLRenderer | null = null
    const cleanups: (() => void)[] = []
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const start = async () => {
      let manifest: Manifest
      let model: Model
      let buf: ArrayBuffer
      try {
        const [m, md, b] = await Promise.all([
          fetch(`/tesseract-scene/${sceneId}/manifest.json`),
          fetch(`/tesseract-scene/${sceneId}/model.json`),
          fetch(`/tesseract-scene/${sceneId}/cloud.bin`),
        ])
        if (!m.ok || !md.ok || !b.ok) throw new Error('tesseract scene fetch failed')
        manifest = await m.json()
        model = await md.json()
        buf = await b.arrayBuffer()
      } catch {
        return
      }
      if (disposed) return

      // --- points -------------------------------------------------------------------------------
      const N = manifest.count
      const { lo, hi } = manifest
      const q = new Uint16Array(buf, 0, N * 3)
      const rgb = new Uint8Array(buf, N * 6, N * 3)
      const pos = new Float32Array(N * 3)
      const sc = [0, 1, 2].map((k) => (hi[k] - lo[k]) / 65535)
      for (let i = 0; i < N * 3; i += 3) {
        pos[i] = lo[0] + q[i] * sc[0]
        pos[i + 1] = lo[1] + q[i + 1] * sc[1]
        pos[i + 2] = lo[2] + q[i + 2] * sc[2]
      }

      let w = container.clientWidth || 600
      let h = container.clientHeight || 420
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
      } catch {
        return
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h)
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const world = new THREE.Group() // the data is z-up; three is y-up
      world.rotation.x = -Math.PI / 2
      scene.add(world)

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aColor', new THREE.BufferAttribute(rgb, 3, true))
      const pmat = new THREE.ShaderMaterial({
        uniforms: {
          uSize: { value: manifest.point_size },
          uScale: { value: h * dpr * 0.5 },
          uAlpha: { value: 1 },
          uBase: { value: 1 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      })
      const points = new THREE.Points(geo, pmat)
      world.add(points)

      // --- model: the real look, lit; glass see-through, light fittings glowing ------------------
      world.add(new THREE.AmbientLight(0xffffff, 0.55))
      world.add(new THREE.HemisphereLight(0xffffff, 0x9aa4b8, 0.6))
      for (const [x, y, z, i] of [[1, 0.6, 2, 0.9], [-1, -0.8, 0.4, 0.5], [0.3, -0.5, -1, 0.45]]) {
        const d = new THREE.DirectionalLight(0xffffff, i) // the last one lights soffits and undersides
        d.position.set(x, y, z)
        world.add(d)
      }
      // full opacity of each kind in "Model"; "Both" draws them lighter so the scan shows through
      const OPACITY = { solid: 1, glass: 0.35, light: 1 }
      const mats: { mat: THREE.Material & { opacity: number }; kind: keyof typeof OPACITY }[] = []
      let edgeMat: THREE.LineBasicMaterial | null = null
      const geos: THREE.BufferGeometry[] = []
      for (const g of model.groups) {
        const mg = new THREE.BufferGeometry()
        mg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(g.p), 3))
        mg.setAttribute('color', new THREE.BufferAttribute(new Uint8Array(g.c), 3, true))
        mg.setIndex(g.i)
        geos.push(mg)
        const common = { vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: 0, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }
        const mat =
          g.kind === 'light'
            ? new THREE.MeshBasicMaterial(common)
            : new THREE.MeshPhongMaterial({ ...common, flatShading: true, shininess: g.kind === 'glass' ? 90 : 8, specular: g.kind === 'glass' ? 0xaabbcc : 0x111111 })
        mats.push({ mat, kind: g.kind })
        const mesh = new THREE.Mesh(mg, mat)
        mesh.renderOrder = g.kind === 'glass' ? 3 : 2
        world.add(mesh)
        if (g.kind === 'solid') {
          const eg = new THREE.EdgesGeometry(mg, 30)
          geos.push(eg)
          edgeMat = new THREE.LineBasicMaterial({ color: 0x0c0c0e, transparent: true, opacity: 0 })
          const lines = new THREE.LineSegments(eg, edgeMat)
          lines.renderOrder = 4
          world.add(lines)
        }
      }

      const camera = new THREE.PerspectiveCamera(40, w / h, 1, manifest.dist * 20)
      const DEFAULT_POLAR = THREE.MathUtils.degToRad(62)
      // a narrower card needs the camera further back to keep the whole span in frame
      const radiusFor = (aspect: number) => manifest.dist * Math.max(1, 1.25 / aspect)
      let radius = radiusFor(w / h)
      camera.position.setFromSpherical(new THREE.Spherical(radius, DEFAULT_POLAR, THREE.MathUtils.degToRad(35)))

      const AUTO_SPEED = 0.5
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 0, 0)
      controls.enablePan = false
      controls.enableZoom = false // page scroll keeps working over the canvas
      controls.enableDamping = true
      controls.dampingFactor = 0.07
      controls.rotateSpeed = 0.45
      controls.minPolarAngle = THREE.MathUtils.degToRad(30)
      controls.maxPolarAngle = THREE.MathUtils.degToRad(84)
      controls.autoRotate = !reduceMotion
      controls.autoRotateSpeed = AUTO_SPEED
      controls.update()

      let dragging = false
      let resumeAt = Infinity
      if (!reduceMotion) {
        controls.addEventListener('start', () => {
          dragging = true
          controls.autoRotate = false
          resumeAt = Infinity
        })
        controls.addEventListener('end', () => {
          dragging = false
          resumeAt = performance.now() + 900
        })
      }
      const ease = (t: number) => t * t * (3 - 2 * t)

      const resize = () => {
        if (!renderer) return
        w = container.clientWidth || w
        h = container.clientHeight || h
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        radius = radiusFor(w / h)
        pmat.uniforms.uScale.value = h * dpr * 0.5
      }
      const ro = new ResizeObserver(resize)
      ro.observe(container)
      cleanups.push(() => ro.disconnect())

      let visible = !document.hidden
      let onScreen = true
      const io = new IntersectionObserver((es) => {
        onScreen = es[0]?.isIntersecting ?? true
        if (onScreen && visible) loop()
      })
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
      let scanA = 1
      let modelA = 0
      const sph = new THREE.Spherical()
      const off = new THREE.Vector3()

      const render = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now
        const k = 1 - Math.pow(0.004, dt)
        const v = viewRef.current
        const showScan = v !== 'model'
        const showModel = v !== 'scan'

        // in Both the model sits over the scan at part strength so the points show through
        scanA += ((showScan ? 1 : 0) - scanA) * k
        modelA += ((showModel ? (showScan ? 0.62 : 1) : 0) - modelA) * k
        pmat.uniforms.uAlpha.value = scanA
        points.visible = scanA > 0.01
        for (const m of mats) {
          m.mat.opacity = OPACITY[m.kind] * modelA
          m.mat.depthWrite = m.kind !== 'glass' && modelA > 0.95
          m.mat.visible = modelA > 0.005
        }
        if (edgeMat) {
          edgeMat.opacity = 0.45 * modelA
          edgeMat.visible = modelA > 0.005
        }

        if (!dragging) {
          off.copy(camera.position).sub(controls.target)
          sph.setFromVector3(off)
          sph.phi += (DEFAULT_POLAR - sph.phi) * (1 - Math.pow(0.22, dt))
          sph.radius = radius
          off.setFromSpherical(sph)
          camera.position.copy(controls.target).add(off)
          if (now >= resumeAt) {
            controls.autoRotate = true
            controls.autoRotateSpeed = AUTO_SPEED * ease(Math.min((now - resumeAt) / 1800, 1))
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
        pmat.dispose()
        for (const g of geos) g.dispose()
        for (const m of mats) m.mat.dispose()
        edgeMat?.dispose()
        renderer?.dispose()
        if (renderer?.domElement.parentNode === container) container.removeChild(renderer.domElement)
      })
    }

    start()
    return () => {
      disposed = true
      if (raf) cancelAnimationFrame(raf)
      for (const fn of cleanups) fn()
    }
  }, [])

  return <div ref={containerRef} className={className} />
}
