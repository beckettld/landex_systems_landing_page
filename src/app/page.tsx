import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import Solution from '@/components/Solution/Solution'
import Features from '@/components/Features/Features'
import WhereUsed from '@/components/WhereUsed/WhereUsed'
import Pricing from '@/components/Pricing/Pricing'
import Team from '@/components/Team/Team'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main>
        <Hero />
        <Solution />
        <Features />
        <WhereUsed />
        <Team />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
