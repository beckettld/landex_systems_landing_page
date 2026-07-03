"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

function Solution() {
  return (
    <section id="what-landex-does" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.twoCol}>
          <AnimateIn>
            <div className={styles.colLeft}>
              <span className={styles.eyebrow}>What Landex does</span>
              <h2 className={styles.title}>
                We count what is installed, then turn the count into a live productivity factor.
              </h2>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className={styles.colRight}>
              <p className={styles.subtitle}>
                We start with the documents that define the work: the model, the equipment list, the schedule of values, the baseline schedule. We break work into IWPs, each tied to a cost code, each carrying its planned labor hours and MCAA labor units. That sets the budget and the plan for every element.
              </p>
              <p className={styles.body}>
                We count what is installed against those documents, through whatever your team already captures: phone video, 360 walkthroughs, laser scans. No new hardware, no new field behavior.
              </p>
              <p className={styles.body} style={{ marginTop: '16px' }}>
                That count is your earned value. We roll it up per IWP and cost code, set earned hours against charged hours, and pull actual cost from your job cost system. Because every number is built from named, counted elements, you can open any variance and see the exact units behind it.
              </p>
              <p className={styles.body} style={{ marginTop: '16px' }}>
                The moment a scope runs burned over earned, it flags, with the specific elements missing. Earlier than the weekly loop can surface it. Integrates with Procore, Autodesk Construction Cloud, and your stack via API.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Solution
