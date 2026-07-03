"use client";

import { useEffect, useState } from 'react';
import styles from './Navbar.module.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/allen-landexsystems/landex-systems-demo'
      });
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.left}>
        <img src="/assets/logo.png" alt="Landex Systems" className={styles.logo} />
        <div className={styles.links}>
          <button className={styles.link} onClick={() => scrollTo('what-we-flag')}>What we flag</button>
          <button className={styles.link} onClick={() => scrollTo('industries')}>Who it's for</button>
          <button className={styles.link} onClick={() => scrollTo('team')}>Who we are</button>
          <button className={styles.link} onClick={() => scrollTo('contact')}>Contact</button>
        </div>
      </div>
      <button className={styles.cta} onClick={openCalendly}>
        Book a call
      </button>
    </nav>
  );
}

export default Navbar
