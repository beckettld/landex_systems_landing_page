"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

const steps = [
  {
    number: '01',
    title: 'Capture comes in however you have it.',
    description: 'A phone walkthrough or a survey-grade laser scan. Use what your project already produces, or send someone through with a phone.',
  },
  {
    number: '02',
    title: 'The model comes back knowing what it is made of.',
    description: 'Every pipe, duct, conduit, fitting and piece of equipment identified as what it is and tied to what it runs to. Linkable in the tooling your team already uses.',
  },
  {
    number: '03',
    title: 'Do it again.',
    description: 'The model lives under the building, not under the project. The next capture updates it rather than replacing it, so what comes back is not another file but the same building, current.',
  },
]

function Solution() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.title}>
            Three steps. The third is the one that matters.
          </h2>
        </AnimateIn>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <AnimateIn key={step.number} delay={0.1 + i * 0.08}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
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

export default Solution
