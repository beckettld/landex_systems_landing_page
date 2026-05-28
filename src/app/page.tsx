import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import Problem from '@/components/Problem/Problem'
import Solution from '@/components/Solution/Solution'
import ProductDemo from '@/components/ProductDemo/ProductDemo'
import Features from '@/components/Features/Features'
import Security from '@/components/Security/Security'
import Pricing from '@/components/Pricing/Pricing'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <ProductDemo />
        <Security />
        <Features />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
