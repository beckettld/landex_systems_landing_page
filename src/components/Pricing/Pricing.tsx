"use client";

import AnimateIn from '@/components/AnimateIn'
import PointField from '@/components/PointField/PointField'
import { CONTACT_EMAIL, mailto } from '@/lib/contact'
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
              <span className={styles.pilotLabel}>Start with one scan</span>
              <p className={styles.pilotBody}>
                Send us one you already have. We run a section and send back the counts and plans, so you see the output on your own data before you commit to anything.
              </p>
            </div>
            <a className={styles.primaryCta} href={mailto('scan')}>
              Send us a scan
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className={styles.orEmail}>
              Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the file or a link to it.
            </p>
            <p className={styles.paths}>
              Building software on scans?{' '}
              <a href={mailto('api')}>Request API access.</a>
              <br />
              Nothing captured yet?{' '}
              <a href={mailto('call')}>Book a call.</a>
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
