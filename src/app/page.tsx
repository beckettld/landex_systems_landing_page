import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import Outcomes from '@/components/Outcomes/Outcomes'
import WhoFor from '@/components/WhoFor/WhoFor'
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
        <Outcomes />
        <WhoFor />
        <Pipeline />
        <Api />
        <Team />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
