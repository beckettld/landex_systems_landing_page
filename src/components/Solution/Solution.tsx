"use client";

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

const steps = [
  {
    number: '01',
    title: 'Capture comes in however you have it.',
    description: 'A walk with a handheld scanner, a survey-grade laser scan, or a phone walkthrough. Send someone through your building, or send us the scan your project already produced.',
  },
  {
    number: '02',
    title: 'The model comes back knowing what it is made of.',
    description: 'Every pipe, duct, conduit, fitting and piece of equipment identified as what it is, sized, placed, and tied to what it runs to. Linkable in the tooling your team already uses.',
  },
  {
    number: '03',
    title: 'Interact with it.',
    description: 'Ask questions of your model without sending someone to the site or paying a vendor to go do it.',
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
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.title}>
            From a walkthrough to a model you can question.
          </h2>
          <p className={styles.subtitle}>
            Most of what a BIM gets you, without the scan-to-BIM workflow. And where a point cloud only gives you something to look at, this you can just ask.
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
