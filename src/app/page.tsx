import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import Examples from '@/components/Examples/Examples'
import Products from '@/components/Products/Products'
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
        <Products />
        <Team />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
