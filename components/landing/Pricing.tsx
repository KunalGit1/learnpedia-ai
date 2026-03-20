'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, X, Sparkles, Crown, ArrowRight, Zap } from 'lucide-react'
import products from '@/data/products.json'

export default function Pricing() {
  const { starter, pro } = products.pricing

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="orb w-[500px] h-[500px] bg-violet-700/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-sm text-violet-300 font-medium mb-6"
          >
            <Zap className="w-4 h-4 text-violet-400" />
            Simple One-Time Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Pay Once.{' '}
            <span className="text-gradient">Own It Forever.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            No subscriptions. No renewals. No hidden fees. One payment, lifetime access.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Starter */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-8 flex flex-col card-hover"
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl">{starter.name}</h3>
                  <p className="text-slate-500 text-xs">{starter.description}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-5xl font-black text-white">
                  ₹{starter.price.toLocaleString('en-IN')}
                </span>
                <div>
                  <div className="text-slate-500 text-sm line-through">₹2,999</div>
                  <div className="text-emerald-400 text-xs font-semibold">{starter.label}</div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {starter.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-slate-300">{f}</span>
                </li>
              ))}
              {starter.notIncluded.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-slate-700/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-slate-600" />
                  </div>
                  <span className="text-slate-600">{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/checkout?plan=starter" className="btn-ghost w-full justify-center text-sm py-3.5">
              Get Starter Access
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl p-px overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.6), rgba(99,102,241,0.4), rgba(245,158,11,0.3), rgba(139,92,246,0.6))',
            }}
          >
            {/* Popular badge */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-violet-900/50">
                <Crown className="w-3 h-3" />
                Most Popular
              </span>
            </div>

            <div className="relative rounded-2xl bg-surface p-8 flex flex-col h-full card-hover"
              style={{ background: 'linear-gradient(145deg, #0f0b1e, #0d1117)' }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/50">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl">{pro.name}</h3>
                    <p className="text-slate-500 text-xs">{pro.description}</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-5xl font-black text-gradient">
                    ₹{pro.price.toLocaleString('en-IN')}
                  </span>
                  <div>
                    <div className="text-slate-500 text-sm line-through">₹7,999</div>
                    <div className="text-violet-400 text-xs font-semibold">{pro.label}</div>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {pro.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-violet-400" />
                    </div>
                    <span className="text-slate-200">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="/checkout?plan=pro" className="btn-primary w-full justify-center text-sm py-4">
                <Crown className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Unlock Pro Access</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <span className="text-emerald-400">✓</span>
            7-day money-back guarantee — no questions asked
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400">✓</span>
            Instant access after payment
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400">✓</span>
            Secure checkout
          </p>
        </motion.div>
      </div>
    </section>
  )
}
