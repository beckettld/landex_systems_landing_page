"use client";

import styles from './Problem.module.css'

const cards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    label: 'Time lost',
    stat: 'Hours',
    description: 'Per search. For information that already exists inside your organization.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    label: 'The risk',
    stat: 'Real',
    description: 'Missing records lead to costly surprises in the field, regulatory exposure, and safety incidents.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
      </svg>
    ),
    label: 'The cause',
    stat: 'Format',
    description: 'Decades of maps in PDFs, scans, and paper records that were never made searchable.',
  },
]

function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>The problem</span>
        <h2 className={styles.title}>
          Critical information is sitting in your archives. Unreachable.
        </h2>
        <p className={styles.body}>
          Engineering and operations teams spend hours hunting through filing cabinets, shared drives, and PDFs to find records that should take seconds. That&apos;s expensive. Sometimes it&apos;s dangerous.
        </p>
        <div className={styles.cards}>
          {cards.map((card, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardIcon}>{card.icon}</div>
              <div className={styles.cardLabel}>{card.label}</div>
              <div className={styles.cardStat}>{card.stat}</div>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problem
