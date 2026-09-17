"use client";

import AnimateIn from '@/components/AnimateIn'
import { CONTACT_EMAIL } from '@/lib/contact'
import EmailLink from '@/components/EmailLink/EmailLink'
import styles from './WhoFor.module.css'

function WhoFor() {
  return (
    <section id="who" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>Who it&rsquo;s for</span>
        </AnimateIn>
        <div className={styles.grid}>
          <AnimateIn delay={0.05}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Users.</h3>
              <p className={styles.cardBody}>
                Get the counts, plans, and measurements out of a scan without adding drafting hours. It comes back labeled and measured, ready to finish.
              </p>
              <EmailLink className={styles.cardLink} topic="scan">
                Send us a scan
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </EmailLink>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.12}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Software teams.</h3>
              <p className={styles.cardBody}>
                Give your users answers from their scans without building the 3D layer yourself.
              </p>
              <EmailLink className={styles.cardLink} topic="api">
                API access: email {CONTACT_EMAIL}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </EmailLink>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default WhoFor
