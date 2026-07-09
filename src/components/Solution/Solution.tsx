"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

const steps = [
  {
    number: '01',
    title: 'The trades film as they build',
    description: 'Each GC and sub captures their own scope on a phone, before the wall closes, during install, and after. The people who did the work document the work. No 360 rig, no dedicated walker.',
  },
  {
    number: '02',
    title: 'Landex orders it in time',
    description: 'The clips are assembled into one time-ordered record, so every element is on file from before it went in to after it was covered. Scrub back to any wall, on any date.',
  },
  {
    number: '03',
    title: 'Every element is identified and reconciled',
    description: 'Landex tags each installed component, keys it to the element, and reconciles it against the approved submittal and spec. Disagreements are flagged. This is the step a video archive cannot do.',
  },
  {
    number: '04',
    title: 'The owner takes the record at handoff',
    description: 'At delivery the owner receives a durable, itemized record of every installed element, backed by the footage that proves it. Owned outright. Portable. It outlives the project, and it outlives us.',
  },
]

function Solution() {
  return (
    <section id="what-landex-does" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.title}>
            The trades already on site film their own work. Landex turns it into the record the owner keeps.
          </h2>
          <p className={styles.subtitle}>
            No rig, no new field behavior. Everyone films the narrow scope they know best, on the phone in their pocket.
          </p>
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
