"use client";

import { useEffect, useState } from 'react';
import type Lenis from 'lenis';
import styles from './Navbar.module.css'

const links = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'what-you-can-ask', label: 'What you can ask it' },
  { id: 'where-it-gets-used', label: 'Where it gets used' },
  { id: 'team', label: 'Who we are' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.left}>
        <img src="/assets/logo.png" alt="Landex Systems" className={styles.logo} />
        <div className={styles.links}>
          {links.map((l) => (
            <button
              key={l.id}
              className={`${styles.link} ${active === l.id ? styles.active : ''}`}
              onClick={() => scrollTo(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <a
        className={styles.cta}
        href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20book%20a%20call"
      >
        Book a call
      </a>
    </nav>
  );
}

export default Navbar
