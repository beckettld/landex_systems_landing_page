import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import EmailLink from '@/components/EmailLink/EmailLink'
import { CONTACT_EMAIL } from '@/lib/contact'
import { PAGES } from '@/lib/pages'
import styles from './Article.module.css'

// The shell every content page shares: the site navbar, one column of text,
// a link to the live example that backs the page, the same "send us a scan"
// door as the home page, and links to the other pages.

type Props = {
  eyebrow: string
  title: string
  lede: string
  href: string
  live?: { href: string; host: string; title: string }
  children: ReactNode
}

export { styles as articleStyles }

export default function Article({ eyebrow, title, lede, href, live, children }: Props) {
  const others = PAGES.filter((p) => p.href !== href)
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className={styles.main}>
        <article className={styles.container}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lede}>{lede}</p>
          <div className={styles.body}>{children}</div>

          {live && (
            <a className={styles.live} href={live.href} target="_blank" rel="noopener">
              <span>
                <span className={styles.liveLabel}>See it live</span>
                <span className={styles.liveTitle}>{live.title}</span>
              </span>
              <span className={styles.liveHost}>{live.host} &rarr;</span>
            </a>
          )}

          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Send us a scan. We will show you what we were able to return.</h2>
            <EmailLink className={styles.ctaButton} topic="scan">
              Send us a scan
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </EmailLink>
            <p className={styles.ctaNote}>That goes to {CONTACT_EMAIL}. Attach the file or a link to it.</p>
          </div>

          <nav className={styles.more} aria-label="More from Landex">
            {others.map((p) => (
              <a key={p.href} href={p.href} className={styles.moreLink}>
                {p.label}
                <span className={styles.moreHint}>{p.hint}</span>
              </a>
            ))}
          </nav>
        </article>
      </main>
      <Footer />
    </div>
  )
}
