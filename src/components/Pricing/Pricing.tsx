"use client";

import AnimateIn from '@/components/AnimateIn'
import PointField from '@/components/PointField/PointField'
import { CONTACT_EMAIL, PLATFORM_URL, mailto } from '@/lib/contact'
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
            Upload a scan.{' '}
            <span className={styles.accent}>See what comes back.</span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.cta}>
            <div className={styles.pilotBox}>
              <span className={styles.pilotLabel}>Self serve, about 20 minutes</span>
              <p className={styles.pilotBody}>
                Upload one you already have. Crop it to a section if you like, and see the counts and plans on your own data before you commit to anything.
              </p>
            </div>
            <a className={styles.primaryCta} href={PLATFORM_URL} target="_blank" rel="noopener">
              Upload a scan
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className={styles.paths}>
              Everything else goes to one inbox. API access, a call before you upload, or a scan you would rather we ran:{' '}
              <a href={mailto('call')}>{CONTACT_EMAIL}</a>
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
