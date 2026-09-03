"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Difference.module.css'

function Difference() {
  return (
    <section id="principles" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>Principles</span>
          <h2 className={styles.title}>
            The understanding comes first. Everything you receive is decoded from it.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.prose}>
            <p className={styles.body}>
              Every job that needs to know what is in a building starts by sending someone to look, and none of that looking survives to the next job. We understand the scan once, down to the point, and every question after that is a readout.
            </p>
            <p className={styles.body}>
              The model is built from what is actually there, then checked against what your documents say should be. A drawing describes intent. The capture is the receipt. Your capture stays yours, and what comes back arrives in formats your tools already read.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Difference
