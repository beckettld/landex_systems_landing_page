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
    description: 'Plants, refineries, petrochemical, LNG, chemical. Element-rich scopes where a single bleeding package can swing the whole job, and a turnaround leaves no time to find it late.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Energy and utilities buildouts',
    description: 'Substations, generation, pipeline, distribution. High-dollar scopes where cost and schedule performance have to be visible per package, not just per project.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: 'Civil and heavy infrastructure',
    description: 'Roads, bridges, transit, water and wastewater. Long-duration work where variance compounds quietly across phases and crew turnover.',
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
    description: 'Office, healthcare, life sciences, data centers, education. MEP-heavy work where the gap between earned and spent opens fastest.',
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
              Built for anyone who owns the budget and can still change the outcome.
            </h2>
            <p className={styles.subtitle}>
              If you are accountable for whether a project lands on cost and on schedule, and you need to know which scope is in trouble in time to do something, Landex counts it.
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
