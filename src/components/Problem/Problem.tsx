"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Problem.module.css'

function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>The problem</span>
          <h2 className={styles.title}>
            Your earned value is built on a number nobody counted.
          </h2>
        </AnimateIn>
        <div className={styles.proseList}>
          <AnimateIn delay={0.1}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>Percent complete is a guess</h3>
              <p className={styles.proseBody}>
                Earned value is budget times percent complete. On every project, that percent complete is self-reported by the field. Nobody counts the boxes. So the cost variance and schedule variance you track all the way up to the executive dashboard rest on a number the crew handed you.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The number rolls up too high to act on</h3>
              <p className={styles.proseBody}>
                Even where the math is clean, it lives at the project or cost-code level. You learn the whole job is running a 0.94 CPI. You do not learn that you are paying for 174 elements that are not installed yet, or which scope they are in. A number you cannot trace to specific work is a number you cannot fix.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>You learn it too late to change course</h3>
              <p className={styles.proseBody}>
                By the time the overage surfaces in the WIP review or at closeout, the labor is spent and the schedule is set. The window where moving a crew or holding a pay app would have mattered closed weeks ago.
              </p>
            </div>
          </AnimateIn>
        </div>
        <AnimateIn delay={0.4}>
          <div className={styles.stat}>
            <span className={styles.statFigure}>3–7%</span>
            <span className={styles.statLabel}>of total project cost is lost to billing and progress errors that go uncaught until late. On a $10M project, that is up to $700K that was countable months earlier, if anyone had counted it.</span>
            <span className={styles.statSource}>Industry benchmark, construction project cost review</span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Problem
