"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './ProductShot.module.css'

function ProductShot() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.frame}>
            <div className={styles.chrome}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.chromeLabel}>Landex</span>
            </div>
            <img
              src="/assets/product-photo-july.png"
              alt="Left, the source capture. Right, the modeled and labeled building that comes back."
              className={styles.image}
            />
          </div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <p className={styles.caption}>
            Left, the capture. Right, what comes back.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default ProductShot
