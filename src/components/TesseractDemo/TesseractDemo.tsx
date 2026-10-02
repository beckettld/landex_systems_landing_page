"use client";

// The /tesseract demo: our own scans with the models Tesseract returned, drawn
// over the points, with the Scan / Both / Model switch. It moves to the next
// scene every few seconds until someone picks one. Data in
// public/tesseract-scene/<id>/, built by scripts/build-tesseract-scene.py.

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { TesseractView } from '@/components/TesseractViewer/TesseractViewer'
import styles from './TesseractDemo.module.css'

const TesseractViewer = dynamic(() => import('@/components/TesseractViewer/TesseractViewer'), { ssr: false })

const SCENES: { id: string; label: string; caption: string; credit?: { text: string; href: string } }[] = [
  {
    id: 'house',
    label: 'House',
    caption: 'Brick cottage in Revit · 129 elements',
    credit: { text: 'Scan: UVA Library, CC0', href: 'https://doi.org/10.18130/V3/Q1GH69' },
  },
  {
    id: 'plant-room',
    label: 'Plant room',
    caption: 'Plant room pipework · 130 elements',
    credit: { text: 'Scan: Mendeley Data, CC BY 4.0', href: 'https://data.mendeley.com/datasets/vfz5pz4n8k' },
  },
  {
    id: 'timber-frame',
    label: 'Timber frame',
    caption: 'Timber-frame hall · 184 elements',
    credit: { text: 'Scan: DaRUS Stuttgart, CC BY 4.0', href: 'https://doi.org/10.18419/darus-3304' },
  },
  {
    id: 'tower',
    label: 'Tower',
    caption: 'Lattice steel tower · 557 elements',
    credit: { text: 'Scan: GridNet-HD, CC BY 4.0', href: 'https://huggingface.co/datasets/heig-vd-geo/GridNet-HD' },
  },
  { id: 'bridge', label: 'Bridge', caption: 'Tied-arch motorway bridge · 233 elements' },
]

const VIEWS: { key: TesseractView; label: string }[] = [
  { key: 'scan', label: 'Scan' },
  { key: 'both', label: 'Both' },
  { key: 'model', label: 'Model' },
]

const CYCLE_MS = 12000

export default function TesseractDemo() {
  const [view, setView] = useState<TesseractView>('both')
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(true)
  const [ready, setReady] = useState(false)
  const scene = SCENES[idx]

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => {
      setReady(false)
      setIdx((i) => (i + 1) % SCENES.length)
    }, CYCLE_MS)
    return () => clearTimeout(t)
  }, [idx, auto])

  // warm the browser cache with the next scene while this one shows, so the switch is quick
  useEffect(() => {
    if (!ready) return
    const next = SCENES[(idx + 1) % SCENES.length].id
    for (const f of ['manifest.json', 'model.json', 'cloud.bin']) fetch(`/tesseract-scene/${next}/${f}`).catch(() => {})
  }, [ready, idx])

  const pick = (i: number) => {
    setAuto(false)
    if (i === idx) return
    setReady(false)
    setIdx(i)
  }

  return (
    <div className={styles.stage}>
      <TesseractViewer
        key={scene.id}
        scene={scene.id}
        className={`${styles.canvas} ${ready ? styles.ready : ''}`}
        view={view}
        onReady={() => setReady(true)}
      />
      <div className={styles.switch} role="group" aria-label="What to show">
        {VIEWS.map((v) => (
          <button key={v.key} type="button" className={`${styles.switchBtn} ${view === v.key ? styles.on : ''}`} aria-pressed={view === v.key} onClick={() => setView(v.key)}>
            {v.label}
          </button>
        ))}
      </div>
      <div className={styles.foot}>
        <span className={styles.caption}>
          {scene.caption}
          {scene.credit && (
            <>
              {' · '}
              <a href={scene.credit.href} target="_blank" rel="noopener">{scene.credit.text}</a>
            </>
          )}
        </span>
        <div className={styles.scenes} role="tablist" aria-label="Scene">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === idx}
              className={`${styles.sceneBtn} ${i === idx ? styles.sceneOn : ''}`}
              onClick={() => pick(i)}
            >
              {s.label}
              {i === idx && auto && <span key={idx} className={styles.progress} style={{ animationDuration: `${CYCLE_MS}ms` }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
