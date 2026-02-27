import styles from './Collections.module.css'

const painPoints = [
  'Googling company names, calling Secretary of State offices, searching court records',
  'No reliable way to find principals, officers, or registered agents',
  'Emails and phone numbers scattered across dozens of sources',
  'Lawsuits, liens, and asset info locked behind manual lookups',
]

const results = [
  'Principals, officers, and registered agents with addresses',
  'Categorized emails and phone numbers by department',
  'Incorporation status, industry, and business summary',
  'Lawsuits, judgments, tax liens, UCC filings, and assets',
  'One enriched Excel file + one PDF per account',
]

function Collections() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo',
      })
    }
  }

  return (
    <section id="collections" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Collections</span>
          <h2 className={styles.title}>Commercial Skip Trace At Scale</h2>
          <p className={styles.subtitle}>
            Upload a spreadsheet of delinquent accounts. Get collector-ready intelligence back in minutes per account, fully automated.
          </p>
        </div>

        <div className={styles.comparison}>
          <div className={styles.beforeCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardBadge}>The Bottleneck</span>
              <span className={styles.timeIndicator}>
                <svg className={styles.clockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
                15–45 min per account
              </span>
            </div>
            <div className={styles.painPoints}>
              {painPoints.map((point, i) => (
                <div key={i} className={styles.painPoint}>
                  <svg className={styles.xIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.arrowWrapper}>
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          <div className={styles.afterCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardBadgeSuccess}>What You Get</span>
              <span className={styles.timeIndicatorSuccess}>
                <svg className={styles.clockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
                5–10 min per account
              </span>
            </div>
            <div className={styles.results}>
              {results.map((result, i) => (
                <div key={i} className={styles.result}>
                  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.ctaWrapper}>
          <button type="button" className={styles.ctaButton} onClick={openCalendly}>
            Schedule a Demo
            <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Collections
