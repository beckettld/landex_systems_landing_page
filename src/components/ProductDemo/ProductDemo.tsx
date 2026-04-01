"use client";

import { useRef, useState, useCallback, useEffect } from 'react'
import styles from './ProductDemo.module.css'

const features = [
  { type: 'existing_water', label: 'Existing Water', spec: 'Water Main', status: 'existing' },
  { type: 'existing_sewer', label: 'Existing Sewer', spec: 'Sanitary Sewer', status: 'existing' },
  { type: 'proposed_water', label: 'Proposed Water', spec: 'Water Main Extension', status: 'proposed' },
  { type: 'proposed_sewer', label: 'Proposed Sewer', spec: 'Sanitary Sewer', status: 'proposed' },
  { type: 'proposed_force_main', label: 'Proposed Force Main', spec: 'Force Main', status: 'proposed' },
  { type: 'proposed_storm_drain', label: 'Proposed Storm Drain', spec: 'Storm Drain', status: 'proposed' },
  { type: 'proposed_swm', label: 'SWM Facilities', spec: 'Stormwater Management', status: 'proposed' },
  { type: 'overhead_wires', label: 'Existing Overhead Wires', spec: 'Overhead Electric' , status: 'existing' },
]

const notes = [
  'Proposed PUE (Public Utility Easement) runs along Belward Campus Drive',
  'Proposed WSSC easement required for water/sewer extensions',
  'Muddy Branch Park North and South border site to the west',
  'Linear Park Entry located between Buildings A2 and A4',
]

const queries = [
  {
    tag: 'Water utility',
    query: 'Are there any asbestos cement pipes in the Highland Avenue corridor?',
    matchCount: 4,
    answer: '3 records from 1964–1978 reference AC pipe along Highland Ave between STA 2+00 and STA 14+50. One 1991 remediation report confirms partial replacement with DI — 220 LF of original AC remains in service south of Elm Street.',
    sources: ['Highland Ave Water Main Replacement — Sheet 4 of 9 (1972)', 'AC Pipe Remediation Summary, WO #R-1138 (1991)', 'Distribution System As-Built, Highland/Elm Intersection (1964)'],
  },
  {
    tag: 'Water utility',
    query: 'When was the 12-inch main on Elm Street installed and what material is it?',
    matchCount: 2,
    answer: 'Installed 1958, originally 12" cast iron. A 1994 rehabilitation project slip-lined the segment from STA 0+00 to STA 22+80 with HDPE. Original CI remains as carrier pipe.',
    sources: ['Elm Street Utility Plan — Sheet 2 of 5 (1958)', 'Elm St Slip-Lining Rehabilitation Report, Project #WD-94-017 (1994)'],
  },
  {
    tag: 'Water utility',
    query: 'Has there been any previous excavation work near the Oak and Main junction?',
    matchCount: 6,
    answer: '6 records within 150 ft. Most recent: 2019 emergency water main repair (8" break). 2014 gas service lateral installation. 2007 sanitary sewer manhole rehabilitation. Traffic signal conduit installed 2001.',
    sources: ['Emergency Repair Log, WO #EM-2019-0442 (2019)', 'Gas Service Lateral As-Built, 140 Oak St (2014)', 'Sanitary Sewer Rehab — MH-334 to MH-338 (2007)'],
  },
  {
    tag: 'Water utility',
    query: 'What was the pressure zone boundary in the Riverside district in 1985?',
    matchCount: 3,
    answer: 'Zone 2/Zone 3 boundary ran along Riverside Blvd from the 440 Tank to PRV Station #6 at River Rd. Operating pressure 62–78 PSI. Boundary shifted 800 ft north in 1998 expansion.',
    sources: ['Riverside Pressure Zone Map, Rev. 3 (1985)', 'Hydraulic Model Calibration Report (1985)', 'Zone 3 Expansion — PRV Station #6 Relocation (1998)'],
  },
  {
    tag: 'Manufacturing',
    query: 'Are there any underground storage tanks on the north side of the property?',
    matchCount: 2,
    answer: 'One 10,000-gal diesel UST documented in a 1997 tank registration (Permit #UST-4481), north parking area. A 2006 closure report confirms removal with clean confirmation sampling. One active 5,000-gal fire suppression UST remains — last inspection 2023.',
    sources: ['UST Registration Permit #UST-4481 (1997)', 'Tank Closure Report & Confirmation Sampling (2006)'],
  },
  {
    tag: 'Manufacturing',
    query: "What's the rated capacity of the cooling system in Building 3?",
    matchCount: 1,
    answer: 'Trane CenTraVac chiller, 500-ton capacity, installed 2011. Cooling tower rated 600 GPM. Glycol loop serves Building 3 process areas and server room. Maintenance log shows compressor overhaul in 2020.',
    sources: ['Building 3 Mechanical Plan — Sheet M-4 (2011)', 'HVAC Preventive Maintenance Log, Asset #CH-301 (2020)'],
  },
  {
    tag: 'Manufacturing',
    query: 'When was the electrical panel in the east wing last upgraded?',
    matchCount: 3,
    answer: 'Main distribution panel (MDP-E2) upgraded 2017 from 1,200A to 2,000A, 480V/3-phase. Arc flash study completed same year — incident energy 8.4 cal/cm² at MDP-E2. Previous upgrade was 1993.',
    sources: ['East Wing Electrical Upgrade — Single Line Diagram (2017)', 'Arc Flash Hazard Analysis Report (2017)', 'Original Electrical As-Built, East Wing (1993)'],
  },
  {
    tag: 'Manufacturing',
    query: 'What drawings exist for the original 1967 construction of the warehouse?',
    matchCount: 8,
    answer: '8 sheets indexed from original 1967 construction set: site plan, foundation plan, structural framing (2 sheets), roof plan, mechanical, electrical, and plumbing. Architect: Harmon & Associates. Structural: pre-engineered steel rigid frame, 40 ft clear span.',
    sources: ['Warehouse Original Construction Set — Sheets A-1 through A-3 (1967)', 'Structural Framing Plan S-1, S-2 — Harmon & Associates (1967)', 'MEP Plans M-1, E-1, P-1 (1967)'],
  },
  {
    tag: 'Civil engineering',
    query: 'Has our firm done any previous work within a mile of this site?',
    matchCount: 9,
    answer: '9 projects within 1 mi radius. Most relevant: Belward Campus utility exhibit (2022), Muddy Branch stream restoration (2019), Belward Farm road widening (2016). 6 additional residential subdivision plans from 2008–2021.',
    sources: ['Belward Campus Utility Exhibit, Site Plan #820220250 (2022)', 'Muddy Branch Stream Restoration — 60% Design (2019)', 'Belward Farm Rd Widening — Final Plat (2016)'],
  },
  {
    tag: 'Civil engineering',
    query: 'Were there any soil contamination findings in our past surveys near Route 9?',
    matchCount: 3,
    answer: 'Phase II ESA at Parcel 12B (2015) detected TPH at 340 mg/kg in boring SB-4, 4 ft depth — above residential screening but below commercial. No groundwater impact. Two adjacent parcels showed no exceedances.',
    sources: ['Phase II ESA — Parcel 12B, Route 9 Corridor (2015)', 'Phase I ESA — Parcels 12A & 12C (2014)', 'Remedial Action Plan, Parcel 12B (2016)'],
  },
  {
    tag: 'Civil engineering',
    query: 'What foundation type did we specify for the bridge rehabilitation on this corridor in 2003?',
    matchCount: 1,
    answer: 'Bridge #1407 rehab specified driven steel H-piles (HP 14x73), 60 ft embedment, 120-ton design capacity. Pile driving records show refusal at 52–58 ft. Existing abutments retained with concrete jacket reinforcement.',
    sources: ['Bridge #1407 Rehabilitation — Foundation Plan, Sheet S-3 (2003)', 'Pile Driving Records & Load Test Report (2003)'],
  },
  {
    tag: 'Civil engineering',
    query: 'Do we have any prior geotechnical reports for sites within this zip code?',
    matchCount: 5,
    answer: '5 geotech reports in 20878. Soil conditions generally consistent: residual silty clay over saprolite, weathered rock at 12–20 ft. One site (Belward Campus) encountered unexpected fill at 6 ft. Groundwater typically 15–25 ft BGL.',
    sources: ['Geotech Investigation — Belward Campus (2003)', 'Subsurface Exploration Report — Great Seneca Hwy (2010)', 'Foundation Investigation — Washingtonian Center (2018)'],
  },
  {
    tag: 'Oil & gas',
    query: "What's the wall thickness and coating type for the segment between valve 14 and valve 22?",
    matchCount: 1,
    answer: 'V-14 to V-22: 16" DI, Class 52, nominal wall thickness 0.43". Polyethylene encasement specified per AWWA C105. Interior cement mortar lining per AWWA C104. See Sheet 7 of 12, detail callout at STA 8+35.',
    sources: ['Pipeline As-Built — Sheet 7 of 12 (2008)', 'Material Specification Table, Project #PL-08-221 (2008)'],
  },
  {
    tag: 'Oil & gas',
    query: 'Has there been any reported corrosion on the eastern segment installed before 1980?',
    matchCount: 4,
    answer: 'ILI run (2018) flagged 3 anomalies on the 1974 eastern segment: max 28% wall loss at MP 14.2, two minor pits at MP 15.8 and MP 16.1. Dig verification confirmed external corrosion — CP system retrofit completed 2019.',
    sources: ['In-Line Inspection Report — Eastern Segment (2018)', 'Dig Verification & Repair Summary (2019)', 'Cathodic Protection Retrofit Design (2019)', 'Original Pipeline Construction Record (1974)'],
  },
  {
    tag: 'Oil & gas',
    query: 'What pressure rating was specified for the lateral lines in the Permian Basin expansion?',
    matchCount: 2,
    answer: 'Lateral lines spec\'d for 1,440 PSIG MAOP. 4" API 5L Grade X52 ERW, 0.237" WT. Hydro tested to 2,160 PSIG (1.5x MAOP). DOT Class 1, Division 2 location.',
    sources: ['Permian Basin Expansion — Lateral Line Specifications (2021)', 'Hydrostatic Test Records, Laterals L-1 through L-14 (2021)'],
  },
  {
    tag: 'Municipal',
    query: 'What permits were issued for excavation on 5th Street between 1990 and 2010?',
    matchCount: 11,
    answer: '11 excavation permits on record. Major work: 1994 water main replacement (full block), 2001 fiber optic conduit installation, 2006 gas main upgrade. 8 smaller service lateral and repair permits.',
    sources: ['Excavation Permit #EX-94-0187 — Water Main Replacement (1994)', 'ROW Permit #ROW-01-0822 — Fiber Optic Conduit (2001)', 'Excavation Permit #EX-06-0341 — Gas Main Upgrade (2006)'],
  },
  {
    tag: 'Municipal',
    query: 'Are there any recorded easements or right-of-way agreements on this parcel?',
    matchCount: 3,
    answer: '15 ft utility easement along south boundary (Liber 4821, Folio 337, recorded 1978). 10 ft WSSC easement along east boundary for 16" transmission main. Temporary construction easement granted 2019, expired 2021.',
    sources: ['Plat of Subdivision — Lot 14, Block B (1978)', 'WSSC Easement Agreement #EA-2004-1192 (2004)', 'Temporary Construction Easement, Project #TC-2019-088 (2019)'],
  },
  {
    tag: 'Municipal',
    query: 'What does the 1952 infrastructure survey say about the storm drain on Central Ave?',
    matchCount: 1,
    answer: '36" RCP storm drain running east on Central Ave from 3rd St to outfall at Mill Creek. 6 inlets documented. Survey notes "evidence of joint separation at STA 8+20" and "ponding observed at inlet #4 during 2-year storm." Downstream headwall in fair condition.',
    sources: ['Municipal Infrastructure Survey — Central Avenue Drainage, Sheet D-3 (1952)'],
  },
  {
    tag: 'Rail & transit',
    query: "What's the original load rating for the bridge at mile marker 42?",
    matchCount: 2,
    answer: 'Bridge MM-42: Cooper E-60 loading, built 1948. Open deck, steel plate girder, 3-span (40\'-60\'-40\'). 2008 inspection downgraded to E-50 due to section loss in bottom flange at Span 2. Speed restriction applied.',
    sources: ['Bridge Inventory Record — MM-42 (1948)', 'Bridge Inspection Report #BI-2008-042, FRA Compliance (2008)'],
  },
  {
    tag: 'Rail & transit',
    query: 'Are there any known signal equipment installations in the tunnel between stations 7 and 9?',
    matchCount: 3,
    answer: 'GRS Type-K interlocking machine at Station 7 portal (1962, upgraded to Microlok II in 2015). 4 wayside signal heads in tunnel. Track circuit boundaries at chainage 284+00, 291+00, and 298+50. Fire suppression conduit added 2010 — clearance reduced to 18" at chainage 290+20.',
    sources: ['Signal Layout Plan — Stations 7–9 Tunnel Section (1962)', 'Microlok II Interlocking Upgrade — Signal Design Package (2015)', 'Tunnel Fire Suppression Retrofit — As-Built (2010)'],
  },
]

function ProductDemo() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    // Show fade only if there are cards hidden beyond the visible area
    setCanScrollLeft(el.scrollLeft > 5)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>What you get</span>
          <h2 className={styles.title}>
            Every document becomes structured, searchable data.
          </h2>
          <p className={styles.subtitle}>
            We extract what matters — assets, locations, notes, context — and make it queryable.
          </p>
        </div>

        <div className={styles.demo}>
          {/* Input side — stylized old drawing */}
          <div className={styles.inputSide}>
            <div className={styles.inputLabel}>
              <span className={styles.inputLabelDot} />
              Source document
            </div>
            <div className={styles.drawing}>
              <img
                src="/assets/utility-plan.png"
                alt="Belward Campus Parcel A — Color Coded Utility Exhibit by Soltesz, Inc."
                className={styles.drawingImage}
              />
            </div>
          </div>

          {/* Flow arrow */}
          <div className={styles.flowArrow}>
            <svg viewBox="0 0 24 48" fill="none" className={styles.flowArrowIcon}>
              <path d="M12 0 L12 40 M6 34 L12 42 L18 34" stroke="var(--green)" strokeWidth="1.5" />
            </svg>
            <svg viewBox="0 0 48 24" fill="none" className={styles.flowArrowIconH}>
              <path d="M0 12 L40 12 M34 6 L42 12 L34 18" stroke="var(--green)" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Output side — structured data */}
          <div className={styles.outputSide}>
            <div className={styles.outputLabel}>
              <span className={styles.outputLabelDot} />
              Indexed output
            </div>
            <div className={styles.outputCard}>
              {/* Meta row */}
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>document</span>
                  <span className={styles.metaVal}>Color Coded Utility Exhibit — Belward Campus, Parcel A</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>type</span>
                  <span className={styles.metaVal}>utility_plan</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>prepared_by</span>
                  <span className={styles.metaVal}>Soltesz, Inc. — Rockville, MD</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>site_plan</span>
                  <span className={styles.metaVal}>#820220250</span>
                </div>
              </div>

              {/* Confidence + Geo */}
              <div className={styles.geoRow}>
                <div className={styles.geoItem}>
                  <span className={styles.geoKey}>confidence</span>
                  <div className={styles.confidenceWrap}>
                    <div className={styles.confidenceBar}>
                      <div className={styles.confidenceFill} style={{ width: '94%' }} />
                    </div>
                    <span className={styles.confidenceVal}>0.94</span>
                  </div>
                </div>
                <div className={styles.geoItem}>
                  <span className={styles.geoKey}>location</span>
                  <span className={styles.geoVal}>
                    <span className={styles.coordLabel}>lat</span> 39.1083
                    <span className={styles.coordSep}>,</span>
                    <span className={styles.coordLabel}>lng</span> -77.2028
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className={styles.featuresBlock}>
                <div className={styles.blockLabel}>extracted_features</div>
                <div className={styles.featuresList}>
                  {features.map((f, i) => (
                    <div key={i} className={styles.featureRow}>
                      <span className={styles.featureType}>{f.type}</span>
                      <div className={styles.featureDetails}>
                        <span className={styles.featureSpec}>{f.spec}</span>
                        {f.status && <span className={styles.featureStatus}>{f.status}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className={styles.notesBlock}>
                <div className={styles.blockLabel}>extracted_notes</div>
                <div className={styles.notesList}>
                  {notes.map((note, i) => (
                    <div key={i} className={styles.noteRow}>
                      <span className={styles.noteBullet}>&ldquo;</span>
                      <span className={styles.noteText}>{note}</span>
                      <span className={styles.noteBullet}>&rdquo;</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Natural language search demo */}
        <div className={styles.searchDemo}>
          <div className={styles.searchHeaderRow}>
            <div className={styles.searchHeader}>
              <span className={styles.eyebrow}>Then search it</span>
              <h3 className={styles.searchTitle}>
                Ask questions in plain English. Get answers from your archive.
              </h3>
            </div>
            <div className={styles.carouselNav}>
              <button
                className={styles.carouselBtn}
                aria-label="Scroll left"
                onClick={() => scroll(-1)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13 4 L7 10 L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className={styles.carouselBtn}
                aria-label="Scroll right"
                onClick={() => scroll(1)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4 L13 10 L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className={`${styles.carouselWrap} ${canScrollLeft ? styles.fadeLeft : ''} ${canScrollRight ? styles.fadeRight : ''}`}>
          <div className={styles.carouselTrack} ref={trackRef}>
            {queries.map((q, i) => (
              <div key={i} className={styles.queryCard}>
                <div className={styles.queryTag}>{q.tag}</div>
                <div className={styles.queryInput}>
                  <span className={styles.queryPrompt}>&gt;</span>
                  <span className={styles.queryText}>{q.query}</span>
                </div>
                <div className={styles.queryResult}>
                  <p className={styles.queryAnswer}>{q.answer}</p>
                  <div className={styles.querySources}>
                    <span className={styles.querySourcesLabel}>Referenced documents</span>
                    {q.sources.slice(0, 2).map((src, j) => (
                      <div key={j} className={styles.querySourceItem}>
                        <span className={styles.querySourceIcon}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1.5" y="1" width="9" height="10" rx="1" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="4" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="0.6" />
                            <line x1="4" y1="6" x2="8" y2="6" stroke="currentColor" strokeWidth="0.6" />
                            <line x1="4" y1="8" x2="6.5" y2="8" stroke="currentColor" strokeWidth="0.6" />
                          </svg>
                        </span>
                        <span className={styles.querySourceText}>{src}</span>
                      </div>
                    ))}
                    {q.sources.length > 2 && (
                      <span className={styles.querySourceMore}>+{q.sources.length - 2} more</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDemo
