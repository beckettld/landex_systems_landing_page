"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

const steps = [
  {
    number: '01',
    title: 'Take a video',
    description: 'Walk the area and capture the recently installed parts on a phone. No special rig.',
  },
  {
    number: '02',
    title: 'Upload it',
    description: 'Landex automatically tags which components appear in the video and marks each one installed or missing.',
  },
  {
    number: '03',
    title: 'Confirm or flag',
    description: 'Select more, deselect, or add a note if the walker finds a tag is wrong. The engineer stays in control.',
  },
  {
    number: '04',
    title: 'Write back to the model',
    description: 'Each element is marked installed and verified on the 3D model, as a timestamped, attributable install record.',
  },
]

function Solution() {
  return (
    <section id="what-landex-does" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>What Landex does</span>
          <h2 className={styles.title}>
            An ordinary walk video, turned into a verified install record in four steps.
          </h2>
          <p className={styles.subtitle}>
            No new hardware, no new field behavior. The engineer stays in control the whole way through.
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
