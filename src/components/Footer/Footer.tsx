"use client";

import { TEAM_ADDRESS_LABEL, type ContactTo, type ContactTopic } from '@/lib/contact'
import EmailLink from '@/components/EmailLink/EmailLink'
import styles from './Footer.module.css'

const nav = [
  { href: '/#examples', label: 'Live examples' },
  { href: '/#products', label: 'Products' },
  { href: '/#team', label: 'Team' },
]

// Named products. Tesseract is the first; the company story stays on the home page.
const products = [
  { href: '/tesseract', label: 'Tesseract', hint: 'Scan to BIM' },
  { href: '/tesseract/pricing', label: 'Tesseract pricing', hint: 'Plans and credits' },
]

// Public showcases, each a real scan with its outputs. The section after the
// hero shows the same three; the footer keeps them reachable from the bottom.
const demos = [
  { href: 'https://demo.landexsystems.com', label: 'demo.landexsystems.com', hint: 'Ask a scan anything' },
  { href: 'https://bim.landexsystems.com', label: 'bim.landexsystems.com', hint: 'Scan to BIM' },
  { href: 'https://geospatial.landexsystems.com', label: 'geospatial.landexsystems.com', hint: 'Drone survey inventory' },
]

// One door: Allen's inbox for the asks. The team line mails all three,
// since that is what it says; the address is assembled on click, not printed.
const contact: { topic: ContactTopic; to?: ContactTo; label: string }[] = [
  { topic: 'scan', label: 'Send us a scan' },
  { topic: 'hello', to: 'team', label: TEAM_ADDRESS_LABEL },
]

function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/assets/logo.svg" alt="Landex Systems" className={styles.logo} />
            <p className={styles.statement}>
              We turn scans into BIM models, counts, measurements, and answers for anyone who needs to know what is in a space.
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
              <span className={styles.colLabel}>Products</span>
              {products.map((l) => (
                <a key={l.label} href={l.href} className={styles.link}>
                  {l.label}
                  <span className={styles.hint}>{l.hint}</span>
                </a>
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
                <EmailLink key={l.label} topic={l.topic} to={l.to} className={styles.link}>{l.label}</EmailLink>
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
