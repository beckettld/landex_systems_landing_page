"use client";

import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <img src="/assets/logo.svg" alt="Landex Systems" className={styles.logo} />
      <p className={styles.tagline}>The verified as-built record. Delivered at handoff. Owned for the life of the building.</p>
      <p className={styles.copyright}>&copy; 2026 Landex Systems</p>
    </footer>
  )
}

export default Footer
