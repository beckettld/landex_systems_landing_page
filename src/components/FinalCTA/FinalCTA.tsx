"use client";

import styles from './FinalCTA.module.css'

function Contact() {
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
        <h2 className={styles.headline}>
          Turn your archive into an asset.
        </h2>
        <p className={styles.subheadline}>
          Book a 20-minute call. We&apos;ll ask about your archive, your team&apos;s workflow, and whether we&apos;re actually a fit.
        </p>
        <button className={styles.primaryCta} onClick={openCalendly}>
          Book a call
          <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className={styles.email}>
          or email us at <a href="mailto:allen@landexsystems.com">allen@landexsystems.com</a>
        </p>
      </div>
    </section>
  )
}

export default Contact
