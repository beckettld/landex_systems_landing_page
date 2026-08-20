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
  { text: 'How many cabinets line this kitchen?', classes: ['cabinet'], answer: '14 cabinet runs · 22 linear ft', color: '#37d495' },
  { text: 'Where does the countertop meet the sink?', classes: ['countertop', 'counter', 'sink'], answer: '1 sink basin set into 3 counter segments', color: '#ffb638' },
  { text: 'Is the refrigerator clear of the door swing?', classes: ['refrigerator', 'door'], answer: 'Yes — 4 in clearance to the door arc', color: '#8a7bff' },
  { text: 'Flag every appliance in the room.', classes: ['refrigerator', 'stove', 'microwave', 'dishwasher'], answer: '4 appliances — fridge, stove, microwave, dishwasher', color: '#5fd0b0' },
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
            A scan of your building that{' '}
            <span className={styles.headlineAccent}>answers questions.</span>
          </h1>

          <QueryConsole onActiveChange={setActiveQuery} />

          <p className={styles.subheadline}>
            We label every part of the scan and tie it to the system it belongs to. Count what is installed, find a part, measure the space around it, from your desk.
          </p>
          <div className={styles.ctaGroup}>
            <a
              className={styles.primaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20process%20my%20scan"
            >
              Send us a scan to label
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              className={styles.secondaryCta}
              href="mailto:allen@landexsystems.com?subject=Landex%20%E2%80%94%20book%20a%20call"
            >
              Or book a call
            </a>
          </div>
          <p className={styles.tagline}>
            A walk through the building goes in. A labeled, connected building comes back.
          </p>
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
