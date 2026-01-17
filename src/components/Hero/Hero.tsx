import styles from './Hero.module.css'

function Hero() {
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
          <div className={styles.backgroundOverlay}></div>
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
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>
            <button
              className={styles.navPill}
              onClick={() => scrollToSection('video')}
            >
              Video
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

        {/* Main Hero Content */}
        <div className={styles.content}>
          <div className={styles.heroContent}>
            {/* Main Headline */}
            <h1 className={styles.headline}>
              Turn Hours of Land Records Research Into Minutes
            </h1>

            {/* Subheadline */}
            <p className={styles.subheadline}>
              Stop spending hours in registries. Get complete deed chains, plans, and ownership history compiled in minutes—ready for your expert review.
            </p>

            {/* Trust Statement */}
            <div className={styles.trustStatement}>
              <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>Your starting point, not your replacement</span>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaGroup}>
              <button className={styles.primaryCta} onClick={openCalendly}>
                Schedule a Demo
                <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className={styles.secondaryCta} onClick={() => scrollToSection('video')}>
                See How It Works
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero
