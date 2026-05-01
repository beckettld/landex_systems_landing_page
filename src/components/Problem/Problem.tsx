"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Problem.module.css'

function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>The problem</span>
          <h2 className={styles.title}>
            The physical world generates an enormous trail of paper. None of it is searchable.
          </h2>
        </AnimateIn>
        <div className={styles.points}>
          <AnimateIn delay={0.1}>
            <div className={styles.point}>
              <div className={styles.pointMarker} />
              <div className={styles.pointContent}>
                <h3 className={styles.pointTitle}>Decades of documents, no way through them</h3>
                <p className={styles.pointBody}>
                  Every building, parcel, pipeline, well, claim, and project leaves behind decades of drawings, as-builts, permits, inspection reports, deeds, scans, and reports. Most of it is stranded across PDFs, network drives, file rooms, and acquired archives that nobody can search.
                </p>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className={styles.point}>
              <div className={styles.pointMarker} />
              <div className={styles.pointContent}>
                <h3 className={styles.pointTitle}>Hours or days to answer a single question</h3>
                <p className={styles.pointBody}>
                  When someone needs to make a decision about a place (buy it, build on it, dig under it, take it over, insure it), they spend hours or days reconstructing context from a pile of documents. AI tools that should help have nothing structured to work with.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Problem
