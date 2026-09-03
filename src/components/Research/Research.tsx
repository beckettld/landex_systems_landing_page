"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Research.module.css'

const io = [
  {
    id: 'IN',
    tag: 'Your materials',
    title: 'What goes in',
    items: [
      'Video walkthroughs shot on a phone',
      'LiDAR and mobile scans from any scanner',
      'Photogrammetry and meshes',
      'Existing BIM or IFC models',
      'The schedules, submittals, and drawings you already hold',
    ],
  },
  {
    id: 'OUT',
    tag: 'Decoded per use case',
    title: 'What you receive',
    items: [
      'Class names for every point and every object',
      'Relationships: what connects to what, and what belongs to which system',
      'Heatmaps of any condition you can name',
      'Counts, dimensions, and quantities',
      'Whatever your use case needs next, read from the same understanding',
    ],
  },
]

const stance = [
  {
    n: '01',
    title: 'Built in-house.',
    body: 'The models and the data they learn from are our own, built for the built environment rather than adapted from somewhere else.',
  },
  {
    n: '02',
    title: 'One understanding, many readouts.',
    body: 'We do not build a new model for every question. Every point is understood once, deeply, and each use case receives its own readout of that understanding. A new question does not need a new scan.',
  },
  {
    n: '03',
    title: 'Judged on the output.',
    body: 'What we will show you is the result on your own building. If the count, the size, and the identity come back right, the method has done its job.',
  },
]

function Research() {
  return (
    <section id="research" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Research</span>
            <h2 className={styles.title}>Deep spatial understanding, decoded for you.</h2>
            <p className={styles.subtitle}>
              Our models take in the materials you already have and give every point in them a deep understanding of what it is. What you receive is that understanding decoded into the data your use case needs.
            </p>
          </div>
        </AnimateIn>

        <div className={styles.layout}>
          <AnimateIn delay={0.1} className={styles.gridWrap}>
            <div className={styles.grid}>
              {io.map((c) => (
                <article key={c.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardId}>{c.id}</span>
                    <span className={styles.cardTag}>{c.tag}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <ul className={styles.cardList}>
                    {c.items.map((it) => (
                      <li key={it} className={styles.cardItem}>{it}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2} direction="right" className={styles.asideWrap}>
            <aside className={styles.aside}>
              <span className={styles.asideLabel}>Our stance</span>
              <ol className={styles.method}>
                {stance.map((m) => (
                  <li key={m.n} className={styles.methodItem}>
                    <span className={styles.methodNum}>{m.n}</span>
                    <div>
                      <h4 className={styles.methodTitle}>{m.title}</h4>
                      <p className={styles.methodBody}>{m.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Research
