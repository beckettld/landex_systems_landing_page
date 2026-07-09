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
            You take the keys. You don't get a record of what's inside.
          </h2>
        </AnimateIn>
        <div className={styles.proseList}>
          <AnimateIn delay={0.1}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The as-built is fiction.</h3>
              <p className={styles.proseBody}>
                The drawings you inherit at handoff were updated by hand, if at all. By the time the walls close, the record of what actually went in has drifted from the model. You own a building you cannot see into, described by documents you cannot fully trust.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The evidence is gone when you need it.</h3>
              <p className={styles.proseBody}>
                When a system fails, when you need to prove the installed equipment matched the approved submittal, when a dispute opens years later, the proof is scattered across people and inboxes that have long since moved on. Nothing held it, at the element, at the moment it went in.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>Acceptance can't be proven, so closeout drags.</h3>
              <p className={styles.proseBody}>
                Turnover stalls because no one can show, element by element, that what was installed matches what was approved. The commissioning agent holds the acceptance pen and nothing clean to sign against. Handoff slips. The record that would have cleared it was never captured.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Problem
