"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Features.module.css'

const benefits = [
  {
    title: 'Operate.',
    body: 'From day one, find the exact valve, damper, or conduit run behind the wall without opening it. The record you took at handoff is the map for the next thirty years.',
  },
  {
    title: 'Accept.',
    body: 'Before you sign off at handoff, prove the installed work matches the approved submittals, element by element. Catch what does not while the trades are still on site, not months after they have gone.',
  },
  {
    title: 'Prove.',
    body: 'When a system fails years later, you already hold the record of exactly what was installed, at element grain, captured the day you took the keys.',
  },
  {
    title: 'It does not go stale.',
    body: 'A live model rots because no one funds keeping it current. This is a frozen record, faithful to the moment each element was closed up. Nothing to maintain. As true in year twelve as it was at delivery.',
  },
]

function Features() {
  return (
    <section id="why-now" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Why now</span>
            <h2 className={styles.title}>
              The record, finally delivered with the building.
            </h2>
          </div>
        </AnimateIn>
        <div className={styles.benefits}>
          {benefits.map((b, i) => (
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
