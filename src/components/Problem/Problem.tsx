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
            No one can hold the whole site in their head.
          </h2>
        </AnimateIn>
        <div className={styles.proseList}>
          <AnimateIn delay={0.1}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The context is more than any rep can take in.</h3>
              <p className={styles.proseBody}>
                A commercial project generates more drawings, submittals, RFIs, meetings, and site conditions than one person can hold at once. The owner's rep does the best they can on the walks they have time for. The problems that matter live in the gaps between all of it, exactly where a human runs out of attention.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>The record is fragmented and unlinked.</h3>
              <p className={styles.proseBody}>
                Drawings sit in one system, submittals in another, meeting notes in an inbox, the field in someone's phone. Nothing connects a thing said in a meeting to the wall it was about. So the synthesis that would surface a problem never happens, because no one can see across all of it at once.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className={styles.proseItem}>
              <h3 className={styles.proseTitle}>Caught late, every problem is expensive.</h3>
              <p className={styles.proseBody}>
                An over-install, a substitution, a coordination clash, a slipping scope. Caught while the trade is on site, it is a same-week fix. Caught at closeout or after a failure, it is a dispute, a delay, or an opening you cannot get back into.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default Problem
