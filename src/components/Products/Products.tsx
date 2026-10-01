import AnimateIn from '@/components/AnimateIn'
import styles from './Products.module.css'

// Landex is the company (raw reality into data you can query); products are the
// named things a customer buys. Tesseract is the first. Add a card when the next
// one is real, not before.

const products = [
  {
    href: '/tesseract',
    name: 'Tesseract',
    kind: 'Scan to BIM',
    body: 'A laser scan of a building, returned as an IFC model you can check against the scan. Shell, Shell + MEP, or Civil + outdoor.',
    meta: 'E57, LAS, LAZ in · IFC out',
  },
]

function Products() {
  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Products</span>
            <h2 className={styles.title}>Built on Landex.</h2>
          </div>
        </AnimateIn>
        <div className={styles.grid}>
          {products.map((p) => (
            <a key={p.href} href={p.href} className={styles.card}>
              <div className={styles.top}>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.kind}>{p.kind}</span>
              </div>
              <p className={styles.body}>{p.body}</p>
              <div className={styles.bottom}>
                <span className={styles.meta}>{p.meta}</span>
                <span className={styles.go}>See {p.name} &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
