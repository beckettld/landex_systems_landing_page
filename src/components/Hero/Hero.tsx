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
            alt="Commercial collections skip tracing"
            className={styles.backgroundImage}
          />
          <div className={styles.backgroundOverlay}></div>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>For Commercial Collections Teams</span>

          <h1 className={styles.headline}>
            Recover Accounts That Standard Tools Write Off
          </h1>

          <p className={styles.subheadline}>
            Static databases leave gaps in commercial debt. Landex Systems searches live sources in real time to find what traditional tools miss, so your collectors have what they need to close.
          </p>

          <div className={styles.ctaGroup}>
            <button className={styles.primaryCta} onClick={openCalendly}>
              Schedule a Demo
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className={styles.trustLine}>Validated on 50,000+ commercial accounts</p>
        </div>
      </div>
    </section>
  );
}

export default Hero
