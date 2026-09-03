"use client";

import { useEffect, useRef, useState } from 'react'
import AnimateIn from '@/components/AnimateIn'
import styles from './WhereUsed.module.css'

type UseCase = {
  key: string
  tab: string
  who: string
  question: string
  body: string[]
  asks: string[]
}

const useCases: UseCase[] = [
  {
    key: 'input',
    tab: 'Capture in',
    who: 'Input layer',
    question: 'Whatever geometry you have is enough.',
    body: [
      'Terrestrial or mobile LiDAR, photogrammetry, a mesh, an existing model, or a walkthrough video shot on a phone. Landex reads all of them into the same representation, so where the capture came from stops mattering downstream.',
      'No dedicated rig and no capture program to stand up. If a project already produced a point cloud, that is the starting point.',
    ],
    asks: [
      'Point clouds from any scanner.',
      'Meshes and existing BIM or IFC models.',
      'Video walkthroughs, reconstructed into geometry.',
    ],
  },
  {
    key: 'elements',
    tab: 'Element model',
    who: 'Data layer',
    question: 'Every element becomes a record.',
    body: [
      'Under the geometry, Landex builds a structured model. One record per element, with its class, its dimensions, its position, and its relationships to the elements around it. A pipe knows its diameter, its run, and the equipment it serves.',
      'This is the substrate everything else reads from. It is what turns a cloud of points into something software can reason across.',
    ],
    asks: [
      'Class, size, and location for every instance.',
      'System membership and connections between elements.',
      'A stable identity that survives the next capture.',
    ],
  },
  {
    key: 'documents',
    tab: 'Document linkage',
    who: 'Reconciliation layer',
    question: 'The model knows what each thing should be.',
    body: [
      'Schedules, submittals, specs, and drawings attach to the elements they govern. The model carries the intended state next to the observed one, so a mismatch is a query rather than a discovery on site.',
      'Where documents exist they are reconciled. Where they do not, the model becomes the first record.',
    ],
    asks: [
      'Equipment schedule rows tied to installed units.',
      'Submittal and nameplate matched per element.',
      'Spec requirements checked against the field.',
    ],
  },
  {
    key: 'time',
    tab: 'Time',
    who: 'Versioning layer',
    question: 'Every capture is a version of the same model.',
    body: [
      'A new scan does not replace the last one. Each element is matched to itself across captures, so you get what was added, what moved, what was removed, and when.',
      'History is kept at the element, so the answer to what changed is a list rather than two images to compare by eye.',
    ],
    asks: [
      'Diff between any two captures.',
      'First-seen date per element, from the capture it appeared in.',
      'Progress measured against the schedule.',
    ],
  },
  {
    key: 'query',
    tab: 'Query',
    who: 'Access layer',
    question: 'Ask in plain language, or let your systems ask.',
    body: [
      'The same model answers a question typed as a sentence and a request from another system. Counts, quantities, clearances, presence, and change are computed from the element records, not read off a report someone prepared.',
      'Nothing here is a canned dashboard. If the model contains the answer, it can be asked for.',
    ],
    asks: [
      'Natural language questions from your desk.',
      'Pulled directly into your own tools and pipelines.',
      'Every answer backed by the capture frame that supports it.',
    ],
  },
  {
    key: 'ownership',
    tab: 'Open and portable',
    who: 'Ownership layer',
    question: 'Yours, in formats your tools already read.',
    body: [
      'The model exports to the formats the industry runs on and links into the tooling your team already uses. It is not a login you rent. It is an asset you keep, structured so the software you buy in ten years can still read it.',
      'The project ends, the contractor demobilizes, the platform contract expires. The model stays with the building.',
    ],
    asks: [
      'IFC and standard geometry exports.',
      'Linkable from the BIM and GIS tools you already run.',
      'Owned by the building owner for its life.',
    ],
  },
]

function WhereUsed() {
  const [active, setActive] = useState('elements')
  const activeIndex = useCases.findIndex((u) => u.key === active)
  const current = useCases[activeIndex] ?? useCases[0]

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = useState({ top: 0, height: 0 })

  useEffect(() => {
    const measure = () => {
      const el = itemRefs.current[activeIndex]
      if (el) setIndicator({ top: el.offsetTop, height: el.offsetHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeIndex])

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let n: number | null = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % useCases.length
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + useCases.length) % useCases.length
    if (e.key === 'Home') n = 0
    if (e.key === 'End') n = useCases.length - 1
    if (n === null) return
    e.preventDefault()
    setActive(useCases[n].key)
    itemRefs.current[n]?.focus()
  }

  return (
    <section id="infrastructure" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>The infrastructure</span>
            <h2 className={styles.title}>
              Built to be built on.
            </h2>
            <p className={styles.subtitle}>
              A smart model is only useful if everything else can reach it. Landex is structured as a stack, so your captures, your documents, your tools, and your next scan all land on the same model.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className={styles.explorer}>
            <div className={styles.rail} role="tablist" aria-label="Infrastructure layers" aria-orientation="vertical">
              <span
                className={styles.railIndicator}
                aria-hidden="true"
                style={{ transform: `translateY(${indicator.top}px)`, height: indicator.height }}
              />
              {useCases.map((u, i) => {
                const on = u.key === active
                return (
                  <button
                    key={u.key}
                    ref={(el) => { itemRefs.current[i] = el }}
                    className={`${styles.railItem} ${on ? styles.railItemActive : ''}`}
                    role="tab"
                    id={`uc-tab-${u.key}`}
                    aria-selected={on}
                    aria-controls={`uc-panel-${u.key}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(u.key)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    <span className={styles.railIndex}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.railLabel}>{u.tab}</span>
                  </button>
                )
              })}
            </div>

            <div
              className={styles.panel}
              role="tabpanel"
              id={`uc-panel-${current.key}`}
              aria-labelledby={`uc-tab-${current.key}`}
              tabIndex={0}
            >
              <div key={current.key} className={styles.panelInner}>
                <p className={styles.who}>{current.who}</p>
                <h3 className={styles.question}>{current.question}</h3>
                <div className={styles.grid}>
                  <div className={styles.body}>
                    {current.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <div className={styles.asks}>
                    <h4 className={styles.asksTitle}>What that gives you</h4>
                    <ul className={styles.asksList}>
                      {current.asks.map((a, i) => (
                        <li key={i} className={styles.ask}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default WhereUsed
