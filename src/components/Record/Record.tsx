"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Record.module.css'

function Record() {
  return (
    <section id="what-you-get" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>What you get</span>
          <h2 className={styles.title}>A 3D model of your building where everything knows what it is.</h2>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className={styles.prose}>
            <p className={styles.body}>
              Geometry tight to the capture, so the model matches the building instead of matching the drawings. A label on every instance, so each pipe, duct, conduit and fitting is a known thing rather than a shape in the right place. And the connections between them, so the model can be traversed and not just looked at.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className={styles.subBlock}>
            <h3 className={styles.subBlockTitle}>It exports to BIM.</h3>
            <p className={styles.subBlockBody}>
              Your design team links the model and works on top of it, so existing conditions never get traced by hand again. That is one of the things the model is good for. It is not what the model is.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Record
