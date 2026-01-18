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
            src="/assets/background2.jpg"
            alt="Aerial view of agricultural fields"
            className={styles.backgroundImage}
          />
          <div className={styles.backgroundOverlay}></div>
        </div>

        <div className={styles.content}>
        <h1 className={styles.headline}>
          Turn Hours of Land Records Research Into Minutes
        </h1>

        <p className={styles.subheadline}>
          Stop spending hours in registries. Get complete deed chains, plans, and ownership history compiled in minutes—ready for your expert review.
        </p>

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
    </section>
  );
}

export default Hero
