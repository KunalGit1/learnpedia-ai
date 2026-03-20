import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/landing/Hero'
import Stats from '@/components/landing/Stats'
import Features from '@/components/landing/Features'
import BooksPreview from '@/components/landing/BooksPreview'
import AIToolsSection from '@/components/landing/AIToolsSection'
import AudiobooksSection from '@/components/landing/AudiobooksSection'
import Pricing from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import CTABanner from '@/components/landing/CTABanner'

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <BooksPreview />
      <AIToolsSection />
      <AudiobooksSection />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  )
}
