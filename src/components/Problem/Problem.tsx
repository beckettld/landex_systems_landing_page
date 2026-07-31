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
            A finished building is the least documented thing on the project.
          </h2>
        </AnimateIn>
        <div className={styles.proseList}>
          <AnimateIn delay={0.1}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The drawings describe intent, not installation.</h3>
              <p className={styles.proseBody}>
                Every set of as-builts is a description of what was supposed to happen, marked up to whatever degree someone had time for. The installer routed around a conflict, the sub swapped a fitting, the sequence changed. Some of that made it back onto paper. Most of it did not.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The people who knew are gone.</h3>
              <p className={styles.proseBody}>
                The knowledge of what is behind a given wall lives in the heads of the trades who put it there. They demobilize at closeout. Nothing you inherit at handoff captures what they knew.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>And the documentation is unreadable to the people who need it.</h3>
              <p className={styles.proseBody}>
                The facilities team that runs the building for the next thirty years does not read construction documents. They were not written for them. So the record that does exist goes unused, and the answer to where is that shutoff comes from opening the ceiling.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Problem
