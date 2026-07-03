"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Features.module.css'

function Features() {
  return (
    <section id="industries" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Who it's for</span>
            <h2 className={styles.title}>
              Built for the VP of Operations at a mission-critical MEP sub.
            </h2>
          </div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.prose}>
            <p className={styles.body}>
              If you self-perform mission-critical work and own the labor budget, this is for you. On data center, hospital, lab, and fab jobs you carry your own crews and you answer for whether they land under budget. Landex tells you which scope is running over while the crew is still on site, not at closeout when the number is fixed. MEP is where the gap between earned and burned opens fastest, and where element-dense scopes make an element-level count worth more than a coverage estimate.
            </p>
            <p className={styles.body}>
              The same engine extends to any element-rich scope, industrial process, energy, and heavy infrastructure among them. We start where the count pays for itself first.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Features
