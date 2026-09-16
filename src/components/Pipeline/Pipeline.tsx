"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Pipeline.module.css'

const stages = [
  {
    name: 'Send the scan.',
    desc: 'A LiDAR point cloud, a drone capture, or a model you already have.',
    meta: 'your file',
  },
  {
    name: 'We label it.',
    desc: 'Every point gets what it is and what it belongs to.',
    meta: 'per point',
  },
  {
    name: 'You get answers.',
    desc: 'Count tables, pins, and plans as CSV, PDF, or DXF. Or ask it by API.',
    meta: 'what you receive',
  },
]

function Pipeline() {
  return (
    <section id="system" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.head}>
            <span className={styles.eyebrow}>How it works</span>
            <p className={styles.lede}>
              Three steps. Your scan goes in, every point comes back labeled, and you receive the counts and plans your team was going to make by hand.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <ol className={styles.flow}>
            {stages.map((s, i) => (
              <li key={s.name} className={styles.stage} style={{ ['--i' as string]: i }}>
                <span className={styles.node} aria-hidden="true" />
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.name}>{s.name}</h3>
                <p className={styles.desc}>{s.desc}</p>
                <span className={styles.meta}>{s.meta}</span>
              </li>
            ))}
          </ol>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <p className={styles.note}>
            <strong>Your scan stays yours.</strong> We process it, send back the outputs, and never resell or train on your data.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pipeline
