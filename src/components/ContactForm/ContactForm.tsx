"use client";

import { useState, type FormEvent } from 'react'
import styles from './ContactForm.module.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !json.ok) {
        setError(json.error ?? 'Something went wrong. Email allen@landexsystems.com directly.')
        setStatus('error')
        return
      }
      form.reset()
      setStatus('sent')
    } catch {
      setError('Something went wrong. Email allen@landexsystems.com directly.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.sent} role="status">
        <span className={styles.sentLabel}>Received</span>
        <p className={styles.sentBody}>
          Thanks. One of us will reply within a day with where to drop the scan.
        </p>
        <button type="button" className={styles.again} onClick={() => setStatus('idle')}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input className={styles.input} name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Work email</span>
          <input className={styles.input} name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>Company <span className={styles.optional}>optional</span></span>
        <input className={styles.input} name="company" type="text" autoComplete="organization" maxLength={160} />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>What do you have?</span>
        <textarea
          className={styles.textarea}
          name="message"
          rows={5}
          required
          maxLength={5000}
          placeholder="Scan format, rough size, and what you want to know from it."
        />
      </label>
      {/* Honeypot. Hidden from people, filled by bots. */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && <p className={styles.error} role="alert">{error}</p>}

      <button className={styles.submit} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending' : 'Send us a model'}
        {status !== 'sending' && (
          <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </form>
  )
}

export default ContactForm
