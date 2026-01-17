import styles from './FinalCTA.module.css'

function Contact() {
    const openCalendly = () => {
        if (window.Calendly) {
            window.Calendly.initPopupWidget({
                url: 'https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo'
            });
        }
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
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
                        Join surveyors and title professionals who are saving hours on every project.
                        Try Landex risk-free with our one-month refundable guarantee.
                    </p>

                    <div className={styles.ctaGroup}>
                        <button className={styles.primaryCta} onClick={openCalendly}>
                            Schedule a Demo
                            <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button className={styles.secondaryCta} onClick={() => scrollToSection('video')}>
                            Watch a Quick Demo
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

                    <div className={styles.trustIndicators}>
                        <div className={styles.trustItem}>
                            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                            <span>Your starting point, not replacement</span>
                        </div>
                        <div className={styles.trustItem}>
                            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12,6 12,12 16,14" />
                            </svg>
                            <span>Fast results</span>
                        </div>
                        <div className={styles.trustItem}>
                            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <span>Trusted by professionals</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
