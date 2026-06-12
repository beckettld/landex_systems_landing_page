"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Pricing.module.css'

function Pricing() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo'
      });
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.cta}>
            <span className={styles.eyebrow}>Tell us about your project</span>
            <p className={styles.ctaHeadline}>Tell us about your project.</p>
            <p className={styles.ctaDesc}>
              Let's do a 20-minute call. We will walk you through what Landex would do on a project like yours, and what a pilot looks like.
            </p>
            <div className={styles.pilotBox}>
              <span className={styles.pilotLabel}>Start small</span>
              <p className={styles.pilotBody}>
                We can start on a small section of one project, whether it is one room, one module, or one system. You see what we find, and you decide whether it is worth expanding to a whole site.
              </p>
            </div>
            <button className={styles.primaryCta} onClick={openCalendly}>
              Book a call
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p className={styles.orEmail}>
              or email <a href="mailto:allen@landexsystems.com">allen@landexsystems.com</a>
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
