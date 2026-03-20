import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Learnpedia.ai',
  description: 'One-time lifetime access from ₹999. No subscriptions, no hidden fees.',
}

export default function PricingPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-24">
        <Pricing />
        <FAQ />
      </div>
      <Footer />
    </main>
  )
}
