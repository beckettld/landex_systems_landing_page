"use client";

import { useState } from 'react'
import AnimateIn from '@/components/AnimateIn'
import styles from './Features.module.css'

type IconName =
  | 'hash'
  | 'ruler'
  | 'clearance'
  | 'proximity'
  | 'presence'
  | 'nameplate'
  | 'progress'
  | 'chevron'

function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }
  switch (name) {
    case 'hash':
      return (
        <svg {...common}>
          <path d="M5 9h14M4 15h14M10 4l-2 16M16 4l-2 16" />
        </svg>
      )
    case 'ruler':
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="8" rx="1" />
          <path d="M7 8v3M11 8v4M15 8v3" />
        </svg>
      )
    case 'clearance':
      return (
        <svg {...common}>
          <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M5 12h14" />
        </svg>
      )
    case 'proximity':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        </svg>
      )
    case 'presence':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'nameplate':
      return (
        <svg {...common}>
          <path d="M4 5h9l7 7-7 7-9-9z" />
          <circle cx="8.5" cy="8.5" r="1.4" />
        </svg>
      )
    case 'progress':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.5 6H15a3 3 0 013 3v6M15.5 18H9a3 3 0 01-3-3V9" />
        </svg>
      )
    case 'chevron':
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      )
  }
}

type Group = {
  label: string
  icon: IconName
  lead: string
  more: string[]
}

const groups: Group[] = [
  {
    label: 'Counts',
    icon: 'hash',
    lead: 'Count every sprinkler head, smoke detector and VAV box on floor 3',
    more: [
      'List every ceiling access panel with its location',
      'List every fire extinguisher with its location and mounting height',
      'How many receptacles went in along this wall',
      'How many of the 214 sprinkler heads on the schedule reached the ceiling',
    ],
  },
  {
    label: 'Quantities',
    icon: 'ruler',
    lead: 'Total linear feet of 4-inch conduit installed on level 2',
    more: [
      'Square footage of drywall hung versus taped versus painted, by zone',
      'Linear feet of CHW pipe on this floor, broken out by diameter',
      'How much cable tray is installed on this level',
      'Square footage of exposed ceiling still open in this wing',
    ],
  },
  {
    label: 'Clearances',
    icon: 'clearance',
    lead: 'Is there 36 inches of working clearance in front of every electrical panel',
    more: [
      'Is any egress path pinched below 44 inches',
      'What is the finished ceiling height in this room',
      'How far is this duct from the slab above it',
      'What is the clear height under the lowest obstruction in this corridor',
    ],
  },
  {
    label: 'Proximity',
    icon: 'proximity',
    lead: 'Flag anything stored within 18 inches of a sprinkler head',
    more: [
      'Are any smoke detectors mounted too close to a supply diffuser',
      'Is anything parked inside the service envelope of this air handler',
      'Which sprinkler heads sit too close to a beam or a duct',
      'Is anything blocking access to panel LP-2',
    ],
  },
  {
    label: 'Presence',
    icon: 'presence',
    lead: 'Which junction boxes are missing covers',
    more: [
      'Is insulation installed on the CHW piping in corridor B',
      'Which ceiling tiles are missing on this floor',
      'Are hangers installed at spacing on this pipe run',
      'Which wall penetrations have no sleeve',
    ],
  },
  {
    label: 'Nameplates',
    icon: 'nameplate',
    lead: 'What is the model and serial on the equipment in this room',
    more: [
      'What does the nameplate on this pump say',
      'Does the equipment in this room match the submittal',
      'List every unit on this floor with its make, model and serial',
      'Which units on the equipment schedule are not in the field',
    ],
  },
  {
    label: 'Progress',
    icon: 'progress',
    lead: 'The sub claims 80 percent drywall complete on level 5. Is it',
    more: [
      'What changed between the March scan and this one',
      'What got installed since last week',
      'Which rooms have their ceilings closed',
      'How much of the level 2 conduit was already in place in March',
    ],
  },
]

function Features() {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const toggle = (label: string) =>
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }))

  return (
    <section id="what-you-can-ask" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>What a smart model answers</span>
            <h2 className={styles.title}>
              Questions geometry alone cannot answer.
            </h2>
            <p className={styles.subtitle}>
              Once every element knows what it is, these stop being site visits and become queries. You ask in plain language. There is no menu of reports. Some of these are in no document, because nobody ever wrote them down.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className={styles.rows}>
            {groups.map((g) => {
              const isOpen = !!open[g.label]
              return (
                <div
                  key={g.label}
                  className={styles.row}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggle(g.label)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggle(g.label)
                    }
                  }}
                >
                  <div className={styles.rowLabel}>
                    <span className={styles.rowIcon}>
                      <Icon name={g.icon} />
                    </span>
                    {g.label}
                  </div>
                  <p className={styles.lead}>
                    <span className={styles.leadPrompt}>&rsaquo;</span>
                    {g.lead}
                  </p>
                  {isOpen && (
                    <div className={styles.more}>
                      {g.more.map((q) => (
                        <p key={q} className={styles.moreItem}>{q}</p>
                      ))}
                    </div>
                  )}
                  <span className={styles.toggle}>
                    <span>{isOpen ? 'Less' : `${g.more.length} more`}</span>
                    <Icon
                      name="chevron"
                      className={isOpen ? styles.chevOpen : styles.chev}
                    />
                  </span>
                </div>
              )
            })}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Features
