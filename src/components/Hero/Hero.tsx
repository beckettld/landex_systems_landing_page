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
          src="/assets/background.png"
          alt=""
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundOverlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.textSide}>
          <span className={styles.eyebrow}>The data room for the physical world</span>
          <h1 className={styles.headline}>
            Every drawing, plan, and record in one place.
            <br />
            Ask anything and get answers sourced to the page.
          </h1>
          <p className={styles.subheadline}>
            Drop in your corpus of as-builts, deeds, permits, scans, and reports. Our AI indexes, extracts, and structures every page by location, date, and content. New documents are absorbed as they arrive. The system lives continuously in your workflow, not just a one-time project.
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
