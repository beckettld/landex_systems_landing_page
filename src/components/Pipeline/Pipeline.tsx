"use client";

import AnimateIn from '@/components/AnimateIn'
import { mailto } from '@/lib/contact'
import styles from './Pipeline.module.css'

// One step per screen of the platform, in the order you meet them.
const stages = [
  {
    name: 'Upload your scan.',
    desc: 'A LiDAR point cloud, a drone capture, or a model you already have. Drop it on New scan and processing starts on its own.',
    meta: 'your file',
    src: '/platform/upload.jpg',
    alt: 'The scans page, with a New scan tile and six processed scans',
  },
  {
    name: 'Set the run up.',
    desc: 'Crop to the part you care about, say what was captured and what you want back, then price the run. From there every point gets labeled with nobody in the loop, usually within 20 minutes.',
    meta: 'about 20 minutes',
    src: '/platform/prep.jpg',
    alt: 'The prep step: a plan-view crop window, a height band, and the survey form',
  },
  {
    name: 'Take what you need.',
    desc: 'Count tables, pins, and plans download as CSV, PDF, or DXF. Ask it anything else on the same page. Every number is measured from the point cloud, and what the answer is about lights up in the view.',
    meta: 'what you receive',
    src: '/platform/ask.jpg',
    alt: 'The viewer with a labeled drone survey tile, every building, greenhouse, road and vehicle boxed, and the Ask the scan panel open',
  },
]

function Pipeline() {
  return (
    <section id="system" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.head}>
            <span className={styles.eyebrow}>How it works</span>
            <p className={styles.lede}>
              Send us one scan first and we show you what came back. After that you are on the platform, and it is self serve: about 20 minutes from upload to answers.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <ol className={styles.flow}>
            {stages.map((s, i) => (
              <li key={s.name} className={styles.stage} style={{ ['--i' as string]: i }}>
                <span className={styles.node} aria-hidden="true" />
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.name}>{s.name}</h3>
                <p className={styles.desc}>{s.desc}</p>
                <span className={styles.meta}>{s.meta}</span>
                <div className={styles.shot}>
                  <img src={s.src} alt={s.alt} loading="lazy" />
                </div>
              </li>
            ))}
          </ol>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <a className={styles.cta} href={mailto('scan')}>
            Send us a scan
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <p className={styles.note}>
            <strong>Your scan stays yours.</strong> We process it, send back the outputs, and never resell or train on your data.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Pipeline
