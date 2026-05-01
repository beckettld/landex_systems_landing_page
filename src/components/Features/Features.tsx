"use client";

import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import StaggerContainer, { staggerItem } from '@/components/StaggerContainer'
import styles from './Features.module.css'

const industries = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20" />
        <path d="M2 12h20" />
      </svg>
    ),
    title: 'Oil & gas',
    description: 'Pipelines, wells, ROW, integrity packages, asset transfers. Decades of records, queryable per asset.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Utilities',
    description: 'Water, gas, electric. Service area transfers, system acquisitions, infrastructure handoffs. Know what\'s underground before responsibility passes to you.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20h20" />
        <path d="M5 20V8l7-5 7 5v12" />
        <path d="M9 20v-4h6v4" />
      </svg>
    ),
    title: 'Civil engineering',
    description: 'Site diligence, project initiation, prior-work surfacing on inherited engagements. Every record relevant to a parcel, in one place.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Manufacturing',
    description: 'Facility acquisitions, equipment transfers, plant handoffs. Every drawing that matters before the keys change hands.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: 'Real estate',
    description: 'CRE diligence, environmental Phase I, site history. Records research that takes weeks, completed in days.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22c-4.97 0-9-2.69-9-6v-4" />
        <path d="M3 8c0-3.31 4.03-6 9-6s9 2.69 9 6-4.03 6-9 6-9-2.69-9-6" />
        <path d="M21 8v4c0 3.31-4.03 6-9 6" />
        <path d="M21 12v4c0 3.31-4.03 6-9 6" />
      </svg>
    ),
    title: 'Mining & minerals',
    description: 'Claims, leases, exploration records, asset transfers. Decades of survey and exploration data, structured per claim.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: 'Rail & transit',
    description: 'Corridor transfers, infrastructure handoffs, maintenance package handovers.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
      </svg>
    ),
    title: 'Municipal government & federal',
    description: 'Permitting, land transactions, infrastructure inventory, NEPA support. Every record relevant to a parcel, in one place.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
    title: 'Insurance & underwriting',
    description: 'Property and asset risk assessment grounded in the actual record set, not just the application.',
  },
]

function Features() {
  return (
    <section id="industries" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Who we work with</span>
            <h2 className={styles.title}>
              Built for teams that buy, build on, take over, and operate the physical world.
            </h2>
            <p className={styles.subtitle}>
              If your work depends on knowing exactly what's at a place before you decide, dig, sign, or break ground, we can help.
            </p>
          </div>
        </AnimateIn>
        <StaggerContainer className={styles.grid} stagger={0.06}>
          {industries.map((industry) => (
            <motion.div key={industry.title} className={styles.card} variants={staggerItem}>
              <div className={styles.cardIcon}>{industry.icon}</div>
              <h3 className={styles.cardTitle}>{industry.title}</h3>
              <p className={styles.cardDescription}>{industry.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default Features
