"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Pipeline.module.css'

const stages = [
  {
    name: 'Capture',
    desc: 'Video walkthroughs, LiDAR scans, photogrammetry, or a model you already have.',
    meta: 'your materials',
  },
  {
    name: 'Understanding',
    desc: 'Our models give every point a deep understanding of what it is and what it belongs to.',
    meta: 'per point',
  },
  {
    name: 'Decode',
    desc: 'We host a smart copy of your capture. Ask it anything, by API or from a desk, and get the decoded answer: class names, relationships, heatmaps, quantities.',
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
              One pipeline. Your materials go in. Every point comes back understood, and you receive it decoded for your use case.
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
      </div>
    </section>
  )
}

export default Pipeline
