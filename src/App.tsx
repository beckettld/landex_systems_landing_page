import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Problem from './components/Problem/Problem'
import Solution from './components/Solution/Solution'
// import Features from './components/Features/Features'
// import Technology from './components/Technology/Technology'
import Partners from './components/Partners/Partners'
import Video from './components/Video/Video'
import Collections from './components/Collections/Collections'
import Contact from './components/FinalCTA/FinalCTA'
import Footer from './components/Footer/Footer'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Problem />
        <Solution />
        <Video />
        <Collections />
        {/* <Features /> */}
        {/* <Technology /> */}
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
