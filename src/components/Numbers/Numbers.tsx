"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Numbers.module.css'

const stats = [
  {
    figure: '$1.85T',
    label: 'Lost to bad construction data globally. The problems hide in context no one has time to connect.',
    source: 'Autodesk / FMI',
  },
  {
    figure: '98%',
    label: 'Of megaprojects run over 30 percent on cost. The overrun builds during construction, one uncaught issue at a time.',
    source: 'McKinsey',
  },
  {
    figure: '54%',
    label: 'Of significant data center outages cost the operator over $100,000. One in five top $1 million. The record you built during construction is how you shorten the next one.',
    source: 'Uptime Institute, 2024',
  },
  {
    figure: '30 to 90 days',
    label: 'The standard target to close out a commercial project after substantial completion. When the record is already built, element by element, acceptance is something you prove, not something you scramble for.',
    source: 'Construction closeout benchmark',
  },
]

function Numbers() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <AnimateIn key={i} delay={i * 0.07}>
              <div className={styles.stat}>
                <span className={styles.figure}>{s.figure}</span>
                <span className={styles.label}>{s.label}</span>
                {s.source && <span className={styles.source}>{s.source}</span>}
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Numbers
