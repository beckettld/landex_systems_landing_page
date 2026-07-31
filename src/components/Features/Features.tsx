"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Features.module.css'

const layers = [
  {
    title: 'Layer 1, ask it.',
    body: 'Where is the shutoff for this room. What is above this ceiling. Plain language, true answers, no drawing set.',
  },
  {
    title: 'Layer 2, trace it.',
    body: 'If this closes, what goes dark. What is upstream of the alarm that just fired.',
  },
  {
    title: 'Layer 3, run on it.',
    body: 'Building systems, asset registries and work orders bind to the same elements instead of maintaining their own lists.',
  },
  {
    title: 'Layer 4, act on it.',
    body: 'A building holding an accurate model of itself can be trusted to make decisions inside it.',
  },
]

function Features() {
  return (
    <section id="what-runs-on-it" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>What runs on it</span>
            <h2 className={styles.title}>
              An operating system for the building.
            </h2>
            <div className={styles.prose}>
              <p className={styles.body}>
                Every system that touches a building keeps its own partial picture of it, and none of those pictures agree. Landex is the one they can share, because every element has an identity, a position and a set of connections.
              </p>
            </div>
          </div>
        </AnimateIn>
        <div className={styles.benefits}>
          {layers.map((b, i) => (
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
        <AnimateIn delay={0.1}>
          <p className={styles.closing}>
            Layer 1 is available now. The rest are why the model has to stay right.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Features
