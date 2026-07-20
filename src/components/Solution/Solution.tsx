"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

const steps = [
  {
    number: '01',
    title: 'Whoever already walks the site just films it',
    description: 'Someone is already walking the job, your super, your PM, your rep. They point their phone at what they are already looking at, before the wall closes, during install, and after. No 360 rig, no dedicated walker, no trades to coordinate. The walk already happens; now it is captured.',
  },
  {
    number: '02',
    title: 'Landex grounds it in a rich spatial model',
    description: 'Every element is identified, keyed to the real component, and embedded semantically in a model of the site. This is the substrate. It is what separates a picture of the job from something a reasoning model can think across.',
  },
  {
    number: '03',
    title: 'Landex reasons across the full context',
    description: 'Landex reads across the field and the documents that govern it, the drawings, the submittals, the meetings, as one connected context. It surfaces the problems and inefficiencies that cost the owner money, reconciling what was installed against what was approved wherever they disagree.',
  },
  {
    number: '04',
    title: 'Your rep acts on it while the job is live',
    description: 'The findings land while the trades are still on site, when a fix is cheap. Your rep drives real gains against schedule and cost, on the same walks they already do. The record you build along the way is yours to keep.',
  },
]

function Solution() {
  return (
    <section id="what-landex-does" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.title}>
            Whoever already walks the site just films what they are looking at. Landex turns it into context you can reason over.
          </h2>
          <p className={styles.subtitle}>
            No rig, no new person, no new field behavior. The walkthrough already happens, now it is captured on the phone in their pocket.
          </p>
        </AnimateIn>
        <div className={styles.steps}>
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
