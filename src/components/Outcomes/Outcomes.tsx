"use client";

import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import StaggerContainer, { staggerItem } from '@/components/StaggerContainer'
import styles from './Outcomes.module.css'

type IconName = 'plan' | 'count' | 'measure' | 'ask'

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'plan':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 12h9M12 3v9M12 12v9M12 12h9" />
        </svg>
      )
    case 'count':
      return (
        <svg {...common}>
          <path d="M5 9h14M4 15h14M10 4l-2 16M16 4l-2 16" />
        </svg>
      )
    case 'measure':
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="8" rx="1" />
          <path d="M7 8v3M11 8v4M15 8v3" />
        </svg>
      )
    case 'ask':
      return (
        <svg {...common}>
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M9 10h6" />
        </svg>
      )
  }
}

const items: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'plan',
    title: 'Skip the drafting.',
    body: 'Floor plans and areas by room come straight from the scan.',
  },
  {
    icon: 'count',
    title: 'Count it without going back.',
    body: 'Equipment, fixtures, stockpiles. Every item is pinned where it sits.',
  },
  {
    icon: 'measure',
    title: 'Measure from your desk.',
    body: 'Lengths, areas, and distances from the scan you already paid for.',
  },
  {
    icon: 'ask',
    title: 'Ask what isn’t on the list.',
    body: 'Type a question. There is no menu of reports.',
  },
]

function Outcomes() {
  return (
    <section id="outcomes" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.head}>
            <span className={styles.eyebrow}>What you get</span>
            <h2 className={styles.title}>The work after the scan, done for you.</h2>
          </div>
        </AnimateIn>
        <StaggerContainer className={styles.grid} stagger={0.08}>
          {items.map((it) => (
            <motion.div key={it.title} className={styles.card} variants={staggerItem}>
              <span className={styles.icon}>
                <Icon name={it.icon} />
              </span>
              <h3 className={styles.cardTitle}>{it.title}</h3>
              <p className={styles.cardBody}>{it.body}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default Outcomes
