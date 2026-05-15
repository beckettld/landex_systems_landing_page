"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Pricing.module.css'

const replaces = [
  {
    label: 'Records research',
    description: 'Weeks of manual document pull and gap-filling before a project, transaction, or review can start.',
  },
  {
    label: 'Due diligence packets',
    description: 'Staff hours assembling the document record set for acquisitions, transfers, and financings.',
  },
  {
    label: 'ROW and easement review',
    description: 'Manual search through deed books, plats, and title chains to establish what crosses a parcel.',
  },
  {
    label: 'Integrity packages',
    description: 'Rebuilding the documentation set from scratch for each pipeline or asset integrity cycle.',
  },
  {
    label: 'Asset transfer documentation',
    description: 'Reconstructing the physical record when a facility, corridor, or system changes hands.',
  },
]

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
          <span className={styles.eyebrow}>What we replace</span>
          <h2 className={styles.title}>
            The weeks currently spent on records work.
          </h2>
          <p className={styles.subtitle}>
            The value is not a better search tool. It is what stops happening when your team stops digging through files.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.replaceGrid}>
            {replaces.map((item) => (
              <div key={item.label} className={styles.replaceItem}>
                <h3 className={styles.replaceLabel}>{item.label}</h3>
                <p className={styles.replaceDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <div className={styles.cta}>
            <p className={styles.ctaHeadline}>See what it would produce on your documents.</p>
            <p className={styles.ctaDesc}>
              Bring us a corpus. We will show you what we would extract. A 20-minute conversation. No commitment.
            </p>
            <button className={styles.primaryCta} onClick={openCalendly}>
              Book a call
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p className={styles.orEmail}>
              or email us at <a href="mailto:allen@landexsystems.com">allen@landexsystems.com</a>
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pricing
