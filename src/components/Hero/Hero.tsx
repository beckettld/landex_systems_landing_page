"use client";

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
            Know which scope is running over while you can still do something about it.
          </h1>
          <p className={styles.subheadline}>
            Most projects learn they went over at closeout, when the crew is gone and nothing can change. Landex counts what is actually installed, element by element, sets it against your budget and schedule, and flags the scopes falling behind while there is still time to act.
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
      </div>
    </section>
  );
}

export default Hero
