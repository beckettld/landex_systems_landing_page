"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Security.module.css'

const steps = [
  {
    number: '01',
    title: 'Your documentation comes in.',
    description: 'Drawings, models, submittals, schedules, change orders, line lists, completion records. Whatever your team is already maintaining as the project\'s source of truth.',
  },
  {
    number: '02',
    title: 'Your capture comes in.',
    description: 'Phone video, 360 cameras, drone footage, laser scans. Whatever your team is already capturing in the field. No new hardware, no new field behavior.',
  },
  {
    number: '03',
    title: 'We compare the two.',
    description: 'For every element the documents describe, we check the field. For every element the field shows, we check the documents. Substitutions, undocumented changes, wrong specs, completion gaps, and missing change orders all surface as flags with the source documents cited.',
  },
  {
    number: '04',
    title: 'Your team works the list.',
    description: 'Review the report and the flags in the browser, assign issues, resolve or escalate. Integrate with Procore, Autodesk Construction Cloud, and your existing stack via API.',
  },
]

function Security() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.title}>
            Documents in. Field in. Disagreements out.
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
