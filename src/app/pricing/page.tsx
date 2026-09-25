import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import EmailLink from '@/components/EmailLink/EmailLink'
import styles from './pricing.module.css'

const TITLE = 'Pricing'
const DESCRIPTION =
  'Landex plans come with monthly credits. See the credit price for a job before it runs, along with the square footage or acreage it covers. Your first month is refundable.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/pricing' },
  openGraph: { title: `${TITLE} | Landex Systems`, description: DESCRIPTION, url: '/pricing' },
}

type Plan = {
  name: string
  price: string
  credits: string
  perCredit: string
  checkout: string
  covers: [string, string][]
  site: string
  month: { label: string; hint: string; value: string }[]
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '$500',
    credits: '1,000 credits · 1 seat',
    perCredit: '$0.50 per credit',
    checkout: 'https://buy.stripe.com/cNi00cbShdlE34f8irbjW02',
    covers: [['LOD 200', '28,000 sq ft'], ['LOD 300', '20,000 sq ft'], ['LOD 300 + MEP', '10,000 sq ft']],
    site: '3 acres',
    month: [
      { label: 'Commercial floors with MEP', hint: '3,000 sq ft, LOD 300 + MEP', value: 'about 3' },
      { label: 'Houses', hint: '2,000 sq ft, LOD 200', value: 'about 14' },
      { label: 'Outdoor sites', hint: 'Site inventory', value: 'about 3 acres' },
    ],
  },
  {
    name: 'Growth',
    price: '$1,500',
    credits: '3,300 credits · 3 seats',
    perCredit: '$0.45 per credit',
    checkout: 'https://buy.stripe.com/fZueV609z95oeMX2Y7bjW03',
    covers: [['LOD 200', '95,000 sq ft'], ['LOD 300', '65,000 sq ft'], ['LOD 300 + MEP', '33,000 sq ft']],
    site: '11 acres',
    month: [
      { label: 'Commercial floors with MEP', hint: '3,000 sq ft, LOD 300 + MEP', value: 'about 11' },
      { label: 'Houses', hint: '2,000 sq ft, LOD 200', value: 'about 47' },
      { label: 'Outdoor sites', hint: 'Site inventory', value: 'about 11 acres' },
    ],
  },
  {
    name: 'Pro',
    price: '$4,000',
    credits: '10,000 credits · 10 seats',
    perCredit: '$0.40 per credit',
    checkout: 'https://buy.stripe.com/dRmdR25tT4P8bAL8irbjW04',
    covers: [['LOD 200', '285,000 sq ft'], ['LOD 300', '200,000 sq ft'], ['LOD 300 + MEP', '100,000 sq ft']],
    site: '33 acres',
    month: [
      { label: 'Commercial floors with MEP', hint: '3,000 sq ft, LOD 300 + MEP', value: 'about 33' },
      { label: 'Houses', hint: '2,000 sq ft, LOD 200', value: 'about 140' },
      { label: 'Outdoor sites', hint: 'Site inventory', value: 'about 33 acres' },
    ],
  },
]

const INCLUDED = [
  'BIM models at LOD 200, LOD 300 and MEP',
  'Site and yard inventory',
  'Floor plan sets from your models',
  "Questions about models we've built for you",
  'Upload E57, LAS, LAZ, RCP or RCS',
  'Processed instantly, usually delivered in under 1 hour',
  'Email support',
  'Onboarding call',
]

const RATES = [
  { name: 'LOD 200', hint: 'Walls, floors, doors, windows at approximate size', credits: '35 / 1,000 sq ft' },
  { name: 'LOD 300', hint: 'Accurate sizes and positions, plus columns, beams, stairs', credits: '50 / 1,000 sq ft' },
  { name: 'LOD 300 + MEP', hint: 'Adds ducts, pipes, cable trays, equipment', credits: '100 / 1,000 sq ft' },
  { name: 'Site and yard inventory', hint: 'Outdoor sites: piles, equipment, vehicles counted and labeled', credits: '300 / acre' },
  { name: 'Floor plan set', hint: 'Drawn from a model you already have', credits: '15 / 1,000 sq ft' },
  { name: 'Questions', hint: "Ask anything about models or inventories we've built for you", credits: '1 per question' },
]

const EXAMPLES: [string, string][] = [
  ['2,000 sq ft house, LOD 200', '70'],
  ['1,650 sq ft condo unit, LOD 300', '83'],
  ['3,800 sq ft apartment floor, LOD 300', '190'],
  ['3,000 sq ft office floor, LOD 300 + MEP', '300'],
  ['60,000 sq ft warehouse, LOD 300', '3,000'],
  ['8-acre storage yard, site inventory', '2,400'],
]

const TERMS = [
  { title: 'First month refundable', body: 'Not happy? We refund your first month, no questions asked.' },
  { title: 'Job minimum', body: 'Every model or inventory uses at least 50 credits.' },
  {
    title: 'Extra credits',
    body: "Buy more anytime as a one-time purchase, at your plan's per-credit rate.",
  },
]

function Check() {
  return (
    <svg className={styles.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.head}>
            <span className={styles.eyebrow}>Pricing</span>
            <h1 className={styles.title}>Plans with monthly credits.</h1>
            <p className={styles.lede}>
              Every plan comes with monthly credits. You see the credit price for a job before it runs, along with the
              square footage or acreage it covers. Your first month is refundable, no questions asked.
            </p>
            <nav className={styles.jump} aria-label="On this page">
              <a href="#plans">Plans</a>
              <a href="#credits">How credits work</a>
              <a href="#examples">Example jobs</a>
            </nav>
          </header>

          <section id="plans" className={styles.plans}>
            {PLANS.map((p) => (
              <div key={p.name} className={styles.plan}>
                <div className={styles.planName}>{p.name}</div>
                <div className={styles.price}>
                  {p.price}
                  <span className={styles.per}>/ month</span>
                </div>
                <div className={styles.credits}>{p.credits}</div>
                <div className={styles.perCredit}>{p.perCredit}</div>

                <div className={styles.box}>
                  <div className={styles.boxLabel}>Covers about</div>
                  {p.covers.map(([k, v]) => (
                    <div key={k} className={styles.row}>
                      <span>{k}</span>
                      <span className={styles.num}>{v}</span>
                    </div>
                  ))}
                  <div className={`${styles.row} ${styles.rowSplit}`}>
                    <span>Site inventory</span>
                    <span className={styles.num}>{p.site}</span>
                  </div>
                </div>

                <div className={styles.box}>
                  <div className={styles.boxLabel}>Typical month</div>
                  {p.month.map((m) => (
                    <div key={m.label} className={styles.row}>
                      <span>
                        {m.label}
                        <span className={styles.rowHint}>{m.hint}</span>
                      </span>
                      <span className={styles.num}>{m.value}</span>
                    </div>
                  ))}
                </div>

                <a className={styles.choose} href={p.checkout} target="_blank" rel="noopener">
                  Choose {p.name}
                </a>
                <p className={styles.refund}>First month refundable, no questions asked</p>
              </div>
            ))}
          </section>

          <section className={styles.enterprise}>
            <div className={styles.planName}>Enterprise</div>
            <div className={styles.entTitle}>Talk to us</div>
            <p className={styles.entBody}>
              For large portfolios and high volume. Custom credits, seats, pricing, integrations and deliverables.
            </p>
            <EmailLink className={styles.entButton} topic="call">
              Talk to us
            </EmailLink>
          </section>

          <section className={styles.card}>
            <h2 className={styles.h2}>Every plan includes everything</h2>
            <p className={styles.sub}>Credits work on anything we do. Plans differ only in credits and seats.</p>
            <ul className={styles.included}>
              {INCLUDED.map((i) => (
                <li key={i}>
                  <Check />
                  {i}
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.pair}>
            <section id="credits" className={styles.card}>
              <h2 className={styles.h2}>How credits work</h2>
              <p className={styles.sub}>
                Credits depend on what you run and how big it is. We bill on real floor area, not the scan&apos;s
                bounding box. The price shows up before the job starts.
              </p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>What you run</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {RATES.map((r) => (
                    <tr key={r.name}>
                      <td>
                        <span className={styles.rateName}>{r.name}</span>
                        <span className={styles.rowHint}>{r.hint}</span>
                      </td>
                      <td className={styles.num}>{r.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="examples" className={styles.card}>
              <h2 className={styles.h2}>Example jobs</h2>
              <p className={styles.sub}>What typical jobs cost in credits.</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Job</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAMPLES.map(([job, c]) => (
                    <tr key={job}>
                      <td>{job}</td>
                      <td className={styles.num}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          <section className={styles.terms}>
            {TERMS.map((t) => (
              <div key={t.title}>
                <div className={styles.termTitle}>{t.title}</div>
                <p className={styles.termBody}>{t.body}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
