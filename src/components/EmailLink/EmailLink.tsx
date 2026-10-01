"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { mailto, recipients, type ContactTo, type ContactTopic } from '@/lib/contact'
import styles from './EmailLink.module.css'

// A mailto link that does not silently fail. Phones with no mail app and
// desktops with no mail handler ignore mailto: clicks. If the page still has
// focus a moment after the click, nothing opened, so copy the address and
// say so. Opening a mail app blurs or hides the page, which cancels it.
//
// The href is assembled after mount so the served HTML never carries an
// address. Until then the link points at the footer's contact block.
const FALLBACK_EVENT = 'landex:mail-fallback'
const PLACEHOLDER_HREF = '#contact'

type Fallback = { copied: boolean; addresses: string[] }

export default function EmailLink({
  topic,
  to = 'allen',
  className,
  children,
}: {
  topic: ContactTopic
  to?: ContactTo
  className?: string
  children: ReactNode
}) {
  const timer = useRef<number | null>(null)
  const [href, setHref] = useState(PLACEHOLDER_HREF)

  useEffect(() => {
    setHref(mailto(topic, to))
  }, [topic, to])

  useEffect(() => {
    const cancel = () => {
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = null
    }
    window.addEventListener('blur', cancel)
    document.addEventListener('visibilitychange', cancel)
    return () => {
      cancel()
      window.removeEventListener('blur', cancel)
      document.removeEventListener('visibilitychange', cancel)
    }
  }, [])

  const onClick = () => {
    if (href === PLACEHOLDER_HREF) return
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(async () => {
      timer.current = null
      if (document.hidden || !document.hasFocus()) return
      const addresses = recipients(to)
      let copied = false
      try {
        await navigator.clipboard.writeText(addresses.join(', '))
        copied = true
      } catch {
        /* clipboard blocked: the note still shows the address */
      }
      window.dispatchEvent(new CustomEvent<Fallback>(FALLBACK_EVENT, { detail: { copied, addresses } }))
    }, 1500)
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

/** One note for the whole page. Mounted once in the layout. */
export function MailFallbackNote() {
  const [state, setState] = useState<Fallback | null>(null)

  useEffect(() => {
    let hide = 0
    const onFallback = (e: Event) => {
      setState((e as CustomEvent<Fallback>).detail)
      window.clearTimeout(hide)
      hide = window.setTimeout(() => setState(null), 9000)
    }
    window.addEventListener(FALLBACK_EVENT, onFallback)
    return () => {
      window.removeEventListener(FALLBACK_EVENT, onFallback)
      window.clearTimeout(hide)
    }
  }, [])

  if (!state) return null
  // The real address only ever appears here, after a click, never in the
  // served page.
  return (
    <div className={styles.note} role="status">
      <span className={styles.noteLead}>No mail app opened on this device.</span>
      <span className={styles.noteBody}>
        Write to <strong>{state.addresses.join(', ')}</strong>
        {state.copied ? ', copied to your clipboard.' : '.'}
      </span>
      <button type="button" className={styles.noteClose} onClick={() => setState(null)} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}
