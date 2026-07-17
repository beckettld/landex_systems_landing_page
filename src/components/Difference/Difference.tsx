"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Difference.module.css'

function Difference() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>The difference</span>
          <h2 className={styles.title}>
            The tools on site give you a picture. Landex gives you something you can reason over.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className={styles.prose}>
            <p className={styles.body}>
              Reality-capture tools built for the general contractor render a shallow model, a clay shell with light tags on top, this is an HVAC system. That is a picture of the site. It is not a substrate a reasoning model can think across, and the record lives inside a platform the GC pays for. When the GC demobilizes, that access leaves with them.
            </p>
            <p className={styles.body}>
              Landex grounds every element in a rich spatial model, semantically, keyed to the real component and connected to the documents that govern it. That grounding is what makes long reasoning across the whole site possible. It is the same job your owner's rep already does, taking in the site walks, the drawings, the submittals, and the meetings and hunting for what is wrong, except done across everything at once, at a scale no person can hold in their head. Think of how a strong case file lets a lawyer reason across years of documents and pull out exactly what bears on the matter at hand. Landex does that for a construction site, and it is built for the owner's side of the table: an asset you own, not a login you rent for the duration.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Difference
