"use client";

import styles from './Features.module.css'

const industries = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Utilities',
    description: 'Know what\'s in the ground before your crews dig. Find the right records before every job.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Manufacturing',
    description: 'Get the right drawing before anyone touches equipment. Stop losing time to archive searches.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20h20" />
        <path d="M5 20V8l7-5 7 5v12" />
        <path d="M9 20v-4h6v4" />
      </svg>
    ),
    title: 'Civil engineering',
    description: 'Surface past project work when you need it. Stop starting from scratch on every engagement.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20" />
        <path d="M2 12h20" />
      </svg>
    ),
    title: 'Oil & gas',
    description: 'Search decades of pipeline and field records in seconds, not days.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
      </svg>
    ),
    title: 'Municipal government',
    description: 'Stop losing institutional knowledge when staff turns over. Make your records last.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: 'Rail & transit',
    description: 'Give maintenance teams instant access to the infrastructure records they need.',
  },
]

function Features() {
  return (
    <section id="industries" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Who we work with</span>
          <h2 className={styles.title}>
            Built for teams that operate long-lived physical infrastructure.
          </h2>
          <p className={styles.subtitle}>
            If your team does work in the field and needs to know what&apos;s already there, we can help.
          </p>
        </div>
        <div className={styles.grid}>
          {industries.map((industry) => (
            <div key={industry.title} className={styles.card}>
              <div className={styles.cardIcon}>{industry.icon}</div>
              <h3 className={styles.cardTitle}>{industry.title}</h3>
              <p className={styles.cardDescription}>{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
