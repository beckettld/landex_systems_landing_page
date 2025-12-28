import styles from './Trust.module.css'

const trustPoints = [
  {
    icon: '🎓',
    title: 'Built by MIT Graduates',
    description: 'Founded by three MIT engineers with deep expertise in data systems and legal tech.',
  },
  {
    icon: '🔒',
    title: 'Full Privacy Guaranteed',
    description: 'Your searches are private. We never share or sell your data.',
  },
  {
    icon: '🏛️',
    title: 'Official County Sources',
    description: 'Documents sourced directly from county registries of deeds.',
  },
]

function Trust() {
  return (
    <section id="trust" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {trustPoints.map((point) => (
            <div key={point.title} className={styles.item}>
              <span className={styles.icon}>{point.icon}</span>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.description}>{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trust


