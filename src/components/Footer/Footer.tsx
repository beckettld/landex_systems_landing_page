import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <img
          src="/assets/logo.svg"
          alt="Landex Systems"
          className={styles.logo}
        />
        {/* <p className={styles.tagline}>Commercial skip tracing, built for collectors.</p> */}
        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/company/landex-systems"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
          <span className={styles.divider}>·</span>
          <a href="mailto:allen@landexsystems.com" className={styles.link}>
            Contact
          </a>
          <span className={styles.divider}>·</span>
          <a href="/privacy" className={styles.link}>Privacy Policy</a>
          <span className={styles.divider}>·</span>
          <a href="/terms" className={styles.link}>Terms of Service</a>
        </div>
        <p className={styles.copyright}>
          © 2026 Landex Systems. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer



