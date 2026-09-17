"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CONTACT_EMAIL, mailto, type ContactTopic } from '@/lib/contact'
import styles from './EmailLink.module.css'

// A mailto link that does not silently fail. Phones with no mail app and
// desktops with no mail handler ignore mailto: clicks. If the page still has
// focus a moment after the click, nothing opened, so copy the address and
// say so. Opening a mail app blurs or hides the page, which cancels it.
const FALLBACK_EVENT = 'landex:mail-fallback'

export default function EmailLink({
  topic,
  className,
  children,
}: {
  topic: ContactTopic
  className?: string
  children: ReactNode
}) {
  const timer = useRef<number | null>(null)

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
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(async () => {
      timer.current = null
      if (document.hidden || !document.hasFocus()) return
      let copied = false
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL)
        copied = true
      } catch {
        /* clipboard blocked: the note still shows the address */
      }
      window.dispatchEvent(new CustomEvent(FALLBACK_EVENT, { detail: { copied } }))
    }, 1500)
  }

  return (
    <a href={mailto(topic)} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

/** One note for the whole page. Mounted once in the layout. */
export function MailFallbackNote() {
  const [state, setState] = useState<{ copied: boolean } | null>(null)

  useEffect(() => {
    let hide = 0
    const onFallback = (e: Event) => {
      setState((e as CustomEvent<{ copied: boolean }>).detail)
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
  return (
    <div className={styles.note} role="status">
      <span className={styles.noteLead}>No mail app opened on this device.</span>
      <span className={styles.noteBody}>
        Write to <strong>{CONTACT_EMAIL}</strong>
        {state.copied ? ', copied to your clipboard.' : '.'}
      </span>
      <button type="button" className={styles.noteClose} onClick={() => setState(null)} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}
