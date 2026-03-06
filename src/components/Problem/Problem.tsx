import styles from './Problem.module.css'

type Coverage = boolean | 'partial'

const rows: { label: string; lexis: Coverage; landex: Coverage }[] = [
  { label: 'Principals, officers & directors', lexis: false, landex: true },
  { label: 'Direct emails & phone numbers', lexis: false, landex: true },
  { label: 'UCC filings, liens & judgments', lexis: 'partial', landex: true },
  { label: 'Business assets & collateral', lexis: false, landex: true },
  { label: 'Data updated in real time', lexis: false, landex: true },
  { label: 'Basic entity & credit profile', lexis: true, landex: true },
]

function StatusIcon({ status }: { status: boolean | 'partial' }) {
  if (status === true) {
    return (
      <span className={styles.yes}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    )
  }
  if (status === 'partial') {
    return (
      <span className={styles.partial}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </span>
    )
  }
  return (
    <span className={styles.no}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  )
}

function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>The Problem</span>
          <h2 className={styles.title}>Your collectors are working the accounts. The data is what's holding them back.</h2>
          <p className={styles.subtitle}>
            Legacy tools pull from the same fixed databases and miss the same things every time. Landex Systems searches live sources in real time to find what those tools can't.
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thLabel}>Data Type</th>
                <th className={styles.thTool}>
                  <span className={styles.toolName}>Traditional Tools</span>
                  <span className={styles.toolSub}>Static database</span>
                </th>
                <th className={styles.thTool}>
                  <span className={`${styles.toolName} ${styles.landexName}`}>Landex Systems</span>
                  <span className={`${styles.toolSub} ${styles.landexSub}`}>Real-time search</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={styles.row}>
                  <td className={styles.tdLabel}>{row.label}</td>
                  <td className={styles.tdStatus}>
                    <StatusIcon status={row.lexis} />
                  </td>
                  <td className={styles.tdStatus}>
                    <StatusIcon status={row.landex} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.yes}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg></span>
              Covered
            </span>
            <span className={styles.legendItem}>
              <span className={styles.partial}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
              Limited / inconsistent
            </span>
            <span className={styles.legendItem}>
              <span className={styles.no}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></span>
              Not covered
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem
