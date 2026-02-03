import styles from './Video.module.css'

function Video() {
  return (
    <section id="video" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Video</span>
          <h2 className={styles.title}>
            See Landex Systems In Action
          </h2>
        </div>
        
        <div className={styles.videoWrapper}>
          <div className={styles.videoContainer}>
            <iframe
              src="https://www.youtube.com/embed/jygiht4P_yo"
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

