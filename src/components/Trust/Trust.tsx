import styles from './Trust.module.css'

const trustMessages = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
        <path d="M16 4l2 2-4 4"/>
      </svg>
    ),
    title: 'Your Expertise, Amplified',
    description: 'We provide the research foundation—you provide the expertise that makes it meaningful.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    title: 'Professional Review',
    description: 'Every result is reviewed and verified by professionals like you before any decision is made.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Accelerate, Not Replace',
    description: 'We accelerate your process, not replace your judgment. You\'re still in control.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Built for Professionals',
    description: 'Built by people who understand your workflow and respect the expertise required.',
  },
]

function Trust() {
  return (
    <section id="trust" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Our Promise</span>
          <h2 className={styles.title}>Your Expertise, Amplified</h2>
          <p className={styles.subtitle}>
            We know you're the expert. Our job is to give you more time to apply that expertise where it matters most.
          </p>
        </div>

        <div className={styles.grid}>
          {trustMessages.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>
                {item.icon}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trust
