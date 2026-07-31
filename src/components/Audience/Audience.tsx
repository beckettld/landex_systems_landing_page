"use client";

import AnimateIn from '@/components/AnimateIn'
import styles from './Audience.module.css'

const notList = [
  { label: 'Not a scanning service.', body: 'Capture is our cost, not our product.' },
  { label: 'Not a digital twin.', body: 'You have been sold one of those and nobody opened it.' },
  { label: 'Not a replacement for your BMS.', body: 'It knows a value changed, not what is physically downstream of it.' },
]

function Audience() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <AnimateIn>
            <span className={styles.eyebrow}>Who this is for</span>
            <h2 className={styles.title}>
              Owners who build, hold, and operate systems-dense facilities.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className={styles.tags}>
              <span>Data centers</span>
              <span>Pharma &amp; GMP</span>
              <span>Healthcare</span>
              <span>Fabs</span>
            </div>
            <p className={styles.disqualifier}>
              If you will not own the building in year ten, this is not for you.
            </p>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.15}>
          <div className={styles.notGrid}>
            {notList.map((n) => (
              <div key={n.label} className={styles.notItem}>
                <span className={styles.notLabel}>{n.label}</span>
                <span className={styles.notBody}>{n.body}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Audience
