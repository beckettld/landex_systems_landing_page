"use client";

import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import StaggerContainer, { staggerItem } from '@/components/StaggerContainer'
import styles from './Security.module.css'

const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Your environment',
    description: 'Deploy in your VPC, on-prem, or in a sovereign cloud. Your documents never leave your perimeter.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Your access controls',
    description: 'SSO, role-based permissions, audit logging. Inherits the policies you already run.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    ),
    title: 'Your compliance posture',
    description: 'CUI, ITAR, NDA\'d diligence, regulated environments. Designed to fit your existing controls, not replace them.',
  },
]

function Security() {
  return (
    <section id="security" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>Security & deployment</span>
          <h2 className={styles.title}>
            Runs on your infrastructure. Under your security policies.
          </h2>
          <p className={styles.subtitle}>
            Federal jobs, NDA'd transactions, and regulated environments. Out of the box.
          </p>
        </AnimateIn>
        <StaggerContainer className={styles.items} stagger={0.1}>
          {items.map((item) => (
            <motion.div key={item.title} className={styles.item} variants={staggerItem}>
              <div className={styles.itemIcon}>{item.icon}</div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default Security
