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
          <span className={styles.eyebrow}>The pilot</span>
          <h2 className={styles.title}>
            One scope, one pay cycle. Prove it where the money is already moving.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.replaceGrid}>
            <div className={styles.replaceItem}>
              <div className={styles.replaceLabel}>Scope — one scope, one pay cycle</div>
              <div className={styles.replaceDesc}>
                Pick a single scope on a live job. We prove it where the money is already moving.
              </div>
            </div>
            <div className={styles.replaceItem}>
              <div className={styles.replaceLabel}>Flow — video in, verified model out</div>
              <div className={styles.replaceDesc}>
                You walk and upload. Landex tags installed and missing. You confirm. It writes back to the model.
              </div>
            </div>
            <div className={styles.replaceItem}>
              <div className={styles.replaceLabel}>Terms — fixed fee, fixed window</div>
              <div className={styles.replaceDesc}>
                Scoped and priced up front. No integration project, no open-ended commitment.
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
