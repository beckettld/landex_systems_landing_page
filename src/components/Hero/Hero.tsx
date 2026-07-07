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
            Turn an ordinary walk video into a verified install record.
          </h1>
          <p className={styles.subheadline}>
            The walkdown already happens — your engineers walk the area and check what is installed against what was planned. Landex turns that walk into the record. Capture the area on a phone, and Landex tags each installed component, reconciles it against the approved submittal and spec, and writes it back to the 3D model as a timestamped, attributable install record, element by element. No special rig, no new field behavior.
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
        </div>

        <div className={styles.productSide}>
          <img
            src="/assets/video_annotator.png"
            alt="Landex — walk video with auto-tagged installed components"
            className={styles.productImage}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero
