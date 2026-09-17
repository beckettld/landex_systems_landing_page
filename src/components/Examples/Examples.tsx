"use client";

import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import StaggerContainer, { staggerItem } from '@/components/StaggerContainer'
import styles from './Examples.module.css'

// Three public showcases, each a real scan with what came back. They open in
// a new tab; this is the one place on the page that is not the inbox.
const examples = [
  {
    href: 'https://demo.landexsystems.com',
    host: 'demo.landexsystems.com',
    kind: 'Ask a scan anything',
    title: 'A kitchen and a village, labeled.',
    body: 'A LiDAR kitchen scan and a drone-survey tile. Type a question and the answer lights up in the point cloud.',
  },
  {
    href: 'https://bim.landexsystems.com',
    host: 'bim.landexsystems.com',
    kind: 'Scan to BIM',
    title: 'A building shell as a model.',
    body: 'A construction-site scan rebuilt as BIM elements you can toggle against the raw points.',
  },
  {
    href: 'https://geospatial.landexsystems.com',
    host: 'geospatial.landexsystems.com',
    kind: 'Drone survey inventory',
    title: 'A site tile, counted and measured.',
    body: 'Every building, greenhouse, road, and vehicle on a 100 m tile, with the PDF, GeoJSON, and CSV that go with it.',
  },
]

function Examples() {
  return (
    <section id="examples" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Live examples</span>
            <h2 className={styles.title}>Three real scans, and what came back.</h2>
          </div>
        </AnimateIn>
        <StaggerContainer className={styles.grid} stagger={0.08}>
          {examples.map((ex) => (
            <motion.a
              key={ex.host}
              href={ex.href}
              target="_blank"
              rel="noopener"
              className={styles.card}
              variants={staggerItem}
            >
              <span className={styles.kind}>{ex.kind}</span>
              <h3 className={styles.cardTitle}>{ex.title}</h3>
              <p className={styles.cardBody}>{ex.body}</p>
              <span className={styles.host}>
                {ex.host}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </motion.a>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default Examples
