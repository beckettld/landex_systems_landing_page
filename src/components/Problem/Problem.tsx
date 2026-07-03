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
            Your earned value is late, and it rests on a number nobody counted.
          </h2>
        </AnimateIn>
        <div className={styles.proseList}>
          <AnimateIn delay={0.1}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>Percent complete is self-reported.</h3>
              <p className={styles.proseBody}>
                Earned value is budget times percent complete, and on every job that percent is handed up from the field. Nobody counts the boxes. The productivity factor your VP watches rests on a number the crew reported.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>It lands too late to act on.</h3>
              <p className={styles.proseBody}>
                The mismatch surfaces in the weekly reconciliation, the WIP review, or at closeout. If labor is burning faster than work is installing, that gap may not be visible until the job has already lost the time or the budget. Catching it in week 3 instead of week 12 is the difference between a fix and an overage.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>It rolls up too high to trace.</h3>
              <p className={styles.proseBody}>
                You learn the job is running behind. You do not learn that you are billed for 174 elements that are not set yet, or which IWP they are in. A number you cannot open is a number you cannot fix.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Problem
