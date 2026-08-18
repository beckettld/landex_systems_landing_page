"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './FinalCTA.module.css'

function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <h2 className={styles.headline}>
            Drop in a folder. See what we&apos;d produce.
          </h2>
          <p className={styles.subheadline}>
            Bring us a project, a parcel, an asset. Anything with a pile of documents behind it. We&apos;ll index it, you ask the questions, and we&apos;ll show you what plain-English answers look like when they&apos;re sourced from your own records. A 20-minute conversation about the documents, the questions, and the work.
          </p>
          <a
            className={styles.primaryCta}
            href="mailto:allen@landexsystems.com?subject=Landex%20demo"
          >
            Book a call
            <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p className={styles.email}>
            or email us at <a href="mailto:allen@landexsystems.com">allen@landexsystems.com</a>
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Contact
