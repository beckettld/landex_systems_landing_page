"use client";

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

const steps = [
  {
    number: '01',
    title: 'Any geometry you already have.',
    description: 'A point cloud from a project scan, a mesh, an existing model, or a video walkthrough shot on a phone. No rig, no prep, no new capture program.',
  },
  {
    number: '02',
    title: 'Every point understood.',
    description: 'Not a label stamped on a mesh. Each point carries a deep representation of what it is, what it is part of, and how it relates to what is around it, learned from real buildings.',
  },
  {
    number: '03',
    title: 'Decoded for your use case.',
    description: 'The same understanding reads out as class names, relationships between systems, a heatmap of any condition you can name, or counts and quantities. New question, new readout. No new scan.',
  },
  {
    number: '04',
    title: 'Checked and delivered.',
    description: 'Compared against the documents and earlier captures you provide, then delivered in plain language or in the formats your tools already read.',
  },
]

function Solution() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 68%', 'end 65%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>The engine</span>
          <h2 className={styles.title}>
            Geometry goes in. Understanding comes back.
          </h2>
          <p className={styles.subtitle}>
            A point cloud is millions of points that do not know what they are. A BIM knows what was drawn, not what was built. Landex sits between the two. Our models give every point a deep understanding of what it is, what it belongs to, and how it relates to what is around it. That understanding is the product. Everything a use case needs is decoded from it.
          </p>
        </AnimateIn>
        <div className={styles.steps} ref={stepsRef}>
          <div className={styles.timeline} aria-hidden="true">
            <motion.div className={styles.timelineProgress} style={{ scaleY }} />
          </div>
          {steps.map((step, i) => (
            <AnimateIn key={step.number} delay={0.1 + i * 0.08}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solution
