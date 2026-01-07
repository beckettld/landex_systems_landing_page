import styles from './Contact.module.css'

function Contact() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo'
      });
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.backgroundWrapper} />
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Ready to streamline your boundary research?
          </h2>
          <p className={styles.subtitle}>
            See how Landex can deliver comprehensive deed and boundary research 
            in minutes instead of days.
          </p>
          
          <button className={styles.ctaButton} onClick={openCalendly}>
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact

