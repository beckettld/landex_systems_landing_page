"use client";

import { useRef, useState, useCallback, useEffect } from 'react'
import AnimateIn from '@/components/AnimateIn'
import styles from './ProductDemo.module.css'

const flags = [
  {
    tag: 'The substitution',
    lead: 'Fisher approved. Crane installed. No record of the change.',
    body: 'The submittal log lists Fisher for FCV-2034. The field shows a Crane valve installed at that location. No change record exists in the RFI log, the submittal revisions, or the change order register. Two additional substitution flags this week, both involving motor model differences on equipment in the P-100 series. Each flag includes the source submittal page, the field photo, and the absence of any documented approval.',
  },
  {
    tag: 'The completion gap',
    lead: 'Signed off Thursday. Still open Monday.',
    body: 'The completions database shows System 7B as fully signed off as of last Thursday. The capture from Monday shows two block valves in the open position, one flange unbolted, and the temporary blind still in place on the south header. The opposite case also shows up: System 9A is physically complete in the field, but no ITR has been signed.',
  },
  {
    tag: 'The undocumented change',
    lead: 'A line moved. No MOC, no RFI, no inspection record.',
    body: 'A diff between the capture from two weeks ago and the capture from this week shows a 4-inch line on the east rack has been rerouted. The displaced pipe support has been removed and two new welds added. No MOC, no RFI, and no change order on file. The new welds carry no inspection record because none was scheduled.',
  },
  {
    tag: 'The wrong spec',
    lead: '600# specified. 300# installed. Full pressure at startup.',
    body: 'Line 12-P-114 is specified as 600# in the piping class. The flanges on the run between FCV-2034 and the pump skid show an 8-bolt pattern, which corresponds to 300#. The wrong pressure class is installed on a line that will see full operating pressure at startup.',
  },
  {
    tag: 'The coverage map',
    lead: '847 of 894 verified. Here is what we still need.',
    body: '847 of 894 elements on this week\'s report were verified against the documents. 47 remain unverified, mostly insulated components and six with no readable identity from current capture angles. The report includes the list of unverified elements and the targeted shots needed to close coverage in next week\'s walk.',
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
              <span className={styles.eyebrow}>What we flag</span>
              <h3 className={styles.searchTitle}>
                A sample of what shows up in the report.
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
