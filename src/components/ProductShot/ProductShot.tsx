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
              <span className={styles.chromeLabel}>Landex — Owner View // As-built record</span>
            </div>
            <img
              src="/assets/product-photo-july.png"
              alt="Landex Owner View — every element on the site grounded in a rich spatial model, keyed to the real component and its install record."
              className={styles.image}
            />
          </div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <p className={styles.caption}>
            Every element on site, grounded in a rich spatial model and keyed to the install record that governs it.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default ProductShot
