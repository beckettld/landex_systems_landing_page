import styles from './About.module.css'
import DocumentCycler from '../DocumentCycler/DocumentCycler'

function About() {
  return (
    <section id="about" className={styles.about}>
      {/* Bell curve bump - part of About section, extends up into hero */}
      <div className={styles.bellCurveWrapper}>
        <svg viewBox="0 0 400 100" preserveAspectRatio="none" className={styles.bellCurveSvg}>
          <path d="M0,100 C60,100 120,0 200,0 C280,0 340,100 400,100 Z" fill="white"/>
        </svg>
        <div className={styles.scrollIndicator}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
      <div className={styles.container}>
        {/* Mission section */}
        <div className={styles.missionGrid}>
          <div className={styles.missionLabel}>
            <span>Mission and Vision</span>
          </div>
          
          <div className={styles.missionContent}>
            <h2 className={styles.missionHeading}>
              <span className={styles.brandName}>Landex Systems</span> delivers instant, comprehensive boundary research that would normally take days to compile.
            </h2>
          </div>
        </div>

        {/* Numbers section with image */}
        <div className={styles.numbersSection}>
          <div className={styles.imageWrapper}>
            <DocumentCycler />
          </div>
          
          <div className={styles.numbersContent}>
            <div className={styles.numbersLabel}>
              <span>Numbers</span>
            </div>
            
            <div className={styles.statsList}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>99.7<span className={styles.statSuffix}>%</span></span>
                <span className={styles.statLabel}>Deed retrieval</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>95<span className={styles.statSuffix}>%</span></span>
                <span className={styles.statLabel}>Deeds matched with plans</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>80<span className={styles.statSuffix}>+</span></span>
                <span className={styles.statLabel}>Years of ownership history</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4<span className={styles.statSuffix}>min</span></span>
                <span className={styles.statLabel}>To complete research</span>
              </div>
              <div className={styles.featureHighlight}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>Easements surfaced automatically</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About

