"use client";

import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <img src="/assets/logo.svg" alt="Landex Systems" className={styles.logo} />
      <p className={styles.tagline}>An operating system for the building. Yours for as long as it stands.</p>
      <p className={styles.copyright}>&copy; Landex Systems</p>
    </footer>
  )
}

export default Footer
