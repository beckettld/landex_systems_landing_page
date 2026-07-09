"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Numbers.module.css'

const stats = [
  {
    figure: '$1.85T',
    label: 'Lost to bad construction data globally. The as-built you inherit is part of it.',
    source: 'Autodesk / FMI',
  },
  {
    figure: '98%',
    label: 'Of megaprojects run over 30 percent on cost. The owner eats the overrun.',
    source: 'McKinsey',
  },
  {
    figure: '30 to 90 days',
    label: 'The standard target to close out a commercial project after substantial completion. Mission-critical handovers slip past it when no one can prove, element by element, what was installed.',
    source: 'Construction closeout benchmark',
  },
  {
    figure: '54%',
    label: 'Of significant data center outages cost the operator over $100,000. One in five top $1 million. When a system fails, proving what was installed is how you shorten it.',
    source: 'Uptime Institute, 2024',
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
