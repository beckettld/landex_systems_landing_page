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
            Your documents and your field stop agreeing the moment construction starts.
          </h2>
        </AnimateIn>
        <div className={styles.proseList}>
          <AnimateIn delay={0.1}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>Two records, one asset</h3>
              <p className={styles.proseBody}>
                Every large project starts with two records of the same asset. The physical one in the field, and the document one that defines what should exist: models, specs, approved submittals, certs, test records, change orders.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>Construction breaks the match</h3>
              <p className={styles.proseBody}>
                When construction starts, lead times force substitutions that never make it into the submittal log, drawings get revised but crews work off the old set, and completion sign-offs drift from what is actually installed. Within weeks, the documents and the physical project are telling two different stories about the same job.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The cost of finding it late</h3>
              <p className={styles.proseBody}>
                Closing that gap has always fallen to senior people walking the site by hand on a fraction of the work. The errors that slip through get found at hydrotest, at commissioning, or at startup, when the same fix costs ten to a hundred times more than it would have at install.
              </p>
            </div>
          </AnimateIn>
        </div>
        <AnimateIn delay={0.4}>
          <div className={styles.stat}>
            <span className={styles.statFigure}>$31B</span>
            <span className={styles.statLabel}>lost annually in U.S. construction to inaccurate or inaccessible information</span>
            <span className={styles.statSource}>FMI Corporation</span>
            <span className={styles.statLabel} style={{ marginTop: '8px' }}>About half of all construction rework traces to bad data and document gaps, not workmanship.</span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Problem
