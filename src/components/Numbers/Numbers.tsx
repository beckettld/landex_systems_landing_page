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
    figure: '$4 to $10',
    label: 'Saved for every dollar spent on an owner’s representative. The savings come from catching issues early — the record you build during construction is where those catches live.',
    source: 'National owner’s rep ROI study',
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
