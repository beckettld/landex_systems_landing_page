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
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.priceRow}>
                  <span className={styles.price}>$200</span>
                  <span className={styles.period}>/month</span>
                </div>
                <p className={styles.planDesc}>
                  One project. Index up to 1,000 documents per month. Full query access for your team.
                </p>
              </div>
              <ul className={styles.featureList}>
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

            <div className={styles.divider} />

            <div className={styles.aside}>
              <p className={styles.asideHeadline}>Not sure, or need something bigger?</p>
              <p className={styles.asideDesc}>
                Bring us a project and we&apos;ll show you what we&apos;d produce. A 20-minute conversation. No commitment.
              </p>
              <button className={styles.secondaryCta} onClick={openCalendly}>
                Book a call
                <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <p className={styles.orEmail}>
                or email us at <a href="mailto:allen@landexsystems.com">allen@landexsystems.com</a>
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
