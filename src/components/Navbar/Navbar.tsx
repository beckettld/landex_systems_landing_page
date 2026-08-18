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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.left}>
        <img src="/assets/logo.png" alt="Landex Systems" className={styles.logo} />
        <div className={styles.links}>
          <button className={styles.link} onClick={() => scrollTo('what-you-get')}>What you get</button>
          <button className={styles.link} onClick={() => scrollTo('how-it-works')}>How it works</button>
          <button className={styles.link} onClick={() => scrollTo('what-you-can-ask')}>What you can ask it</button>
          <button className={styles.link} onClick={() => scrollTo('where-it-gets-used')}>Where it gets used</button>
          <button className={styles.link} onClick={() => scrollTo('team')}>Who we are</button>
        </div>
      </div>
      <a
        className={styles.cta}
        href="mailto:allen@landexsystems.com?subject=Landex%20demo"
      >
        Book a call
      </a>
    </nav>
  );
}

export default Navbar
