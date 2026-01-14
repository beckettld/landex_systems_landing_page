import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Partners from './components/Partners/Partners'
import Video from './components/Video/Video'
import Features from './components/Features/Features'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <main>
        <Hero />
        <About />
        <Partners />
        <Video />
        <Features />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App

