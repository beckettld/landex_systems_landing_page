"use client";

import { useEffect } from 'react'
import Lenis from 'lenis'

// Buttery inertia scrolling + smooth in-page anchor jumps.
// Honors prefers-reduced-motion by not initializing at all.
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    // Route in-page anchor / button scrolls through Lenis so they share the easing.
    const onAnchor = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const id = link.getAttribute('href')?.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80 })
    }
    document.addEventListener('click', onAnchor)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Expose so other components (e.g. nav buttons) can drive it.
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onAnchor)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])

  return null
}
