import styles from './Hero.module.css'

function Hero() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo'
      });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroCard}>
        <div className={styles.backgroundWrapper}>
          <img
            src="/assets/background2.jpg"
            alt="Structured database research"
            className={styles.backgroundImage}
          />
          <div className={styles.backgroundOverlay}></div>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>Structured Database Research</span>

          <h1 className={styles.headline}>
            Deep Research Across Structured Databases
          </h1>

          <p className={styles.subheadline}>
            Landex Systems provides comprehensive research capabilities across structured data sources, surfacing accurate, up-to-date information that standard tools fail to reach.
          </p>

          <div className={styles.ctaGroup}>
            <button className={styles.primaryCta} onClick={openCalendly}>
              Request Access
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero
