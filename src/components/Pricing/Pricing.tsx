"use client";

import AnimateIn from '@/components/AnimateIn'
import PointField from '@/components/PointField/PointField'
import styles from './Pricing.module.css'

function Pricing() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.bg} aria-hidden="true">
        <PointField />
      </div>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>Work with us</span>
          <h2 className={styles.title}>
            Send a scan.{' '}
            <span className={styles.accent}>See what comes back.</span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.cta}>
            <div className={styles.pilotBox}>
              <span className={styles.pilotLabel}>Already producing scans?</span>
              <p className={styles.pilotBody}>
                Send us one. We run a section through it and send it back, so you see what it does on your own data before you commit to anything.
              </p>
            </div>
            <a
              className={styles.primaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20make%20my%20model%20smart"
            >
              Send us a model
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className={styles.orEmail}>
              Nothing captured yet? <a href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20book%20a%20call">Book a call</a> and we&rsquo;ll walk you through it.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
