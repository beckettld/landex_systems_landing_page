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
            The tools on site give you a picture. Landex gives you a record.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.prose}>
            <p className={styles.body}>
              Reality capture built for the general contractor renders a shallow model, a clay shell with a light tag on top saying this is an HVAC system. That is a picture of the job, not something software can reason across. And it lives in a platform the GC pays for. When the GC demobilizes, that access leaves with them.
            </p>
            <p className={styles.body}>
              Landex is built for the owner's side of the table. The record is yours, it outlives the project, and it is structured so that the software you buy in year ten can actually use it.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Difference
