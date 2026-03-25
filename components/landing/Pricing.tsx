'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Crown, ArrowRight, Zap, Shield, Infinity } from 'lucide-react'

const FEATURES = [
  '50+ Premium Digital Books',
  '20+ Premium Audiobooks',
  'AI Content Writer (Llama 3.1)',
  'AI Image Generator (FLUX.1)',
  'AI Prompt Library (500+ prompts)',
  'Private Label Rights — Resell & Rebrand',
  'Lifetime Access — Pay Once, Keep Forever',
  'New Books & Audiobooks Added Weekly',
  'Priority Support',
]

const GUARANTEES = [
  { icon: Shield, label: '7-Day Money-Back Guarantee' },
  { icon: Infinity, label: 'Lifetime Access — No Renewals' },
  { icon: Zap, label: 'Instant Access After Payment' },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-violet-700/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-2xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-sm text-violet-300 font-medium mb-6">
            <Zap className="w-4 h-4 text-violet-400" />
            Simple One-Time Pricing
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Pay Once.{' '}
            <span className="text-gradient">Own It Forever.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg">
            No subscriptions. No renewals. No hidden fees. Everything included.
          </motion.p>
        </div>

        {/* Single plan card */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="relative rounded-2xl p-px overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.6), rgba(99,102,241,0.4), rgba(245,158,11,0.3), rgba(139,92,246,0.6))' }}>

          {/* Badge */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-violet-900/50">
              <Crown className="w-3 h-3" /> All Access
            </span>
          </div>

          <div className="relative rounded-2xl p-8 md:p-10" style={{ background: 'linear-gradient(145deg, #0f0b1e, #0d1117)' }}>
            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-6xl font-black text-gradient">₹1,999</span>
                <div className="text-left">
                  <div className="text-slate-500 text-sm line-through">₹7,999</div>
                  <div className="text-emerald-400 text-xs font-semibold">One-Time Payment</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Everything you need to build your digital empire</p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-violet-400" />
                  </div>
                  <span className="text-slate-200">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/checkout" className="btn-primary w-full justify-center text-base py-4">
              <Crown className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Get Lifetime Access — ₹1,999</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </Link>
          </div>
        </motion.div>

        {/* Guarantees */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {GUARANTEES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 text-slate-500 text-xs">
              <Icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
