"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Features.module.css'

const benefits = [
  {
    title: 'No more manual BIM entry.',
    body: 'The video does the tagging. Your engineer confirms the model instead of transcribing walkdown notes into it by hand.',
  },
  {
    title: 'Installed or missing, at the element.',
    body: 'You see exactly what is in and what is not, per component — not area coverage or a percent someone guessed.',
  },
  {
    title: 'The walkdown becomes defensible.',
    body: 'Every install marked in the model is backed by video and reconciled to the approved submittal — a record you can hand to an owner or an auditor. The same record settles a pay application, answers a substitution question, feeds earned value, and clears closeout when the time comes.',
  },
  {
    title: 'You own the system of record first.',
    body: 'Early teams shape it and hold the verified install history before anyone else does.',
  },
]

function Features() {
  return (
    <section id="why-now" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Why run it now</span>
            <h2 className={styles.title}>
              The walkdown, finally leaving a record behind.
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
