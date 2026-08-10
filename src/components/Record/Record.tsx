"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Record.module.css'

function Record() {
  return (
    <section id="what-you-get" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>What you get</span>
          <h2 className={styles.title}>A model of your building you can ask questions of, not just look at.</h2>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className={styles.prose}>
            <p className={styles.body}>
              Geometry tight to the capture, so the model matches the building instead of matching the drawings. A label on every instance, so each pipe, duct, conduit, panel and fitting is tied to the system it belongs to, on its own. The connections between them, so the model can be traversed. And counts and dimensions pulled out without anyone measuring.
            </p>
            <p className={styles.body}>
              Most of what people build a BIM to get, without the scan-to-BIM workflow to get there.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className={styles.subBlock}>
            <p className={styles.subBlockBody}>
              A point cloud gives you something to look at. You still have to know where to look and how to read it. This you can just ask.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Record
