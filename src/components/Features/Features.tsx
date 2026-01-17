import styles from './Features.module.css'

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Lightning Fast',
    stat: 'Minutes',
    statLabel: 'vs. hours',
    description: 'Compile complete ownership history and documents in minutes instead of spending hours across multiple registries.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
      </svg>
    ),
    title: 'Comprehensive Coverage',
    stat: '99.7%',
    statLabel: 'deed retrieval',
    description: 'Automatically retrieve deeds, plans, and all connected documents in one search.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: 'Connected Records',
    stat: '95%',
    statLabel: 'matched with plans',
    description: 'Documents are intelligently connected so you can trace ownership and boundaries.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Deep History',
    stat: '80+',
    statLabel: 'years',
    description: 'Access comprehensive ownership history going back 80+ years.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: 'Your Starting Point',
    stat: '100%',
    statLabel: 'your control',
    description: 'Review everything before use—your expertise drives the final decisions.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    title: 'Increased Capacity',
    stat: 'More',
    statLabel: 'projects',
    description: 'Take on more projects without hiring additional research staff or working longer hours.',
  },
]

function Features() {
  return (
    <section id="features" className={styles.section}>
      {/* Bell curve bump - part of Features section, extends up into hero */}
      <div className={styles.bellCurveWrapper}>
        <svg viewBox="0 0 400 100" preserveAspectRatio="none" className={styles.bellCurveSvg}>
          <path d="M0,100 C60,100 120,0 200,0 C280,0 340,100 400,100 Z" fill="white" />
        </svg>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Features</span>
          <h2 className={styles.title}>Everything you need to accelerate your research</h2>
          <p className={styles.subtitle}>
            Built specifically for surveyors, title companies, and real estate professionals
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{feature.icon}</div>
                <div className={styles.cardStat}>
                  <span className={styles.statValue}>{feature.stat}</span>
                  <span className={styles.statLabel}>{feature.statLabel}</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.trustIndicators}>
          <div className={styles.trustItem}>
            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>Your starting point, not replacement</span>
          </div>
          <div className={styles.trustItem}>
            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            <span>Fast results</span>
          </div>
          <div className={styles.trustItem}>
            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Trusted by professionals</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
