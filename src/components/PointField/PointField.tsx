"use client";

import { useEffect, useRef } from 'react'
import styles from './PointField.module.css'

// A slowly rotating 3D point cloud rendered on a 2D canvas.
// Pseudo-perspective projection; parallax follows the pointer.
export default function PointField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 520 : 1500
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w = 0
    let h = 0
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Point cloud shaped as a broad, shallow slab (like a scanned floor plane
    // seen at an angle) with some vertical scatter.
    type P = { x: number; y: number; z: number; r: number; g: number; b: number; tw: number }
    const pts: P[] = []
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() * 2 - 1) * 1.35
      const y = (Math.random() * 2 - 1) * 0.55 + Math.sin(x * 3) * 0.05
      const z = (Math.random() * 2 - 1) * 1.35
      // Mostly cool greenish-white, some sand, a few bright green.
      const roll = Math.random()
      let r = 176, g = 198, b = 190
      if (roll > 0.86) { r = 196; g = 180; b = 154 }       // sand
      else if (roll > 0.8) { r = 93; g = 153; b = 128 }    // bright green
      pts.push({ x, y, z, r, g, b, tw: Math.random() * Math.PI * 2 })
    }

    const f = 2.6            // focal length
    const spread = 0.62      // how wide the cloud maps onto the viewport
    let angle = 0
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let t = 0
    let raf = 0
    let running = true

    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetX = (e.clientX - cx) / cx
      targetY = (e.clientY - cy) / cy
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const onVisibility = () => {
      running = !document.hidden
      if (running && !raf) raf = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVisibility)

    const frame = () => {
      raf = 0
      if (!running) return

      mouseX += (targetX - mouseX) * 0.04
      mouseY += (targetY - mouseY) * 0.04
      angle += reduce ? 0 : 0.0009
      t += 0.016

      const rotY = angle + mouseX * 0.35
      const tilt = -0.35 + mouseY * 0.12
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(tilt)
      const sinX = Math.sin(tilt)

      ctx.clearRect(0, 0, w, h)

      const cx = w * 0.5
      const cy = h * 0.52
      const scaleBase = Math.min(w, h * 1.6)

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        // rotate around Y
        const xz = p.x * cosY - p.z * sinY
        const zz = p.x * sinY + p.z * cosY
        // tilt around X
        const yz = p.y * cosX - zz * sinX
        const zzz = p.y * sinX + zz * cosX

        const denom = f - zzz
        if (denom <= 0.2) continue
        const persp = f / denom
        const sx = cx + xz * spread * scaleBase * persp * 0.5
        const sy = cy + yz * spread * scaleBase * persp * 0.5

        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue

        const depth = (persp - 0.55) / 1.4 // 0..~1 near
        const twinkle = reduce ? 1 : 0.7 + 0.3 * Math.sin(t * 1.4 + p.tw)
        const alpha = Math.max(0, Math.min(0.6, depth * 0.72)) * twinkle
        const size = Math.max(0.5, depth * 1.9)

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size)
      }

      raf = requestAnimationFrame(frame)
    }

    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(frame)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
