"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Pricing.module.css'

function Pricing() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/allen-landexsystems/landex-systems-demo'
      });
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>Start here</span>
          <h2 className={styles.title}>
            One area. Fixed fee, fixed window.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.replaceGrid}>
            <div className={styles.replaceItem}>
              <div className={styles.replaceLabel}>Scope</div>
              <div className={styles.replaceDesc}>
                Pick an area or a system. Capture it with a phone, or send the scan you already have.
              </div>
            </div>
            <div className={styles.replaceItem}>
              <div className={styles.replaceLabel}>Flow</div>
              <div className={styles.replaceDesc}>
                Capture in, modeled and labeled output back, linked in your tooling. We walk your team through what came back.
              </div>
            </div>
            <div className={styles.replaceItem}>
              <div className={styles.replaceLabel}>Terms</div>
              <div className={styles.replaceDesc}>
                Fixed fee, fixed window, defined deliverable. The model is yours, the capture is yours, export any time in standard formats. If you stop working with us, you keep everything.
              </div>
            </div>
          </div>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <div className={styles.cta}>
            <button className={styles.primaryCta} onClick={openCalendly}>
              Book a call
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className={styles.audienceLine}>
            Built for systems-dense buildings held for the long term. Data centers, pharma and GMP, healthcare campuses, fabs, university campuses.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
