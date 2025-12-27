import styles from './Features.module.css'

const features = [
  {
    title: 'Deed Chains',
    description: 'Complete ownership history traced back 80+ years with every transfer documented.',
  },
  {
    title: 'Abutters & Neighbors',
    description: 'Automatically identify and retrieve deeds for all adjacent parcels.',
  },
  {
    title: 'Easements & Encumbrances',
    description: 'Surface rights-of-way, utility easements, and restrictions automatically.',
  },
  {
    title: 'Plans & Surveys',
    description: 'Historical subdivision plans, survey maps, and recorded plats.',
  },
  {
    title: 'Metes & Bounds',
    description: 'Legal property descriptions matched and extracted from deed documents.',
  },
  {
    title: 'Name Searches',
    description: 'Grantor-grantee index searches to verify chain of title.',
  },
]

function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Features</span>
          <h2 className={styles.title}>Everything you need for comprehensive boundary research</h2>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

