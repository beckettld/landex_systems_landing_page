"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Difference.module.css'

function Difference() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>The difference</span>
          <h2 className={styles.title}>
            Reality capture is built for the build. Landex is built for what you keep.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.prose}>
            <p className={styles.body}>
              The tools on site today are during-construction instruments. They help the crew see the job while the job is live, and the record lives inside a platform the general contractor pays for. When the GC demobilizes, that access leaves with them. The owner inherits a building and no durable record of what is inside it.
            </p>
            <p className={styles.body}>
              Landex inverts the customer. The owner is who we build for, and the deliverable is an asset they own, not a login they rent. An itemized, reconciled record of every installed element, handed over at delivery, portable, and yours for the life of the building. The footage is the receipt. The record is the product.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Difference
