import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import EmailLink from '@/components/EmailLink/EmailLink'
import TesseractDemo from '@/components/TesseractDemo/TesseractDemo'
import styles from './tesseract.module.css'

// Tesseract is the scan-to-BIM product. Landex is the company; this page sells
// the product and points back to the company story ("raw reality into data you
// can query") at the bottom.

const TITLE = 'Tesseract: scan to BIM'
const DESCRIPTION =
  'Tesseract by Landex turns a laser scan of a building into an IFC model, as Shell or Shell + MEP, priced before it runs and usually back within the hour.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/tesseract' },
  openGraph: { title: `${TITLE} | Landex Systems`, description: DESCRIPTION, url: '/tesseract' },
}

// The two building levels the platform sells (platform web/src/lib/survey.ts LODS) and their
// per-area rates (api/landex_api/pricing.py RATES lod200 / lod300_mep), plus civil and outdoor
// structures, which have no platform rate yet and are quoted per job.
const LEVELS = [
  {
    name: 'Shell',
    body: 'Walls with their thickness, floors, ceilings, door and window openings, stairs, columns and beams.',
    credits: 'about 35 credits per 1,000 sq ft',
  },
  {
    name: 'Shell + MEP',
    body: 'Everything in Shell, plus ducts, pipes, cable trays, conduit, lights and fixed equipment.',
    credits: 'about 100 credits per 1,000 sq ft',
  },
  {
    name: 'Civil + outdoor',
    body: 'Bridges, piers, decks, parapets and barriers, gantries, lighting and site structures, from terrestrial, mobile or aerial scans.',
    credits: 'quoted per job',
  },
]

const RETURNS: [string, string][] = [
  ['An IFC model', 'Every wall, slab, opening, column and beam placed and classified. Opens in Revit, Archicad, Solibri or any IFC viewer.'],
  ['A Revit model built for your work', 'Native walls with hosted doors and windows, set up for what you use it for: residential as-builts, existing conditions with MEP, and more.'],
  ['An IFC viewer', 'Open the model in the browser over your scan. Switch between the points and the model to check it, and share it with your team.'],
]

const STEPS: [string, string][] = [
  ['Upload the scan', 'E57, LAS or LAZ, straight from the scanner or your registration software.'],
  ['Choose your settings', 'The level of detail, the part of the scan you want modelled, and anything we should know about it.'],
  ['Get a price', 'The credit estimate shows before anything runs. You are charged what it uses, never more.'],
  ['Get the model', 'Usually delivered in under an hour. Download it right from the app.'],
]
export default function Page() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <div className={styles.heroText}>
            <span className={styles.eyebrow}>A Landex product</span>
            <h1 className={styles.name}>
              <span className={styles.wordmark}>Tesseract</span>
            </h1>
            <p className={styles.tagline}>Point cloud in, BIM model out.</p>
            <p className={styles.lede}>
              Tesseract is scan to BIM from Landex. Upload a laser scan of a building or a structure, choose the level of detail, and
              get back an IFC model, usually within the hour.
            </p>
            <div className={styles.actions}>
              <EmailLink className={styles.primary} topic="scan">
                Send us a scan
              </EmailLink>
              <a className={styles.secondary} href="/tesseract/pricing">
                See pricing &rarr;
              </a>
            </div>
            </div>
            <TesseractDemo />
          </header>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.label}>Levels of detail</span>
              <h2 className={styles.h2}>Buildings, inside and out. Structures, too.</h2>
            </div>
            <div className={styles.lods}>
              {LEVELS.map((l) => (
                <div key={l.name} className={styles.lod}>
                  <div className={styles.lodName}>{l.name}</div>
                  <p className={styles.lodBody}>{l.body}</p>
                  <div className={styles.lodCredits}>{l.credits}</div>
                </div>
              ))}
            </div>
            <p className={styles.note}>
              Every job is quoted before it runs. <a href="/tesseract/pricing">Plans and credits</a>
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.label}>What comes back</span>
              <h2 className={styles.h2}>A model you finish, not one you draw.</h2>
            </div>
            <div className={styles.returns}>
              {RETURNS.map(([t, b]) => (
                <div key={t} className={styles.ret}>
                  <div className={styles.retTitle}>{t}</div>
                  <p className={styles.retBody}>{b}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.label}>How it works</span>
              <h2 className={styles.h2}>From scan to model in four steps.</h2>
            </div>
            <ol className={styles.steps}>
              {STEPS.map(([t, b], i) => (
                <li key={t} className={styles.step}>
                  <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.stepTitle}>{t}</div>
                  <p className={styles.stepBody}>{b}</p>
                </li>
              ))}
            </ol>
          </section>

          <a className={styles.live} href="https://bim.landexsystems.com" target="_blank" rel="noopener">
            <span>
              <span className={styles.liveLabel}>See it live</span>
              <span className={styles.liveTitle}>Real scans, returned as Tesseract models</span>
            </span>
            <span className={styles.liveHost}>bim.landexsystems.com &rarr;</span>
          </a>

          <section className={styles.parent}>
            <span className={styles.label}>Part of Landex</span>
            <p className={styles.parentBody}>
              Landex turns raw reality into data you can query. Tesseract is the part that builds the BIM model. The
              same scan can also return counts, plans, measurements and answers to plain questions.
            </p>
            <div className={styles.parentLinks}>
              <a href="/">About Landex &rarr;</a>
              <a href="/deliverables">Everything a scan can return &rarr;</a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
