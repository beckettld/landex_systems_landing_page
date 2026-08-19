"use client";

import { useEffect, useRef, useState } from 'react'
import PointField from '@/components/PointField/PointField'
import styles from './Hero.module.css'

const QUERIES = [
  'How many of the 214 sprinkler heads never reached the ceiling?',
  'Is there 36 inches of clear working space in front of panel LP-2?',
  'Where does this chilled-water line start, and what does it feed?',
  'What does the nameplate on this pump actually say?',
]

function QueryConsole() {
  const [reduce, setReduce] = useState(false)
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduce) return
    const full = QUERIES[idx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === full) {
      timeout = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIdx((i) => (i + 1) % QUERIES.length)
    } else {
      const next = deleting
        ? full.slice(0, text.length - 1)
        : full.slice(0, text.length + 1)
      timeout = setTimeout(() => setText(next), deleting ? 18 : 38)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, reduce])

  return (
    <div className={styles.console}>
      <span className={styles.prompt}>ask</span>
      <span className={styles.consoleText}>
        {reduce ? QUERIES[0] : text}
        <span className={styles.cursor} aria-hidden="true" />
      </span>
    </div>
  )
}

function Hero() {
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e: PointerEvent) => {
      const px = e.clientX / window.innerWidth - 0.5
      const py = e.clientY / window.innerHeight - 0.5
      el.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`)
      el.style.setProperty('--tx', `${(px * 10).toFixed(1)}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.backgroundGlow} />
        <div className={styles.backgroundGrid} />
        <PointField />
      </div>

      <div className={styles.content}>
        <div className={styles.textSide}>
          <h1 className={styles.headline}>
            A scan of your building that{' '}
            <span className={styles.headlineAccent}>answers questions.</span>
          </h1>

          <QueryConsole />

          <p className={styles.subheadline}>
            We label every part of the scan and tie it to the system it belongs to. Count what is installed, find a part, measure the space around it, from your desk.
          </p>
          <div className={styles.ctaGroup}>
            <a
              className={styles.primaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20process%20my%20scan"
            >
              Send us a scan to label
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              className={styles.secondaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20book%20a%20call"
            >
              Or book a call
            </a>
          </div>
          <p className={styles.tagline}>
            A walk through the building goes in. A labeled, connected building comes back.
          </p>
        </div>

        <div className={styles.productSide}>
          <div ref={tiltRef} className={styles.productTilt}>
            <img
              src="/assets/product-photo-july.png"
              alt="The Landex viewer: a labeled point cloud of a scanned space, with every element tied to the system it belongs to."
              className={styles.productImage}
            />
            <div className={styles.scanline} aria-hidden="true" />
            <div className={styles.productSheen} aria-hidden="true" />
          </div>
        </div>

      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}

export default Hero
