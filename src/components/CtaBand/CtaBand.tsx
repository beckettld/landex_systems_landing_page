"use client";

import styles from './CtaBand.module.css';

function CtaBand() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/allen-landexsystems/landex-systems-demo'
      });
    }
  };

  return (
    <section className={styles.band}>
      <div className={styles.inner}>
        <p className={styles.line}>
          Every install verified. Every pay app backed by video.
        </p>
        <button className={styles.cta} onClick={openCalendly}>
          Book a 20-minute call
          <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default CtaBand;
