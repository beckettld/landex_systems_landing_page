import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import Record from '@/components/Record/Record'
import ProductShot from '@/components/ProductShot/ProductShot'
import Solution from '@/components/Solution/Solution'
import Features from '@/components/Features/Features'
import Pricing from '@/components/Pricing/Pricing'
import Team from '@/components/Team/Team'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main>
        <Hero />
        <Record />
        <ProductShot />
        <Solution />
        <Features />
        <Pricing />
        <Team />
        <Footer />
      </main>
    </div>
  )
}
