"use client";

import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import StaggerContainer, { staggerItem } from '@/components/StaggerContainer'
import styles from './Features.module.css'

const sectors = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: 'Industrial and process facilities',
    description: 'Plants, refineries, petrochemical, LNG, chemical manufacturing. Element-rich projects where document linkage to physical work is the difference between a clean commissioning and a six-month closeout. This is where substitution catches alone pay for the system.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Energy and utilities buildouts',
    description: 'Substations, generation, pipeline construction, distribution upgrades. Projects where regulatory inspection trails matter as much as the physical work.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: 'Civil and heavy infrastructure',
    description: 'Roads, bridges, transit corridors, water and wastewater. Long-duration projects where the record has to stay honest across phases and through crew turnover.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20h20" />
        <path d="M5 20V8l7-5 7 5v12" />
        <path d="M9 20v-4h6v4" />
      </svg>
    ),
    title: 'Commercial and institutional construction',
    description: 'Office, healthcare, life sciences, data centers, education, mixed-use. MEP-heavy work where the gap between design and as-built is most expensive.',
  },
]

function Features() {
  return (
    <section id="industries" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Who it's for</span>
            <h2 className={styles.title}>
              Built for anyone responsible for getting a project built right.
            </h2>
            <p className={styles.subtitle}>
              If your project gets built, gets inspected, and gets handed over, Landex fits.
            </p>
          </div>
        </AnimateIn>
        <StaggerContainer className={styles.grid} stagger={0.06}>
          {sectors.map((sector) => (
            <motion.div key={sector.title} className={styles.card} variants={staggerItem}>
              <div className={styles.cardIcon}>{sector.icon}</div>
              <h3 className={styles.cardTitle}>{sector.title}</h3>
              <p className={styles.cardDescription}>{sector.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default Features
