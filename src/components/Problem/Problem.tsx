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
            The model goes dumb the moment construction starts.
          </h2>
        </AnimateIn>
        <div className={styles.points}>
          <AnimateIn delay={0.1}>
            <div className={styles.point}>
              <div className={styles.pointMarker} />
              <div className={styles.pointContent}>
                <h3 className={styles.pointTitle}>Every major project is modeled in 3D before groundbreaking</h3>
                <p className={styles.pointBody}>
                  Architects, engineers, and contractors coordinate against a shared model. It is the most detailed representation of the project that exists.
                </p>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className={styles.point}>
              <div className={styles.pointMarker} />
              <div className={styles.pointContent}>
                <h3 className={styles.pointTitle}>Then construction starts. The site changes daily. The model doesn't.</h3>
                <p className={styles.pointBody}>
                  Tracking reality falls to site walks, photos, and videos. Two people on the same site come back with different answers. Schedules slip, mistakes get made, and millions are spent fixing them.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
        <AnimateIn delay={0.3}>
          <div className={styles.stat}>
            <span className={styles.statFigure}>$31B</span>
            <span className={styles.statLabel}>lost annually in U.S. construction to inaccurate or inaccessible information</span>
            <span className={styles.statSource}>FMI Corporation</span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Problem
