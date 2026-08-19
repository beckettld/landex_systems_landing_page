"use client";

import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.backgroundGlow} />
        <div className={styles.backgroundGrid} />
      </div>

      <div className={styles.content}>
        <div className={styles.textSide}>
          <h1 className={styles.headline}>
            A scan of your building that answers questions.
          </h1>
          <div className={styles.queries}>
            <p className={styles.query}>
              &ldquo;How many of the 214 sprinkler heads on the schedule never reached the ceiling?&rdquo;
            </p>
            <p className={styles.query}>
              &ldquo;Is there 36 inches of clear working space in front of panel LP-2?&rdquo;
            </p>
          </div>
          <p className={styles.subheadline}>
            We label every part of the scan and tie it to the system it belongs to. Count what is installed, find a part, measure the space around it, from your desk.
          </p>
          <div className={styles.ctaGroup}>
            <a
              className={styles.primaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20process%20my%20scan"
            >
              Send us a scan to label
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              className={styles.secondaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20book%20a%20call"
            >
              Or book a call
            </a>
          </div>
          <p className={styles.tagline}>
            A walk through the building goes in. A labeled, connected building comes back.
          </p>
        </div>

        <div className={styles.productSide}>
          <img
            src="/assets/product-photo-july.png"
            alt="The Landex viewer: a labeled point cloud of a scanned space, with every element tied to the system it belongs to."
            className={styles.productImage}
          />
        </div>

      </div>
    </section>
  );
}

export default Hero
