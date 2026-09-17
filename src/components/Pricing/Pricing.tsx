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
            Send us a scan.{' '}
            <span className={styles.accent}>We will show you what we were able to return.</span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.cta}>
            <a className={styles.primaryCta} href={mailto('scan')}>
              Send us a scan
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className={styles.orEmail}>
              That goes to <a href={mailto('scan')}>{CONTACT_EMAIL}</a>. Attach the file or a link to it.
            </p>
            <p className={styles.paths}>
              Rather do it yourself?{' '}
              <a href={PLATFORM_URL} target="_blank" rel="noopener">Upload it to the platform</a>
              {' '}and have answers in about 20 minutes.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
