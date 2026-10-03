"use client";

import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import StaggerContainer, { staggerItem } from '@/components/StaggerContainer'
import styles from './Examples.module.css'

// Three public showcases, each a real scan with what came back. They open in
// a new tab; this is the one place on the page that is not the inbox. A card
// whose work is sold as a named product also links to that product's page.
const examples: {
  href: string
  host: string
  kind: string
  title: string
  src: string
  alt: string
  body: string
  product?: { href: string; label: string }
}[] = [
  {
    href: 'https://demo.landexsystems.com',
    host: 'demo.landexsystems.com',
    kind: 'Ask a scan anything',
    title: 'A kitchen, labeled and askable.',
    src: '/examples/demo.jpg',
    alt: 'The demo viewer: a LiDAR kitchen scan with every chair numbered and the Ask the scan panel answering how many there are',
    body: 'A LiDAR scan of a furnished kitchen. Type a question and the answer lights up in the point cloud.',
  },
  {
    href: 'https://bim.landexsystems.com',
    host: 'bim.landexsystems.com',
    kind: 'Scan to BIM',
    product: { href: '/tesseract', label: 'Tesseract' },
    title: 'Five scans, five models.',
    src: '/examples/bim.jpg',
    alt: 'The BIM showcase: a brick cottage rebuilt as a Revit model with its roof, chimney, doors, windows and gutters',
    body: 'A house, a plant room, a timber frame, a lattice tower and a motorway bridge, each rebuilt as a model you can check against its scan.',
  },
  {
    href: 'https://geospatial.landexsystems.com',
    host: 'geospatial.landexsystems.com',
    kind: 'Drone survey inventory',
    title: 'A site tile, counted and measured.',
    src: '/examples/geospatial.jpg',
    alt: 'The geospatial showcase: a 100 m drone survey tile with buildings, greenhouses, roads and trees outlined',
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
            <motion.div key={ex.host} className={styles.card} variants={staggerItem}>
              {/* the whole card opens the example; the product link sits above it */}
              <a className={styles.cover} href={ex.href} target="_blank" rel="noopener" aria-label={`${ex.title} ${ex.host}`} />
              <span className={styles.thumb}>
                <img src={ex.src} alt={ex.alt} loading="lazy" />
              </span>
              <div className={styles.text}>
                <span className={styles.kind}>{ex.kind}</span>
              <h3 className={styles.cardTitle}>{ex.title}</h3>
              <p className={styles.cardBody}>{ex.body}</p>
              <span className={styles.host}>
                {ex.host}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
              {ex.product && (
                <a className={styles.product} href={ex.product.href}>
                  Built with {ex.product.label} &rarr;
                </a>
              )}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default Examples
