"use client";

import styles from './Solution.module.css'

const steps = [
  {
    number: '01',
    title: 'Send us your records',
    description: 'PDFs, scans, CAD exports, paper records — we handle any format. No prep work required on your end.',
  },
  {
    number: '02',
    title: 'We assign geographic context',
    description: 'Every document gets tied to a precise location. We do the work of figuring out what\'s where.',
  },
  {
    number: '03',
    title: 'Your team searches by location',
    description: 'Type in a site, address, or coordinates — instantly see every relevant record your organization has ever produced.',
  },
]

function Solution() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>How it works</span>
        <h2 className={styles.title}>
          We index your archive. You search it like a database.
        </h2>
        <p className={styles.subtitle}>
          No ripping and replacing your existing systems. We work with what you have.
        </p>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solution
