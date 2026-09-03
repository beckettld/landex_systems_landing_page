import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import Pipeline from '@/components/Pipeline/Pipeline'
import Pricing from '@/components/Pricing/Pricing'
import Team from '@/components/Team/Team'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main>
        <Hero />
        <Pipeline />
        <Team />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
