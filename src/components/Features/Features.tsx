"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Features.module.css'

const questions = [
  {
    title: 'Count it.',
    body: 'How many sprinkler heads are on this floor, and which of the 214 on the schedule never reached the ceiling. How many receptacles went in along this wall.',
  },
  {
    title: 'Measure it.',
    body: 'Is there 36 inches of clear working space in front of panel LP-2. How far is this duct from the slab above it. What is the finished ceiling height in this room.',
  },
  {
    title: 'Trace it.',
    body: 'Where does this chilled-water line start and what does it feed. Which panel is this circuit home-run to. What is upstream of the isolation valve that just failed.',
  },
  {
    title: 'Find what nobody wrote down.',
    body: 'What conduit is running above this ceiling that no as-built accounts for. What got moved in the field and never made it back to a drawing. This is the only question a document-based process can never answer, because the answer is not in any document.',
  },
]

function Features() {
  return (
    <section id="what-you-can-ask" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>What you can ask it</span>
            <h2 className={styles.title}>
              Questions nobody can answer today without walking the building.
            </h2>
          </div>
        </AnimateIn>
        <div className={styles.benefits}>
          {questions.map((b, i) => (
            <AnimateIn key={b.title} delay={0.1 + i * 0.07}>
              <div className={styles.benefit}>
                <span className={styles.benefitMarker} />
                <div className={styles.benefitContent}>
                  <h3 className={styles.benefitTitle}>{b.title}</h3>
                  <p className={styles.benefitBody}>{b.body}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
