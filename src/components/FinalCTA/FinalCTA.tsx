import styles from './FinalCTA.module.css'

function Contact() {
    const openCalendly = () => {
        if (window.Calendly) {
            window.Calendly.initPopupWidget({
                url: 'https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo'
            });
        }
    };

    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.badgeText}>Risk-Free • Full Refund if Not Satisfied</span>
                    </div>

                    <h2 className={styles.headline}>
                        See Your First Report in Minutes
                    </h2>

                    <p className={styles.subheadline}>
                        Join professionals who are saving hours on every project.
                        Try Landex Systems risk-free with our one-month refundable guarantee.
                    </p>

                    <div className={styles.ctaGroup}>
                        <button className={styles.primaryCta} onClick={openCalendly}>
                            Schedule a Demo
                            <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className={styles.contactInfo}>
                        <div className={styles.emailWrapper}>
                            <svg className={styles.emailIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <a href="mailto:allen@landexsystems.com" className={styles.emailLink}>
                                allen@landexsystems.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
