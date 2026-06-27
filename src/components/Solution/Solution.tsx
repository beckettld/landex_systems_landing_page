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
                We count what is installed, then turn the count into earned value.
              </h2>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className={styles.colRight}>
              <p className={styles.subtitle}>
                Landex starts with the documents that define the work: the model, the equipment list, the line specs, the schedule of values, the baseline schedule. That gives us the budget and the plan for every element on the job.
              </p>
              <p className={styles.body}>
                We then count what is actually installed against those documents, through whatever your team is already capturing: phone video, 360 walkthroughs, drone footage, laser scans. Not a sampled walk. Every element the documents describe, checked against the field.
              </p>
              <p className={styles.body} style={{ marginTop: '16px' }}>
                That count is your earned value. We roll it up per component, scope, and system, set it against the budgeted cost and the planned schedule, and pull actual cost from your job cost system. Because the number is built from named, counted elements, you can always open any variance and see the exact units behind it.
              </p>
              <p className={styles.body} style={{ marginTop: '16px' }}>
                The moment a scope runs behind plan or behind budget, it flags, with the specific elements that are missing. Not at closeout. While you can still move a crew, hold a pay app, escalate a sub, or change the plan.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Solution
