import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  {
    question: 'What states and counties do you cover?',
    answer: 'We currently cover Massachusetts with plans to expand to additional New England states. Contact us to learn about coverage in your area.',
  },
  {
    question: 'How accurate is the research?',
    answer: 'Our system achieves 99.7% deed retrieval accuracy and matches 95% of deeds with their corresponding plans or metes and bounds descriptions.',
  },
  {
    question: 'What format are the documents delivered in?',
    answer: 'Documents are delivered as a comprehensive research package including PDFs of all deeds, plans, and a summary report.',
  },
  {
    question: 'How is my data protected?',
    answer: 'We guarantee full privacy. Your searches are never shared or sold, and all data is encrypted in transit and at rest.',
  },
  {
    question: 'How long does a search take?',
    answer: 'Most searches complete in under 4 minutes, delivering 80+ years of ownership history and all related documents.',
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>FAQ</span>
          <h2 className={styles.title}>Frequently asked questions</h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.item} ${openIndex === index ? styles.open : ''}`}
            >
              <button 
                className={styles.question}
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ


