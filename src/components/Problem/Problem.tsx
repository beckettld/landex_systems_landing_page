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
            The walkdown already happens. The record does not.
          </h2>
        </AnimateIn>
        <div className={styles.proseList}>
          <AnimateIn delay={0.1}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The record gets rebuilt by hand.</h3>
              <p className={styles.proseBody}>
                Your managing engineers walk the area and check what is installed against what was supposed to be. They come back with notes that then get entered into the BIM, by hand, element by element. The walk already found the truth. A person retypes it.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The evidence is scattered when you need it.</h3>
              <p className={styles.proseBody}>
                When a pay application is challenged, when an owner asks whether the installed equipment matches the approved submittal, when closeout drags — the proof is spread across people and inboxes. Nothing holds it in one place, at the element.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The context never reaches the element.</h3>
              <p className={styles.proseBody}>
                To verify one valve, an engineer holds the submittal, the spec, and the change orders in their head — or flips between Procore tabs and email to reassemble them. The context is real. It just never arrives in one place, at the element, at the moment of verification. So the walkdown checks the work but leaves nothing behind that holds up later.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Problem
