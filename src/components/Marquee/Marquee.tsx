import styles from './Marquee.module.css'

function Marquee() {
  const text = "Landex Systems";
  const separator = " • ";
  
  // Create multiple copies for seamless loop
  const content = Array(6).fill(`${text}${separator}`).join('');

  return (
    <section className={styles.marqueeSection}>
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeContent}>
          <span className={styles.text}>{content}</span>
        </div>
        <div className={styles.marqueeContent} aria-hidden="true">
          <span className={styles.text}>{content}</span>
        </div>
      </div>
    </section>
  );
}

export default Marquee

