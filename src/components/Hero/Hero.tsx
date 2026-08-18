"use client";

import styles from './Hero.module.css'

function Hero() {
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
            A scan of your building that answers questions.
          </h1>
          <p className={styles.subheadline}>
            We label every part of the scan and tie it to the system it belongs to. Count what is installed, find a part, measure the space around it, from your desk.
          </p>
          <div className={styles.ctaGroup}>
            <a
              className={styles.primaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20demo"
            >
              Book a call
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <button className={styles.secondaryCta} onClick={() => scrollToSection('what-you-can-ask')}>
              See what you can ask it
            </button>
          </div>
          <p className={styles.tagline}>
            A walk through the building in. A labeled, connected building out.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Hero
