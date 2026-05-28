"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Security.module.css'

const steps = [
  {
    number: '01',
    title: 'Capture comes in.',
    description: 'Phone video, 360 cameras, drone footage, laser scans. Landex ingests whatever your team is already capturing. No proprietary hardware.',
  },
  {
    number: '02',
    title: 'The model gets built and updated.',
    description: 'Multimodal models reconstruct the site as it stands today and align it against the design model. Every element is identified, located, and tied to its source documents.',
  },
  {
    number: '03',
    title: "The project's context is embedded.",
    description: 'Drawings, RFIs, submittals, schedules, change orders, inspection sign-offs. All linked to the elements they govern. The model knows what document version applies to what physical work.',
  },
  {
    number: '04',
    title: 'You query the model.',
    description: 'Ask in plain English. Get answers sourced to the document, the date, and the element. Integrate with Procore, Autodesk Construction Cloud, and your existing stack via API.',
  },
]

function Security() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.title}>
            Captures in. Queryable model out.
          </h2>
        </AnimateIn>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <AnimateIn key={step.number} delay={i * 0.08}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Security
