"use client";

import styles from './Footer.module.css'

const nav = [
  { href: '/#system', label: 'How it works' },
  { href: '/#team', label: 'Team' },
]

const contact = [
  { href: 'mailto:allen@landexsystems.com', label: 'allen@landexsystems.com' },
  { href: 'mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20make%20my%20model%20smart', label: 'Send us a model' },
  { href: 'mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20book%20a%20call', label: 'Book a call' },
]

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/assets/logo.svg" alt="Landex Systems" className={styles.logo} />
            <p className={styles.statement}>
              We give every point in a scan a deep understanding of what it is, and deliver it decoded for whoever needs to know what is inside a building.
            </p>
            <p className={styles.mono}>Capture &rarr; Understanding &rarr; Decode</p>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <span className={styles.colLabel}>Company</span>
              {nav.map((l) => (
                <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
              ))}
            </div>
            <div className={styles.col}>
              <span className={styles.colLabel}>Contact</span>
              {contact.map((l) => (
                <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.mono}>&copy; {new Date().getFullYear()} Landex Systems</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
