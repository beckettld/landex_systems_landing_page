import styles from './Technology.module.css'

const techPoints = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    title: 'Comprehensive Data Access',
    description: 'Access to extensive land records databases across registries and recording offices.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/>
        <circle cx="12" cy="14" r="2"/>
        <path d="M12 16v2"/>
      </svg>
    ),
    title: 'AI-Powered Research',
    description: 'Intelligent document gathering that connects records and surfaces relevant information automatically.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Always Up-to-Date',
    description: 'Real-time access to the latest recorded documents as registries update their databases.',
  },
]

function Technology() {
  return (
    <section id="technology" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <span className={styles.label}>Technology</span>
            <h2 className={styles.title}>Powered by Advanced Technology & Data Access</h2>
            <p className={styles.description}>
              We leverage cutting-edge AI and comprehensive data partnerships to deliver research that would take hours—in just minutes.
            </p>
          </div>

          <div className={styles.techGrid}>
            {techPoints.map((point, index) => (
              <div key={index} className={styles.techCard}>
                <div className={styles.techIcon}>
                  {point.icon}
                </div>
                <div className={styles.techText}>
                  <h3 className={styles.techTitle}>{point.title}</h3>
                  <p className={styles.techDescription}>{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Technology
