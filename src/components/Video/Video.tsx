"use client";

import styles from './Video.module.css'

function Video() {
  return (
    <section id="video" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>See It In Action</span>
          <h2 className={styles.title}>
            Watch how Landex Systems transforms boundary research
          </h2>
        </div>
        
        <div className={styles.videoWrapper}>
          <div className={styles.videoContainer}>
            <iframe
              src="https://www.youtube.com/embed/URiJrM2TXEg"
              title="Landex Systems Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className={styles.iframe}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Video

