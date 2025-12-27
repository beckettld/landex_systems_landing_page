import styles from './DocumentCycler.module.css'

const documents = [
  { src: '/assets/deed.png', alt: 'Deed document' },
  { src: '/assets/plan.png', alt: 'Plan document' },
  { src: '/assets/neighbor.png', alt: 'Neighbor document' },
  { src: '/assets/name_search.png', alt: 'Name search document' },
]

function DocumentCycler() {
  return (
    <div className={styles.cycler}>
      <div className={styles.stack}>
        {documents.map((doc, index) => (
          <img
            key={doc.src}
            src={doc.src}
            alt={doc.alt}
            className={styles.document}
            style={{ animationDelay: `${index * 3}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default DocumentCycler

