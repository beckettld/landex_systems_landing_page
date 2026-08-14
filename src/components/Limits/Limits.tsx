"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Limits.module.css'

const limits = [
  'The model is only as good as the scan it starts from. A quick phone walkthrough gives you a quick phone walkthrough. Send a survey-grade scan and you get a model to match.',
  'We see what the capture saw. Nothing inside a wall, above a sealed ceiling, or inside a panel.',
  'We read the nameplates, tags and labels the capture can actually see. If a plate is turned to the wall, painted over, or too low-resolution to make out, we tell you we could not read it rather than guess.',
  'We tell you what is there, not whether it works.',
  'If the capture did not reach something, we show you where it did not reach. We never report a thing missing when we could not see it.',
]

function Limits() {
  return (
    <section id="what-it-does-not-do" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>What it does not do</span>
            <h2 className={styles.title}>
              What we will tell you before you ask.
            </h2>
          </div>
        </AnimateIn>
        <div className={styles.list}>
          {limits.map((text, i) => (
            <AnimateIn key={i} delay={0.1 + i * 0.06}>
              <div className={styles.item}>
                <span className={styles.marker} />
                <p className={styles.itemBody}>{text}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Limits
