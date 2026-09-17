import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import Examples from '@/components/Examples/Examples'
import Outcomes from '@/components/Outcomes/Outcomes'
import Pipeline from '@/components/Pipeline/Pipeline'
import Api from '@/components/Api/Api'
import Pricing from '@/components/Pricing/Pricing'
import Team from '@/components/Team/Team'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main>
        <Hero />
        <Examples />
        <Outcomes />
        <Pipeline />
        <Api />
        <Team />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
