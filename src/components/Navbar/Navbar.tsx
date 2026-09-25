"use client";

import { useEffect, useState } from 'react';
import type Lenis from 'lenis';
import EmailLink from '@/components/EmailLink/EmailLink'
import styles from './Navbar.module.css'

const links = [
  { id: 'examples', label: 'Live examples' },
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

  // The active link is the last section whose top has passed the upper part
  // of the viewport. Computed from geometry on every frame the page moves,
  // and on a slow timer as a backstop for devices that skip scroll events.
  useEffect(() => {
    let raf = 0;
    let lastY = -1;
    const pick = () => {
      raf = 0;
      const cut = window.innerHeight * 0.4;
      let current = '';
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= cut) current = l.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };
    const tick = window.setInterval(() => {
      if (document.hidden) return;
      if (window.scrollY !== lastY) {
        lastY = window.scrollY;
        schedule();
      }
    }, 400);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    pick();
    return () => {
      window.clearInterval(tick);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      window.location.href = `/#${id}`;
      return;
    }
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.left}>
        <a href="/" aria-label="Landex Systems home">
          <img src="/assets/logo.png" alt="Landex Systems" className={styles.logo} />
        </a>
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
          <a href="/pricing" className={styles.link}>Pricing</a>
        </div>
      </div>
      <EmailLink className={styles.cta} topic="scan">
        Send us a scan
      </EmailLink>
    </nav>
  );
}

export default Navbar
