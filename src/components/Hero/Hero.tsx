"use client";

import styles from './Hero.module.css'

function Hero() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/allen-landexsystems/landex-systems-demo'
      });
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.backgroundWrapper}>
        <img
          src="/assets/frames-for-your-heart-VoI2jd75M6Q-unsplash.jpg"
          alt=""
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundOverlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.textSide}>
          <h1 className={styles.headline}>
            Take delivery of your building with an X-ray of everything inside it.
          </h1>
          <p className={styles.subheadline}>
            At handoff, Landex hands you a verified record of every installed element, behind every wall, because it was filmed before the wall closed and reconciled to the documents that governed it. Not a live model that goes stale. Captured as the building was built. Yours to keep for its entire life.
          </p>
          <div className={styles.ctaGroup}>
            <button className={styles.primaryCta} onClick={openCalendly}>
              Book a call
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className={styles.secondaryCta} onClick={() => scrollToSection('what-landex-does')}>
              See how it works
            </button>
          </div>
          <p className={styles.tagline}>
            Landex: every installed element, behind the wall, delivered at handoff.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Hero
