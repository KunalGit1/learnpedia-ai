'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Crown } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.9) 0%, rgba(99,102,241,0.8) 50%, rgba(139,92,246,0.9) 100%)',
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-300/10 blur-3xl" />

          <div className="relative z-10 px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-white/90 text-xs font-semibold mb-4">
                <Sparkles className="w-3 h-3" />
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                Start Your Digital Empire Today.
              </h2>
              <p className="text-white/70 text-base max-w-lg">
                Join 10,000+ entrepreneurs who are already using Learnpedia.ai to build, brand, and scale their digital businesses.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 bg-white text-violet-700 font-black px-8 py-4 rounded-xl text-sm whitespace-nowrap hover:bg-white/90 transition-all shadow-2xl shadow-black/30 hover:scale-105"
              >
                <Crown className="w-4 h-4" />
                Get All Access — ₹1,999
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-white/50 text-xs text-center">7-day money-back guarantee · Pay once, own forever</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
