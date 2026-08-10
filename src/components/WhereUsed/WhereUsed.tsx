"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './WhereUsed.module.css'

const uses = [
  {
    title: 'Handoff.',
    body: 'Before you sign and release the money, see what you are being given.',
  },
  {
    title: 'Commissioning.',
    body: 'Installation verification across everything on site instead of a sample.',
  },
  {
    title: 'Insurance.',
    body: "The geometric items a risk engineer would write up, found before the carrier's first survey.",
  },
  {
    title: 'Tax and valuation.',
    body: 'A measured census of what is in the building, for cost segregation and statements of value.',
  },
  {
    title: 'Design and renovation.',
    body: 'Existing conditions to build on top of, without paying to model them by hand.',
  },
  {
    title: 'Facilities.',
    body: 'A record of the building that answers questions without anyone reading a drawing set.',
  },
]

function WhereUsed() {
  return (
    <section id="where-it-gets-used" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Where it gets used</span>
            <h2 className={styles.title}>
              One capture, many people who need an answer from it.
            </h2>
          </div>
        </AnimateIn>
        <div className={styles.grid}>
          {uses.map((u, i) => (
            <AnimateIn key={u.title} delay={0.1 + i * 0.06}>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>{u.title}</h3>
                <p className={styles.itemBody}>{u.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn delay={0.1}>
          <p className={styles.audienceLine}>
            Built for systems-dense buildings held for the long term. Data centers, pharma and GMP, healthcare campuses, fabs, university campuses.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default WhereUsed
