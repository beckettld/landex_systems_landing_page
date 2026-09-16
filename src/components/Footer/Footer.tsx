"use client";

import { CONTACT_EMAIL, PLATFORM_URL } from '@/lib/contact'
import styles from './Footer.module.css'

const nav = [
  { href: '/#outcomes', label: 'What you get' },
  { href: '/#system', label: 'How it works' },
  { href: '/#api', label: 'API' },
  { href: '/#team', label: 'Team' },
]

// Public showcases, each a real scan with its outputs.
const demos = [
  { href: 'https://demo.landexsystems.com', label: 'demo.landexsystems.com', hint: 'Ask a scan anything' },
  { href: 'https://bim.landexsystems.com', label: 'bim.landexsystems.com', hint: 'Scan to BIM' },
  { href: 'https://geospatial.landexsystems.com', label: 'geospatial.landexsystems.com', hint: 'Drone survey inventory' },
]

// Two doors: the platform, and Allen's inbox for everything else.
const contact = [
  { href: PLATFORM_URL, label: 'Upload a scan' },
  { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
]

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/assets/logo.svg" alt="Landex Systems" className={styles.logo} />
            <p className={styles.statement}>
              We turn scans into counts, measurements, and answers for anyone who needs to know what is in a space.
            </p>
            <p className={styles.mono}>Scan &rarr; Labels &rarr; Answers</p>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <span className={styles.colLabel}>Company</span>
              {nav.map((l) => (
                <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
              ))}
            </div>
            <div className={styles.col}>
              <span className={styles.colLabel}>Live examples</span>
              {demos.map((l) => (
                <a key={l.label} href={l.href} className={styles.link} target="_blank" rel="noopener">
                  {l.label}
                  <span className={styles.hint}>{l.hint}</span>
                </a>
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
