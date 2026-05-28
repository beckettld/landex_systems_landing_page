"use client";

import { useRef, useState, useCallback, useEffect } from 'react'
import AnimateIn from '@/components/AnimateIn'
import styles from './ProductDemo.module.css'

const queries = [
  {
    tag: 'Schedule and progress',
    query: 'Is any interior finishing work on floors 5–9 behind schedule?',
    answer: 'Drywall on floors 5–7 is on schedule. Floor 8 ceiling grid is 9 days behind per the look-ahead. Floor 9 finishing has not started because MEP rough-in cleared inspection on May 22, two weeks late.',
    sources: ['Look-ahead schedule, Week of May 19', 'MEP rough-in inspection log, Floor 9 (5-22-26)'],
  },
  {
    tag: 'Coordination and clashes',
    query: 'Where does the new ductwork run conflict with the proposed sprinkler layout?',
    answer: 'The pipe contractor is working from drawings that predate Change Order #47 (April 18). The highlighted runs on levels 4–9 now conflict with the revised sprinkler layout. Flag CO #47 with the mechanical foreman before Tuesday\'s pour.',
    sources: ['CO #47 (4-18-26)', 'Sprinkler layout, Rev. 4 (4-20-26)'],
  },
  {
    tag: 'Document and change history',
    query: 'Which segments of the pipeline are affected by the latest alignment revision?',
    answer: 'Revision 3 (May 9) shifts the alignment 14 feet north between STA 142+00 and STA 168+00. Six segments are affected. The trenching crew is still working off Rev 2 and has completed STA 142+00 through 151+50 on the old alignment.',
    sources: ['ALN-REV-03 (5-9-26)', 'Daily progress log, STA 142–168 corridor'],
  },
  {
    tag: 'Closeout and handover',
    query: "Which systems are commissioned, and what's left before turnover?",
    answer: 'Life safety and fire alarm are commissioned. HVAC commissioning is 60% complete with 4 air handlers remaining. Pressure testing passed on the domestic water loop. Outstanding for turnover: elevator inspection, sprinkler final, and three punch items on egress signage.',
    sources: ['Commissioning log (5-24-26)', 'Punch list, Sheet P-07 (5-21-26)'],
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
        {/* Natural language search demo */}
        <div id="what-you-can-ask" className={styles.searchDemo}>
          <AnimateIn>
          <div className={styles.searchHeaderRow}>
            <div className={styles.searchHeader}>
              <span className={styles.eyebrow}>What you can ask</span>
              <h3 className={styles.searchTitle}>
                Plain-English questions. Answers sourced to the document, the date, and the element.
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
            {queries.map((q, i) => (
              <div key={i} className={styles.queryCard}>
                <div className={styles.queryTag}>{q.tag}</div>
                <div className={styles.queryInput}>
                  <span className={styles.queryPrompt}>&gt;</span>
                  <span className={styles.queryText}>{q.query}</span>
                </div>
                <div className={styles.queryResult}>
                  <p className={styles.queryAnswer}>{q.answer}</p>
                  <div className={styles.querySources}>
                    <span className={styles.querySourcesLabel}>Referenced documents</span>
                    {q.sources.slice(0, 2).map((src, j) => (
                      <div key={j} className={styles.querySourceItem}>
                        <span className={styles.querySourceIcon}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1.5" y="1" width="9" height="10" rx="1" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="4" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="0.6" />
                            <line x1="4" y1="6" x2="8" y2="6" stroke="currentColor" strokeWidth="0.6" />
                            <line x1="4" y1="8" x2="6.5" y2="8" stroke="currentColor" strokeWidth="0.6" />
                          </svg>
                        </span>
                        <span className={styles.querySourceText}>{src}</span>
                      </div>
                    ))}
                    {q.sources.length > 2 && (
                      <span className={styles.querySourceMore}>+{q.sources.length - 2} more</span>
                    )}
                  </div>
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
