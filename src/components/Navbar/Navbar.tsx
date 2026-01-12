import { useState } from 'react'
import styles from './Navbar.module.css'

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button 
            className={styles.navPill}
            onClick={() => scrollToSection('hero')}
          >
            Home
          </button>
          <button 
            className={styles.navPill}
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
          <button 
            className={styles.navPill}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </div>

        <div className={styles.logoWrapper}>
          <img 
            src="/assets/logo.svg" 
            alt="Landex Systems" 
            className={styles.logo}
          />
        </div>

        <div className={styles.navRight}>
          <button 
            className={styles.ctaButton}
            onClick={() => setIsModalOpen(true)}
          >
            Schedule Demo
          </button>
        </div>
      </nav>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalClose}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h3 className={styles.modalTitle}>Schedule a Demo</h3>
            <p className={styles.modalText}>
              Reach out to schedule a personalized demo of Landex Systems.
            </p>
            <a 
              href="mailto:allen@landex.com?subject=Demo Request"
              className={styles.modalButton}
            >
              Email allen@landex.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar



