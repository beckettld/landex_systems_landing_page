"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './People.module.css'

const people = [
  {
    role: 'Reality capture and laser scanning firms',
    line: 'You already produce the point clouds. Hand back more than geometry without changing how you capture.',
  },
  {
    role: 'Surveying and geospatial companies',
    line: 'Add understanding to the deliverables you already ship, in the formats your clients already open.',
  },
  {
    role: 'Scan-to-BIM and VDC teams',
    line: 'Start modeling from a scan that already knows what it contains.',
  },
  {
    role: 'Drone and photogrammetry operators',
    line: 'Turn flights and walkthroughs into data a client can question, not only look at.',
  },
  {
    role: 'AEC firms with in-house capture',
    line: 'Your own scans, understood, inside the tools your team already runs.',
  },
  {
    role: 'Digital twin and facilities platforms',
    line: 'Pull decoded outputs into your product through the API. Built for teams with developers.',
  },
  {
    role: 'Construction technology companies',
    line: 'Ship features on a spatial understanding you did not have to train yourself.',
  },
  {
    role: 'Robotics and automation teams',
    line: 'Give a machine an understanding of the space it has to operate in.',
  },
]

function People() {
  return (
    <section id="people" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Who this is for</span>
            <h2 className={styles.title}>
              For the people already holding the scans.
            </h2>
            <p className={styles.subtitle}>
              Built for teams that already capture, and for teams with developers who can build on what comes back. If you produce scans today, or you can put decoded data to work in your own product, this is for you.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <ul className={styles.grid}>
            {people.map((p, i) => (
              <li key={p.role} className={styles.tile}>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.role}>{p.role}</h3>
                <p className={styles.line}>{p.line}</p>
              </li>
            ))}
          </ul>
        </AnimateIn>
      </div>
    </section>
  )
}

export default People
