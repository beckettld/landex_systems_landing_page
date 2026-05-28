"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

function Solution() {
  return (
    <section id="what-landex-does" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>What Landex does</span>
          <h2 className={styles.title}>
            One model. Every element. Always current.
          </h2>
          <p className={styles.subtitle}>
            Landex builds an objective 3D representation of your site where every element understands its own context. Site captures, drawings, change orders, schedules, and submittals all feed into the same model. The model stays true as the site evolves.
          </p>
          <p className={styles.body}>
            You stop translating between the site and the paperwork because the model holds both.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Solution
