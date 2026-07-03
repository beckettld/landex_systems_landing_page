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
                Trend data you see the same day a scope starts slipping has a different value than trend data you see at the WIP review. When the productivity factor on a package turns negative, you can reallocate crew, escalate a sub, or revise the plan. If you learn it three weeks later, those options have closed and the margin that was recoverable is locked in.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>It rolls up too high to trace.</h3>
              <p className={styles.proseBody}>
                You learn the job is running behind. You do not learn which IWP is causing it, which elements are missing, or whether the issue is productivity, rework, or a scope that was underbid. A variance you cannot decompose is a variance you cannot address. The number stays red.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Problem
