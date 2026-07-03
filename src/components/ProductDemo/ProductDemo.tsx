"use client";

import { useRef, useState, useCallback, useEffect } from 'react'
import AnimateIn from '@/components/AnimateIn'
import styles from './ProductDemo.module.css'

const flags = [
  {
    tag: 'The scope going burned over earned.',
    lead: 'Mechanical: 42 percent of planned hours earned. 60 percent burned. The gap opened three weeks ago.',
    body: '126 of 300 VAV boxes and 18 of 40 air handlers actually set. The productivity factor is below 1.0 and falling. Every missing element is listed by IWP, with the labor hours at risk if the slope does not reverse.',
  },
  {
    tag: 'The pay app you should not sign.',
    lead: 'Billed 60 percent. Installed 42 percent. 174 elements are not in the building yet.',
    body: 'The count shows what is actually set against the governing documents. Every element the pay app claims is checked against the field, with photo evidence. You know what to hold before the app is approved.',
  },
  {
    tag: 'The early warning.',
    lead: 'A scope still inside tolerance. The productivity factor has slipped three weeks running.',
    body: 'The report surfaces the slope, not just the snapshot. A scope trending the wrong direction before it crosses the threshold is a scope you can still fix. The same data a month later is a postmortem.',
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
