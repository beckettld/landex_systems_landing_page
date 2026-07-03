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
            Catch the productivity drift in week 3, not week 12.
          </h1>
          <p className={styles.subheadline}>
            Labor overruns are most dangerous when they surface too late. Landex counts what is actually installed, element by element, converts it to a live productivity factor per IWP and cost code, and flags the scopes going burned over earned while you can still move a crew and pull the work back under budget.
          </p>
          <div className={styles.ctaGroup}>
            <button className={styles.primaryCta} onClick={openCalendly}>
              Book a call
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className={styles.secondaryCta} onClick={() => scrollToSection('how-it-works')}>
              See how it works
            </button>
          </div>
        </div>

        <div className={styles.productSide}>
          <img
            src="/assets/product-dashboard.png"
            alt="Landex dashboard — verified components view"
            className={styles.productImage}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero
