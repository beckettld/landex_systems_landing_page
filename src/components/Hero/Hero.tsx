import styles from './Hero.module.css'

function Hero() {
  const marqueeText = "Automated Boundary Research";

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
    <section id="hero" className={styles.hero}>
      <div className={styles.heroCard}>
        <div className={styles.backgroundWrapper}>
          <img 
            src="/assets/background.png" 
            alt="Aerial view of agricultural fields" 
            className={styles.backgroundImage}
          />
        </div>

        {/* Navbar inside hero card */}
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

        <div className={styles.content}>
          {/* Content area - tagline removed */}
        </div>

        {/* Marquee overlay at bottom of hero */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            <div className={styles.marqueeItem}>
              <span className={styles.marqueeText}>{marqueeText}</span>
              <img src="/assets/logo.svg" alt="" className={styles.marqueeLogo} />
            </div>
            <div className={styles.marqueeItem}>
              <span className={styles.marqueeText}>{marqueeText}</span>
              <img src="/assets/logo.svg" alt="" className={styles.marqueeLogo} />
            </div>
            <div className={styles.marqueeItem}>
              <span className={styles.marqueeText}>{marqueeText}</span>
              <img src="/assets/logo.svg" alt="" className={styles.marqueeLogo} />
            </div>
            <div className={styles.marqueeItem} aria-hidden="true">
              <span className={styles.marqueeText}>{marqueeText}</span>
              <img src="/assets/logo.svg" alt="" className={styles.marqueeLogo} />
            </div>
            <div className={styles.marqueeItem} aria-hidden="true">
              <span className={styles.marqueeText}>{marqueeText}</span>
              <img src="/assets/logo.svg" alt="" className={styles.marqueeLogo} />
            </div>
            <div className={styles.marqueeItem} aria-hidden="true">
              <span className={styles.marqueeText}>{marqueeText}</span>
              <img src="/assets/logo.svg" alt="" className={styles.marqueeLogo} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero

