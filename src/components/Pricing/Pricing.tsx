"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Pricing.module.css'

function Pricing() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>Start here</span>
          <h2 className={styles.title}>
            See what is actually in your building.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.cta}>
            <a
              className={styles.primaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20demo"
            >
              Book a call
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
