"use client";

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import PointField from '@/components/PointField/PointField'
import { CONTACT_EMAIL } from '@/lib/contact'
import EmailLink from '@/components/EmailLink/EmailLink'
import styles from './Hero.module.css'

// three.js lives client-only and stays out of the initial bundle.
const HeroCloud = dynamic(() => import('@/components/HeroCloud/HeroCloud'), {
  ssr: false,
})

// The headline swaps its object every few seconds: the outputs people
// actually pull out of a scan by hand today.
const OUTPUTS = ['equipment counts', 'floor plans', 'quantity takeoffs', 'asset lists', 'answers']

// Each rotating question maps to the semantic classes it lights up in the live
// scan, plus a short answer tinted to the highlight. The scan is one 100 m
// drone-survey tile of a village site; the answers are its real inventory.
// Class names must match those in public/hero-cloud/manifest.json.
const QUERIES: { text: string; classes: string[]; answer: string; color: string }[] = [
  { text: 'Count the buildings.', classes: ['building'], answer: '14 roofed structures: 5 houses, 9 sheds and annexes', color: '#ff6a4d' },
  { text: 'How much greenhouse is on this tile?', classes: ['greenhouse'], answer: '8 greenhouses, 13 bays, 1,870 m² under cover', color: '#37c6e0' },
  { text: 'Measure the roads.', classes: ['road'], answer: '7 runs, 235 m in total, 2.3 to 6.8 m wide', color: '#d8d8e0' },
  { text: 'What is parked here?', classes: ['vehicle'], answer: '4 cars, a flatbed trailer, and a farm cart', color: '#e660d8' },
  { text: 'Where is material stored?', classes: ['material'], answer: '13 piles and stacks: bagged material, tile, brick, timber', color: '#ffb638' },
  { text: 'Count the trees.', classes: ['tree', 'tree_group'], answer: '11 single trees, 3.4 to 7.5 m tall, and 7 canopy groups', color: '#37d495' },
]

// Rotating object in the headline. Fades out, swaps, fades in.
function RotatingWord() {
  const [idx, setIdx] = useState(OUTPUTS.length - 1) // start on "answers"
  const [shown, setShown] = useState(true)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduce) return
    const hold = setTimeout(() => setShown(false), 2600)
    return () => clearTimeout(hold)
  }, [idx, reduce])

  useEffect(() => {
    if (shown || reduce) return
    const swap = setTimeout(() => {
      setIdx((i) => (i + 1) % OUTPUTS.length)
      setShown(true)
    }, 380)
    return () => clearTimeout(swap)
  }, [shown, reduce])

  const word = reduce ? OUTPUTS[OUTPUTS.length - 1] : OUTPUTS[idx]
  return (
    <span className={styles.rotator} aria-live="polite">
      <span className={`${styles.rotatorWord} ${shown ? styles.rotatorIn : styles.rotatorOut}`}>{word}</span>
    </span>
  )
}

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
            Turn point clouds into
            <br />
            <RotatingWord />
            <span className={styles.headlineAccent}>.</span>
          </h1>

          <QueryConsole onActiveChange={setActiveQuery} />

          <p className={styles.subheadline}>
            Send us a scan you already have. Get back the counts, areas, and plans your team would otherwise pull out by hand. Then ask it anything else in plain language.
          </p>
          <div className={styles.ctaGroup}>
            <EmailLink className={styles.primaryCta} topic="scan">
              Send us a scan
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </EmailLink>
            <EmailLink className={styles.secondaryCta} topic="api">
              API access: email {CONTACT_EMAIL}
            </EmailLink>
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
