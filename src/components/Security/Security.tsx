"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Security.module.css'

const steps = [
  {
    number: '01',
    title: 'Your documentation comes in.',
    description: 'Model, equipment list, line specs, schedule of values, baseline schedule, change orders. The budget and the plan for every element.',
  },
  {
    number: '02',
    title: 'Your capture comes in.',
    description: 'Phone video, 360 cameras, drone footage, laser scans. Whatever your team already captures in the field. No new hardware, no new field behavior, no specialist to run it.',
  },
  {
    number: '03',
    title: 'We count, then measure.',
    description: 'We count what is installed against the documents, convert that to earned value per component, and set it against planned cost and schedule. Actual cost pulls from your job cost system.',
  },
  {
    number: '04',
    title: 'Your team acts on the variance.',
    description: 'Open any scope and see what is behind, what is bleeding, and the exact elements driving it. Reallocate, escalate, or hold, while it still changes the outcome. Integrate with Procore, Autodesk Construction Cloud, and your existing stack via API.',
  },
]

function Security() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.title}>
            Documents in. Field in. A counted earned value, out.
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
