import styles from './Partners.module.css'

const partners = [
  {
    name: 'Wayfinder',
    logo: '/assets/partners/cropped-Wayfinder-Logo-2.png',
  },
  {
    name: 'HTA',
    logo: '/assets/partners/HTA-FULL-LOGO-360w.png',
  },
  {
    name: 'Keeley',
    logo: '/assets/partners/keeley alpha.png',
  },
]

function Partners() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.label}>Trusted Partners</span>
        <div className={styles.logos}>
          {partners.map((partner) => (
            <div key={partner.name} className={styles.logoWrapper}>
              <img
                src={partner.logo}
                alt={partner.name}
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
