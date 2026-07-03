"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Numbers.module.css'

const stats = [
  {
    figure: '5–6%',
    label: 'Typical contractor pre-tax margin. A few points of fade erases the job.',
  },
  {
    figure: '98%',
    label: 'Of megaprojects run over 30 percent on cost.',
    source: 'McKinsey',
  },
  {
    figure: '$1.85T',
    label: 'Lost to bad construction data globally in 2020.',
    source: 'Autodesk / FMI',
  },
  {
    figure: '3–7%',
    label: 'Of project cost lost to billing and progress errors caught late.',
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
