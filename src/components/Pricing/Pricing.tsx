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
    <section id="pricing" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <p className={styles.eyebrow}>Pricing</p>
          <h2 className={styles.headline}>Start today or build something bigger</h2>
        </AnimateIn>

        <div className={styles.grid}>
          <AnimateIn className={styles.stretchWrapper}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <p className={styles.planName}>Standard</p>
                <div className={styles.priceRow}>
                  <span className={styles.price}>$200</span>
                  <span className={styles.period}>/month</span>
                </div>
                <p className={styles.planDesc}>
                  One project. Up to 1,000 documents. Full query access for your team.
                </p>
              </div>
              <ul className={styles.featureList}>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  1 project
                </li>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  Index up to 1,000 documents per month
                </li>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  Plain-English queries with source citations
                </li>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  As-builts, scans, plans, deeds, reports
                </li>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  Refundable within the month if not satisfied
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/00w3co6xXepI6gr2Y7bjW00"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryCta}
              >
                Get started
                <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </AnimateIn>

          <AnimateIn className={styles.stretchWrapper}>
            <div className={`${styles.card} ${styles.cardCustom}`}>
              <div className={styles.cardHeader}>
                <p className={styles.planName}>Custom</p>
                <div className={styles.priceRow}>
                  <span className={styles.price}>Let&apos;s talk</span>
                </div>
                <p className={styles.planDesc}>
                  Multiple projects, larger document sets, or specific integrations. We scope it with you.
                </p>
              </div>
              <ul className={styles.featureList}>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  Unlimited projects
                </li>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  No document cap
                </li>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  Custom ingestion and data pipelines
                </li>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  Dedicated onboarding and support
                </li>
                <li className={styles.feature}>
                  <span className={styles.check}>&#10003;</span>
                  Volume pricing
                </li>
              </ul>
              <div className={styles.customCtaGroup}>
                <button className={styles.primaryCta} onClick={openCalendly}>
                  Book a call
                  <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <p className={styles.orEmail}>
                  or <a href="mailto:allen@landexsystems.com">email us</a>
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Pricing
