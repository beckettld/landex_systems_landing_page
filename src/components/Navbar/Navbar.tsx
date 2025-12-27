import styles from './Navbar.module.css'

function Navbar() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/your-link'
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
          onClick={openCalendly}
        >
          Schedule Demo
        </button>
      </div>
    </nav>
  );
}

export default Navbar

