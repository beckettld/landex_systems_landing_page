"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

function Solution() {
  return (
    <section id="what-landex-does" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.twoCol}>
          <AnimateIn>
            <div className={styles.colLeft}>
              <span className={styles.eyebrow}>What Landex does</span>
              <h2 className={styles.title}>
                We compare what the documents say to what is actually there.
              </h2>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className={styles.colRight}>
              <p className={styles.subtitle}>
                Landex starts with your project documentation: the model, the submittal log, the equipment list, the line specs, the completion records, the change orders. That is the description of what should exist. We then look at the physical project through whatever your team is already capturing, including laser scans, 360 walkthroughs, and drone footage. That is the description of what does exist.
              </p>
              <p className={styles.body}>
                Where the two records disagree, we generate a flag with the photo evidence next to the governing document, so your team can resolve it before the cost of fixing it multiplies.
              </p>
              <p className={styles.body} style={{ marginTop: '16px' }}>
                By handover, every element on your project carries a verified record of what it is and what governs it. The as-built is true for the first time.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Solution
