import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import Numbers from '@/components/Numbers/Numbers'
import Problem from '@/components/Problem/Problem'
import Difference from '@/components/Difference/Difference'
import Solution from '@/components/Solution/Solution'
// import ProductDemo from '@/components/ProductDemo/ProductDemo'
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
        <Numbers />
        <Problem />
        <Difference />
        <Team />
        <Solution />
        {/* <ProductDemo /> */}
        <Features />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
