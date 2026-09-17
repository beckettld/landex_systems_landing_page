"use client";

import { useEffect, useState } from 'react';
import type Lenis from 'lenis';
import EmailLink from '@/components/EmailLink/EmailLink'
import styles from './Navbar.module.css'

const links = [
  { id: 'outcomes', label: 'What you get' },
  { id: 'system', label: 'How it works' },
  { id: 'api', label: 'API' },
  { id: 'team', label: 'Team' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  // A sentinel at the top of the page decides the solid background, so it
  // holds no matter how the page got scrolled (smooth scroll, a hash link, a
  // device that never fires window scroll events).
  useEffect(() => {
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:60px;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting || window.scrollY > 60));
    io.observe(sentinel);
    setScrolled(window.scrollY > 60);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
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
      <EmailLink className={styles.cta} topic="scan">
        Send us a scan
      </EmailLink>
    </nav>
  );
}

export default Navbar
