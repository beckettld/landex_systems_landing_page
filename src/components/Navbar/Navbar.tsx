import styles from './Navbar.module.css'

function Navbar() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo'
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
        <img
          src="/assets/logo.svg"
          alt="Landex Systems"
          className={styles.logo}
        />
      </div>

      <div className={styles.navCenter}>
        <button
          className={styles.navLink}
          onClick={() => scrollToSection('hero')}
        >
          Home
        </button>
        <button
          className={styles.navLink}
          onClick={() => scrollToSection('problem')}
        >
          Problem
        </button>
        <button
          className={styles.navLink}
          onClick={() => scrollToSection('solution')}
        >
          Solution
        </button>
        <button
          className={styles.navLink}
          onClick={() => scrollToSection('video')}
        >
          Video
        </button>
        <button
          className={styles.navLink}
          onClick={() => scrollToSection('contact')}
        >
          Contact
        </button>
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



