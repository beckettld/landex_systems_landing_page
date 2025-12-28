import styles from './Audience.module.css'

const audiences = [
  {
    title: 'Title Companies',
    description: 'Accelerate title searches and reduce turnaround time on commitments.',
  },
  {
    title: 'Real Estate Attorneys',
    description: 'Get comprehensive boundary research for closings and disputes.',
  },
  {
    title: 'Land Surveyors',
    description: 'Access historical deeds and plans before heading to the field.',
  },
  {
    title: 'Developers',
    description: 'Understand parcel boundaries and easements during due diligence.',
  },
]

function Audience() {
  return (
    <section id="audience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Who It's For</span>
          <h2 className={styles.title}>Built for professionals who need accurate boundary research</h2>
        </div>

        <div className={styles.grid}>
          {audiences.map((audience) => (
            <div key={audience.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{audience.title}</h3>
              <p className={styles.cardDescription}>{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Audience


