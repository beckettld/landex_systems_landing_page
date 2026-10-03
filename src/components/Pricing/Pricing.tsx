"use client";

import AnimateIn from '@/components/AnimateIn'
import PointField from '@/components/PointField/PointField'
import EmailLink from '@/components/EmailLink/EmailLink'
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
            <EmailLink className={styles.primaryCta} topic="scan">
              Send us a scan
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </EmailLink>
            <p className={styles.orEmail}>
              That opens an email to Allen. Attach the file or a link to it.
            </p>
            <p className={styles.paths}>
              Or start on your own: <a href="/tesseract/pricing">pick a plan</a>, upload your scans, and get an IFC or Revit model checked against the scan, usually within an hour.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
