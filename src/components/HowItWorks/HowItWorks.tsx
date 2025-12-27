import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    title: 'Enter an Address',
    description: 'Simply input any property address to begin your boundary research.',
  },
  {
    number: '02',
    title: 'AI Searches Records',
    description: 'Our system instantly searches county records, deeds, plans, and historical documents.',
  },
  {
    number: '03',
    title: 'Get Your Package',
    description: 'Receive a complete research package with all relevant documents in minutes.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>How It Works</span>
          <h2 className={styles.title}>Three simple steps to complete boundary research</h2>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

