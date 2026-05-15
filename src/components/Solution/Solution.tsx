"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Solution.module.css'

const steps = [
  {
    number: '01',
    title: 'Drop the documents in',
    description: 'Any format. PDFs, scans, drawings, photos, shapefiles, dead CAD formats, paper that\'s been imaged. No tagging, no prep work, no schema to fill out. If it describes a place, it goes in.',
  },
  {
    number: '02',
    title: 'We read every document, extract what matters, and index it three ways',
    description: 'Our AI parses each document and builds a three-axis index:',
    subItems: [
      { label: 'Where', detail: 'geolocation. Every document anchored to where on the map it applies.' },
      { label: 'When', detail: 'time. Every document tagged with the dates it\'s relevant to: drawn, filed, superseded, as-built.' },
      { label: 'What', detail: 'content. Every document indexed down to the specific page, by what it actually says.' },
    ],
  },
  {
    number: '03',
    title: 'Ask anything in plain English',
    description: 'Get back the exact pages from the exact documents that answer the question, anchored to the right place and the right point in time. Query conversationally or integrate directly: structured exports to ESRI, Trimble, Bentley, Maximo, and your existing GIS and asset management stack via API.',
  },
]

function Solution() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.title}>
            Drop in the documents. Get a queryable index in minutes.
          </h2>
          <p className={styles.subtitle}>
            No archive digitization initiative. No multi-year rollout. Drop in your document corpus and our AI does the rest. As new documents arrive, they are absorbed automatically. The system runs continuously inside your workflow.
          </p>
        </AnimateIn>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <AnimateIn key={step.number} delay={i * 0.1}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                  {step.subItems && (
                    <div className={styles.subItems}>
                      {step.subItems.map((item) => (
                        <div key={item.label} className={styles.subItem}>
                          <span className={styles.subItemLabel}>{item.label}</span>
                          <span className={styles.subItemDetail}>{' '}{item.detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solution
