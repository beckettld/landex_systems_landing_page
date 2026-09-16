"use client";

import AnimateIn from '@/components/AnimateIn'
import { mailto } from '@/lib/contact'
import styles from './Api.module.css'

// The landing page does not document the API. Copy and a CTA only; the
// subdomains are linked from the footer.

function Api() {
  return (
    <section id="api" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <AnimateIn>
            <span className={styles.eyebrow}>API</span>
            <h2 className={styles.title}>Answers from scans, inside your product.</h2>
            <p className={styles.lede}>
              Send a point cloud to the API. Get back the labeled cloud and the answer to your question. One engine behind the upload page and the API, one price per upload.
            </p>
            <a className={styles.cta} href={mailto('api')}>
              Request API access
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </AnimateIn>
        </div>

      </div>
    </section>
  )
}

export default Api
