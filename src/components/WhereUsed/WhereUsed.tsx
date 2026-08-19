"use client";

import { useRef, useState } from 'react'
import AnimateIn from '@/components/AnimateIn'
import styles from './WhereUsed.module.css'

type UseCase = {
  key: string
  tab: string
  who: string
  question: string
  body: string[]
  asks: string[]
}

const useCases: UseCase[] = [
  {
    key: 'cost-seg',
    tab: 'Cost segregation',
    who: 'For cost segregation engineers',
    question: 'What is actually in this building, and how much of it?',
    body: [
      'A study is a partition that has to reconcile to total project cost. Anything you do not identify and document stays in the 39-year bucket. Under-enumeration throws no error. It just makes the deduction smaller.',
      'Landex turns one walk into a measured census. Component type, count, dimensions, location, and the capture frame that shows it. On buildings too large to cover on foot in a day, you get the parts the walk would have missed.',
      'You attach the dollars, make the classification calls, and sign it.',
    ],
    asks: [
      'How many receptacles, and in which rooms.',
      'Linear feet of conduit by floor.',
      'What the GL line marked only "electrical" actually bought.',
    ],
  },
  {
    key: 'inventory',
    tab: 'Fixed asset inventory',
    who: 'For controllers and fixed asset teams',
    question: 'Which line on the register is this machine?',
    body: [
      'Practitioners put 15 to 30 percent of ERP fixed asset records in the pile that cannot be matched to a physical object. The register has the financial fields and almost none of the physical ones. No durable ID, no photo, no serial, no location.',
      'Where nothing is tagged, nobody can match by tag either. Landex builds the physical side of the file from the floor up. What is there, where it is, what the plate says, with an image of each one.',
    ],
    asks: [
      'What is on the floor that is on no line of the register.',
      'What the register lists that is no longer there.',
      'Make, model and serial where the plate is readable.',
    ],
  },
  {
    key: 'sell-side',
    tab: 'Sell-side diligence',
    who: 'For deal teams taking an asset to market',
    question: "What will the buyer's engineer find that you did not?",
    body: [
      'Findings move price, and they move it late, when you have already committed to a number and the clock is running.',
      'Scan before you go to market. Your access, your timeline, your scope, and a full inventory of what is installed before anyone else has walked the site. Off-hours works fine. An empty floor is the better capture.',
    ],
    asks: [
      'Every piece of installed equipment, with plates read.',
      'What is on site that appears on no schedule.',
      'Clearances, routing and layout as built, not as drawn.',
    ],
  },
  {
    key: 'handoff',
    tab: 'Handoff',
    who: 'For the owner signing acceptance',
    question: 'What are you being handed?',
    body: [
      'Before signature the contractor pays to fix it. After signature you do. The cost is the same. The payer changes.',
      'One capture in the acceptance window, checked against the documents that govern the building. Everything on the equipment schedule rather than a sample of it.',
    ],
    asks: [
      'Which of the 214 units on the schedule never arrived.',
      'Whether there is 36 inches of clear space in front of every panel.',
      'What is standing there that no document accounts for.',
    ],
  },
  {
    key: 'insurance',
    tab: 'Insurance survey',
    who: 'For risk managers and brokers',
    question: "What will the carrier's engineer write up?",
    body: [
      'A risk engineer gives credit for what you can show them. A spare nobody can locate is treated as absent, and that lands in the business interruption exposure rather than the property number.',
      'Find the geometric write-ups before the first survey instead of closing them after, and be able to point at the spares you already own.',
    ],
    asks: [
      'Clearance and obstruction against the written distances.',
      'What is stored where it should not be.',
      'Where the spare units are, with their plates read.',
    ],
  },
  {
    key: 'existing',
    tab: 'Existing conditions',
    who: 'For design and VDC teams',
    question: 'What is here, before you design on top of it?',
    body: [
      'Existing conditions are measured by hand, drawn by hand, and paid for twice. Once to send someone, once to model what they found.',
      'Send the scan the project already produced. It comes back with every instance labeled as what it is, sized and placed, and linkable in the tooling your team already uses. Model the new work, not the old.',
    ],
    asks: [
      'Where the existing pipe, duct and conduit actually run.',
      'Clear height and available space, room by room.',
      'What the last set of as-builts got wrong.',
    ],
  },
]

function WhereUsed() {
  const [active, setActive] = useState('handoff')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let n: number | null = null
    if (e.key === 'ArrowRight') n = (i + 1) % useCases.length
    if (e.key === 'ArrowLeft') n = (i - 1 + useCases.length) % useCases.length
    if (e.key === 'Home') n = 0
    if (e.key === 'End') n = useCases.length - 1
    if (n === null) return
    e.preventDefault()
    setActive(useCases[n].key)
    tabRefs.current[n]?.focus()
  }

  const current = useCases.find((u) => u.key === active) ?? useCases[0]

  return (
    <section id="where-it-gets-used" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Where it gets used</span>
            <h2 className={styles.title}>
              One capture. Pick the question you came here with.
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className={styles.folder}>
            <div className={styles.tabs} role="tablist" aria-label="Use cases">
              {useCases.map((u, i) => {
                const on = u.key === active
                return (
                  <button
                    key={u.key}
                    ref={(el) => { tabRefs.current[i] = el }}
                    className={styles.tab}
                    role="tab"
                    id={`tab-${u.key}`}
                    aria-selected={on}
                    aria-controls={`panel-${u.key}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(u.key)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    {u.tab}
                  </button>
                )
              })}
            </div>

            <div className={styles.folderBody}>
              <section
                key={current.key}
                className={styles.panel}
                role="tabpanel"
                id={`panel-${current.key}`}
                aria-labelledby={`tab-${current.key}`}
                tabIndex={0}
              >
                <p className={styles.who}>{current.who}</p>
                <h3 className={styles.question}>{current.question}</h3>
                <div className={styles.grid}>
                  <div className={styles.body}>
                    {current.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <div className={styles.asks}>
                    <h4 className={styles.asksTitle}>What it answers</h4>
                    <ul className={styles.asksList}>
                      {current.asks.map((a, i) => (
                        <li key={i} className={styles.ask}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}

export default WhereUsed
