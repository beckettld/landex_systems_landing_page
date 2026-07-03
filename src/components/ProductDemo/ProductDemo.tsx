"use client";

import { useRef, useState, useCallback, useEffect } from 'react'
import AnimateIn from '@/components/AnimateIn'
import styles from './ProductDemo.module.css'

const flags = [
  {
    tag: 'The scope losing money.',
    lead: 'Mechanical earned 42 percent of its hours and burned 60.',
    body: 'The count shows why: 126 of 300 VAV boxes and 18 of 40 air handlers actually set. The productivity factor is underwater, and every missing element is listed, photo evidence next to the governing document.',
  },
  {
    tag: 'The early warning.',
    lead: 'A scope still inside tolerance, but the count falls further behind plan every week.',
    body: 'The report surfaces the slope, not just the snapshot, so you catch the bleed before it crosses the line.',
  },
]

function ProductDemo() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 5)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5)
    const maxScroll = el.scrollWidth - el.clientWidth
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* What we flag */}
        <div id="what-we-flag" className={styles.searchDemo}>
          <AnimateIn>
          <div className={styles.searchHeaderRow}>
            <div className={styles.searchHeader}>
              <span className={styles.eyebrow}>What shows up in the report</span>
              <h3 className={styles.searchTitle}>
                Every number traces to counted elements.
              </h3>
            </div>
            <div className={styles.carouselNav}>
              <button
                className={styles.carouselBtn}
                aria-label="Scroll left"
                onClick={() => scroll(-1)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13 4 L7 10 L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className={styles.carouselBtn}
                aria-label="Scroll right"
                onClick={() => scroll(1)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4 L13 10 L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          </AnimateIn>

          <div className={`${styles.carouselWrap} ${canScrollLeft ? styles.fadeLeft : ''} ${canScrollRight ? styles.fadeRight : ''}`}>
          <div className={styles.carouselTrack} ref={trackRef}>
            {flags.map((f, i) => (
              <div key={i} className={styles.queryCard}>
                <div className={styles.queryTag}>{f.tag}</div>
                <div className={styles.queryResult}>
                  <p className={styles.flagLead}>{f.lead}</p>
                  <p className={styles.queryAnswer} style={{ height: 'auto', WebkitLineClamp: 'unset' }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${20 + scrollProgress * 80}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDemo
