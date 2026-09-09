"use client";

import AnimateIn from '@/components/AnimateIn'
import PointField from '@/components/PointField/PointField'
import ContactForm from '@/components/ContactForm/ContactForm'
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
            <p className={styles.orEmail}>
              Get in touch here or email <a href="mailto:allen@landexsystems.com">allen@landexsystems.com</a>.
            </p>
            <ContactForm />
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
