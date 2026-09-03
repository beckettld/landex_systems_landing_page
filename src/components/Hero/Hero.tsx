"use client";

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import PointField from '@/components/PointField/PointField'
import styles from './Hero.module.css'

// three.js lives client-only and stays out of the initial bundle.
const HeroCloud = dynamic(() => import('@/components/HeroCloud/HeroCloud'), {
  ssr: false,
})

// Each rotating question maps to the semantic classes it lights up in the live
// scan, plus a short (curated, illustrative) answer tinted to the highlight.
// Class names must match those in public/hero-cloud/manifest.json.
const QUERIES: { text: string; classes: string[]; answer: string; color: string }[] = [
  { text: 'Label the structure.', classes: ['beam', 'column'], answer: '13 columns and 13 beams, highlighted', color: '#ffb638' },
  { text: 'What is the floor to ceiling height?', classes: ['floor', 'ceiling'], answer: '15 ft 2 in, floor to slab', color: '#37d495' },
  { text: 'How much headroom is under the services?', classes: ['tga', 'beam'], answer: '10 ft 7 in under the ducts, one beam drops to 7 ft 9 in', color: '#8a7bff' },
  { text: 'Where are the openings?', classes: ['window cutout', 'wall cutout', 'ceiling cutout', 'door rough opening'], answer: '4 windows, 5 wall cutouts, 2 ceiling cutouts, 1 door', color: '#37c6e0' },
]

function QueryConsole({ onActiveChange }: { onActiveChange: (idx: number) => void }) {
  const [reduce, setReduce] = useState(false)
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduce) return
    const full = QUERIES[idx].text
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === full) {
      timeout = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIdx((i) => (i + 1) % QUERIES.length)
    } else {
      const next = deleting
        ? full.slice(0, text.length - 1)
        : full.slice(0, text.length + 1)
      timeout = setTimeout(() => setText(next), deleting ? 18 : 38)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, reduce])

  // Light up the model once a question has finished typing; clear as it deletes.
  const settled = reduce || (!deleting && text === QUERIES[idx].text)
  useEffect(() => {
    onActiveChange(settled ? (reduce ? 0 : idx) : -1)
  }, [settled, idx, reduce, onActiveChange])

  // The answer bar is always present. The text types IN character by character
  // once the question settles...
  const answerIdx = reduce ? 0 : idx
  const full = QUERIES[answerIdx].answer
  const [answer, setAnswer] = useState('')
  useEffect(() => {
    if (!settled) return
    if (reduce) {
      setAnswer(full)
      return
    }
    if (answer === full) return
    const t = setTimeout(() => setAnswer(full.slice(0, answer.length + 1)), answer === '' ? 300 : 22)
    return () => clearTimeout(t)
  }, [settled, answer, full, reduce])

  // ...but on clear it fades out cleanly (see .answerHidden) instead of
  // backspacing like the question, then the bar returns to its loading state.
  useEffect(() => {
    if (settled) return
    const t = setTimeout(() => setAnswer(''), 340)
    return () => clearTimeout(t)
  }, [settled])

  return (
    <div className={styles.console}>
      <div className={styles.consoleRow}>
        <span className={styles.prompt}>ask</span>
        <span className={styles.consoleText}>
          {reduce ? QUERIES[0].text : text}
          <span className={styles.cursor} aria-hidden="true" />
        </span>
      </div>
      <div className={styles.answerRow}>
        <span className={styles.answerPrompt} style={{ color: QUERIES[answerIdx].color }}>
          »
        </span>
        {answer ? (
          <span
            className={`${styles.answerText} ${settled ? '' : styles.answerHidden}`}
            style={{ color: QUERIES[answerIdx].color }}
          >
            {answer}
          </span>
        ) : (
          <span className={styles.answerLoading} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
      </div>
    </div>
  )
}

function Hero() {
  const [cloudReady, setCloudReady] = useState(false)
  const [activeQuery, setActiveQuery] = useState(-1)
  const highlight = activeQuery >= 0 ? QUERIES[activeQuery].classes : []

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.backgroundGlow} />
        <div className={styles.backgroundGrid} />
        <PointField />
      </div>

      {/* Live scan floats large on the right, bleeding faintly behind the text. */}
      <HeroCloud
        className={`${styles.heroCloudLayer} ${cloudReady ? styles.ready : ''}`}
        highlight={highlight}
        onReady={() => setCloudReady(true)}
        onError={() => setCloudReady(false)}
      />

      <div className={styles.content}>
        <div className={styles.textSide}>
          <h1 className={styles.headline}>
            We make models{' '}
            <span className={styles.headlineAccent}>smart.</span>
          </h1>

          <QueryConsole onActiveChange={setActiveQuery} />

          <p className={styles.subheadline}>
            Your scan already holds more than geometry. Landex understands what every point is, so one capture can tell you what is there, how it connects, and how much of it you have. Ask it anything.
          </p>
          <div className={styles.ctaGroup}>
            <a
              className={styles.primaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20make%20my%20model%20smart"
            >
              Send us a model
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              className={styles.secondaryCta}
              href="#system"
              onClick={(e) => {
                const el = document.getElementById('system')
                if (!el) return
                e.preventDefault()
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: { offset?: number }) => void } }).__lenis
                if (lenis) lenis.scrollTo(el, { offset: -80 })
                else el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              See how it works
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}

export default Hero
