import styles from './Collections.module.css'

const dataCategories = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Key People',
    outcome: 'Know exactly who to call and where to find them.',
    items: ['Principals & owners', 'Officers & directors', 'Registered agents', 'Personal addresses'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: 'Contact Intelligence',
    outcome: 'Get to the right people without going through the front desk.',
    items: ['Direct phone numbers', 'Emails by department', 'Office & mobile lines', 'LinkedIn profiles'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: 'Business Profile',
    outcome: 'Know what you\'re dealing with before you make the first call.',
    items: ['Incorporation status & history', 'Industry & SIC code', 'Business summary', 'Entity type & standing'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Legal History',
    outcome: 'Know every lien and judgment before you make the call.',
    items: ['Lawsuits & judgments', 'Tax liens (state & federal)', 'UCC filings', 'Bankruptcy records'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Assets & Collateral',
    outcome: 'Identify what\'s recoverable before you negotiate.',
    items: ['Real property holdings', 'Equipment & vehicles', 'Business assets', 'Known collateral'],
  },
]

function Collections() {
  return (
    <section id="collections" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>What You Get</span>
          <h2 className={styles.title}>Everything Your Collectors Need, In One Report</h2>
          <p className={styles.subtitle}>
            Every account comes back as a complete report your collectors can put to work right away. No more hunting across tabs and county records before you can make the call.
          </p>
        </div>

        <div className={styles.categoryGrid}>
          {dataCategories.map((cat, i) => (
            <div key={i} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>{cat.icon}</div>
              <h3 className={styles.categoryTitle}>{cat.title}</h3>
              <p className={styles.categoryOutcome}>{cat.outcome}</p>
              <ul className={styles.categoryItems}>
                {cat.items.map((item, j) => (
                  <li key={j} className={styles.categoryItem}>
                    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Collections
