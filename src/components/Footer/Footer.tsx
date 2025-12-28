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
        <p className={styles.copyright}>
          © 2025 Landex Systems. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer


