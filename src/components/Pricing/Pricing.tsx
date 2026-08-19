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
          <span className={styles.eyebrow}>Start here</span>
          <h2 className={styles.title}>
            See what is actually{' '}
            <span className={styles.accent}>in your building.</span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.cta}>
            <div className={styles.pilotBox}>
              <span className={styles.pilotLabel}>Already have a scan?</span>
              <p className={styles.pilotBody}>
                Send us a point cloud you already have. We label a section and send it back, so you see what the model does on your own building before you commit to anything.
              </p>
            </div>
            <a
              className={styles.primaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20process%20my%20scan"
            >
              Send us a scan to label
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className={styles.orEmail}>
              No scan yet? <a href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20book%20a%20call">Book a call</a> and we&rsquo;ll walk you through it.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
