"use client";

import { useRef, useState, useCallback, useEffect } from 'react'
import AnimateIn from '@/components/AnimateIn'
import styles from './ProductDemo.module.css'

const flags = [
  {
    tag: 'The scope falling behind',
    lead: 'East pipe rack: 218 of 540 spools set against a planned 290.',
    body: 'Verified completion on the rack is 40 percent against a planned 54. The 72-spool gap is listed by line number, with the tie-ins downstream that slip if it is not closed. You see the exact work that is behind, in time to add crew before it cascades.',
  },
  {
    tag: 'The scope you are overpaying for',
    lead: 'Mechanical: billed 60 percent, 126 of 300 VAV boxes and 18 of 40 air handlers actually set.',
    body: 'The pay app claims 60 percent on the mechanical package. The count confirms 42 percent installed against the schedule. You are being billed for 174 elements that are not in the building yet. Each one is listed, with the photo evidence next to the governing document.',
  },
  {
    tag: 'The scope bleeding cost',
    lead: 'Earned value on 412 verified elements: 52 percent. Cost report: spent like 64.',
    body: 'The package has 412 of its elements counted and earned against budget. Actual cost from your job cost system is well past that. The 12-point gap is broken out by element class, so you can see whether it is rework, productivity, or a scope that was underbid, not just that a number is red.',
  },
  {
    tag: 'The early warning',
    lead: 'Variance turning negative three weeks running.',
    body: 'A scope still inside tolerance, but the count is falling further behind plan each week. The report surfaces the slope, not just the snapshot, so you catch the bleed before it crosses the line instead of after.',
  },
  {
    tag: 'The coverage map',
    lead: '847 of 894 elements counted. Here is what we still need.',
    body: 'Earned value is only as honest as the elements you actually counted. 847 of 894 were confirmed against the documents this week. 47 remain uncounted, with the targeted shots needed to close coverage on the next walk, so your variance never rests on a black box.',
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
