import AuroraBackground from './components/AuroraBackground'
import MouseGlow        from './components/MouseGlow'
import NavBar           from './components/NavBar'
import HeroSection      from './components/HeroSection'
import FeaturesSection  from './components/FeaturesSection'
import HowItWorks       from './components/HowItWorks'
import StatsSection     from './components/StatsSection'
import Testimonials     from './components/Testimonials'
import Footer           from './components/Footer'

export default function Home() {
  return (
    <>
      {/* Fixed ambient layers */}
      <AuroraBackground />
      <MouseGlow />

      {/* Page content above the background */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <NavBar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorks />
          <StatsSection />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </>
  )
}
