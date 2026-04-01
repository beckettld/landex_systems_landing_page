"use client";

import styles from './Problem.module.css'

function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>The problem</span>
        <h2 className={styles.title}>
          The answers exist. They're just buried.
        </h2>
        <div className={styles.points}>
          <div className={styles.point}>
            <div className={styles.pointMarker} />
            <div className={styles.pointContent}>
              <h3 className={styles.pointTitle}>Back in the office</h3>
              <p className={styles.pointBody}>
                Your team spends hours digging through filing cabinets, shared drives, and PDFs for records that already exist somewhere in the organization. Every search is a guessing game across decades of documents.
              </p>
            </div>
          </div>
          <div className={styles.point}>
            <div className={styles.pointMarker} />
            <div className={styles.pointContent}>
              <h3 className={styles.pointTitle}>Out in the field</h3>
              <p className={styles.pointBody}>
                You're on-site and need to know what's underground before you dig. But the relevant records are in a cabinet 30 miles away — or in a PDF no one can find. You can't search decades of archives from a job site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem
