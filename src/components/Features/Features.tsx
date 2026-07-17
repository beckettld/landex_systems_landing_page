"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Features.module.css'

const benefits = [
  {
    title: 'Surface.',
    body: 'While the project is building, Landex reasons across your whole site and surfaces the kind of catch that today only comes out of a two-hour meeting with every party in the room, if it comes out at all. Every issue found early is points off your budget.',
  },
  {
    title: 'Accept.',
    body: 'Because the record was built element by element as the work went in, handoff is something you prove, not something you scramble for. Sign off against a reconciled record instead of an inbox.',
  },
  {
    title: 'Operate.',
    body: 'From day one of operations, find the exact valve, damper, or conduit run behind the wall without opening it. The as-built you built during construction is the map for the next thirty years.',
  },
  {
    title: 'Prove.',
    body: 'When a system fails years later, you already hold the record of exactly what was installed, at element grain, captured the day it went in.',
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
              Surface it while the job is live. Keep it for the life of the asset.
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
