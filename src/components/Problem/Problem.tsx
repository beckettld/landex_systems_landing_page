import styles from './Problem.module.css'

const painPoints = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    text: 'Spending hours gathering documents for each project',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    text: 'Critical records buried in poorly indexed government databases',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    text: 'Internal files scattered across drives and systems',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
      </svg>
    ),
    text: 'The same repetitive research, project after project',
  },
]

function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>The Problem</span>
          <h2 className={styles.title}>The Manual Research Bottleneck</h2>
        </div>

        <div className={styles.comparison}>
          {/* Before State */}
          <div className={styles.beforeCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardBadge}>Without Landex</span>
              <span className={styles.timeIndicator}>
                <svg className={styles.clockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                Hours per project
              </span>
            </div>
            <div className={styles.painPoints}>
              {painPoints.map((point, index) => (
                <div key={index} className={styles.painPoint}>
                  <div className={styles.painIcon}>{point.icon}</div>
                  <span className={styles.painText}>{point.text}</span>
                </div>
              ))}
            </div>
            <div className={styles.frustrationVisual}>
              <div className={styles.tabs}>
                <span className={styles.tab}>Registry</span>
                <span className={styles.tab}>Assessor</span>
                <span className={styles.tab}>Plans</span>
                <span className={styles.tab}>+12 more</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className={styles.arrowWrapper}>
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>

          {/* After State */}
          <div className={styles.afterCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardBadgeSuccess}>With Landex</span>
              <span className={styles.timeIndicatorSuccess}>
                <svg className={styles.clockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                Minutes
              </span>
            </div>
            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>One simple query</span>
              </div>
              <div className={styles.benefit}>
                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Surfaces hidden and poorly indexed records</span>
              </div>
              <div className={styles.benefit}>
                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Integrates your internal files alongside public records</span>
              </div>
              <div className={styles.benefit}>
                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>All documents compiled automatically</span>
              </div>
              <div className={styles.benefit}>
                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Ready for your expert review</span>
              </div>
            </div>
            <div className={styles.successVisual}>
              <div className={styles.singleInterface}>
                <span className={styles.interfaceLabel}>Everything in one place</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem
