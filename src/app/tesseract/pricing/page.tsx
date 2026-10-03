import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import EmailLink from '@/components/EmailLink/EmailLink'
import styles from './pricing.module.css'

const TITLE = 'Tesseract pricing'
const DESCRIPTION =
  'Tesseract plans come with monthly credits. See the credit estimate for a job before it runs; you are charged what it uses, never more. Your first month is refundable.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/tesseract/pricing' },
  openGraph: { title: `${TITLE} | Landex Systems`, description: DESCRIPTION, url: '/tesseract/pricing' },
}

type Plan = {
  name: string
  price: string
  credits: string
  perCredit: string
  checkout: string
  covers: [string, string][]
  month: { label: string; hint: string; value: string }[]
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '$500',
    credits: '1,000 credits · 1 seat',
    perCredit: '$0.50 per credit',
    checkout: 'https://buy.stripe.com/cNi00cbShdlE34f8irbjW02',
    covers: [['Shell', '40,000 sq ft'], ['Shell + MEP', '18,000 sq ft']],
    month: [
      { label: 'Houses', hint: '2,400 sq ft, Shell', value: 'about 10' },
      { label: 'Office floors', hint: '10,000 sq ft, Shell + MEP', value: 'about 2' },
    ],
  },
  {
    name: 'Growth',
    price: '$1,500',
    credits: '3,300 credits · 3 seats',
    perCredit: '$0.45 per credit',
    checkout: 'https://buy.stripe.com/fZueV609z95oeMX2Y7bjW03',
    covers: [['Shell', '130,000 sq ft'], ['Shell + MEP', '60,000 sq ft']],
    month: [
      { label: 'Houses', hint: '2,400 sq ft, Shell', value: 'about 33' },
      { label: 'Office floors', hint: '10,000 sq ft, Shell + MEP', value: 'about 6' },
    ],
  },
]

const INCLUDED = [
  'BIM models at Shell, Shell + MEP and Civil + outdoor',
  'An IFC model with every run, native walls in Revit',
  'The model over your scan, in the browser',
  'A price before every job',
  'Upload E57, LAS or LAZ',
  'Usually delivered within an hour',
  'Email support',
  'Onboarding call',
]

const RATES = [
  { name: 'Shell', hint: 'Walls, floors, ceilings, openings, stairs, columns, beams', credits: 'about 25 per 1,000 sq ft' },
  { name: 'Shell + MEP', hint: 'Plus ducts, pipes, trays, conduit, lights, equipment', credits: 'about 55 per 1,000 sq ft' },
  { name: 'Civil + outdoor', hint: 'Bridges, piers, decks, barriers, gantries, site structures', credits: 'quoted per job' },
]

const EXAMPLES: [string, string][] = [
  ['Condo unit, 1,200 sq ft, Shell', 'about 65'],
  ['Two-storey house, 2,400 sq ft, Shell', 'about 100'],
  ['Office floor, 10,000 sq ft, Shell', 'about 250'],
  ['Same floor, Shell + MEP', 'about 550'],
  ['Five-storey building, 50,000 sq ft, Shell', 'about 1,250'],
]

// The five models on bim.landexsystems.com, at the credits their model work used.
const SHOWCASE: { name: string; hint: string; href: string; credits: string }[] = [
  { name: 'Brick cottage', hint: 'Shell', href: 'https://bim.landexsystems.com', credits: '70' },
  { name: 'Lattice tower', hint: 'Civil + outdoor', href: 'https://bim.landexsystems.com/tower', credits: '77' },
  { name: 'Motorway bridge', hint: 'Civil + outdoor', href: 'https://bim.landexsystems.com/bridge', credits: '107' },
  { name: 'Timber-frame hall', hint: 'Shell, frame only', href: 'https://bim.landexsystems.com/timber-frame', credits: '164' },
  { name: 'Plant room', hint: 'Shell + MEP, pipework and equipment', href: 'https://bim.landexsystems.com/plant-room', credits: '282' },
]

const TERMS = [
  { title: 'First month refundable', body: 'Not happy? We refund your first month, no questions asked.' },
  { title: 'Job minimum', body: 'Every model uses at least 10 credits.' },
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
            <span className={styles.eyebrow}>
              <a href="/tesseract" className={styles.eyebrowLink}>Tesseract</a> &middot; Pricing
            </span>
            <h1 className={styles.title}>Tesseract plans, with monthly credits.</h1>
            <p className={styles.lede}>
              Every plan comes with monthly credits. You see the credit estimate for a job before it runs, and you are
              charged what it actually uses, never more. Your first month is refundable, no questions asked.
            </p>
            <nav className={styles.jump} aria-label="On this page">
              <a href="#plans">Plans</a>
              <a href="#credits">How credits work</a>
              <a href="#examples">Example jobs</a>
              <a href="#showcase">Our examples</a>
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

            <div className={`${styles.plan} ${styles.enterprise}`}>
              <div className={styles.planName}>Enterprise</div>
              <div className={styles.price}>Custom</div>
              <div className={styles.credits}>Custom credits and seats</div>
              <div className={styles.perCredit}>Volume pricing</div>

              <div className={styles.box}>
                <div className={styles.boxLabel}>Built for</div>
                <div className={styles.row}><span>Large portfolios</span></div>
                <div className={styles.row}><span>High monthly volume</span></div>
                <div className={styles.row}><span>Custom integrations and deliverables</span></div>
              </div>

              <p className={styles.entBody}>
                Tell us what you scan and how often. We put together credits, seats and pricing to match.
              </p>

              <EmailLink className={styles.choose} topic="call">
                Talk to us
              </EmailLink>
              <p className={styles.refund}>Custom terms, priced for your volume</p>
            </div>
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
                Credits pay for the modelling work a job takes: more area and more detail mean more work. The estimate
                shows before the job starts, it is held while the job runs, and you are charged what the job actually
                used, never more than the estimate. The estimate is set on the safe side, so most jobs use less than it shows.
                The rates below are what jobs typically use.
              </p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>What you run</th>
                    <th>Typical credits</th>
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
              <p className={styles.sub}>What typical jobs have cost in credits. Small jobs run above the per-area rate, because stairs, roofs and openings are a bigger share of a small floor.</p>
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

          <section id="showcase" className={styles.card}>
            <h2 className={styles.h2}>Our examples, in credits</h2>
            <p className={styles.sub}>The five models on bim.landexsystems.com, and the credits each one used.</p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {SHOWCASE.map((x) => (
                  <tr key={x.name}>
                    <td>
                      <a className={styles.rateName} href={x.href} target="_blank" rel="noopener">{x.name}</a>
                      <span className={styles.rowHint}>{x.hint}</span>
                    </td>
                    <td className={styles.num}>{x.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

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
