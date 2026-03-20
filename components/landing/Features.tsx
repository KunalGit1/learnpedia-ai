'use client'

import { motion } from 'framer-motion'
import { BookOpen, Headphones, Sparkles, RefreshCw, Shield, Zap, Download, Globe } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: '50+ Premium Digital Books',
    description: 'Expertly crafted ebooks covering AI, business, marketing, productivity, and digital entrepreneurship. New titles added weekly.',
    color: 'from-violet-600 to-purple-700',
    glow: 'rgba(139,92,246,0.2)',
  },
  {
    icon: Headphones,
    title: '20+ Immersive Audiobooks',
    description: 'Professional narration with music beds. Learn on your commute, at the gym, or during your morning routine. Exclusive audio-only content.',
    color: 'from-blue-600 to-cyan-700',
    glow: 'rgba(59,130,246,0.2)',
  },
  {
    icon: Sparkles,
    title: 'Built-in AI Tools',
    description: 'Generate stunning book covers, write complete ebooks, access 500+ curated prompts, and plan your business — all with AI.',
    color: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.2)',
  },
  {
    icon: Shield,
    title: 'Full Private Label Rights',
    description: 'Rebrand, resell, edit, bundle — everything is yours. 100% rights and profits. No restrictions, no royalties, no limits.',
    color: 'from-emerald-600 to-teal-700',
    glow: 'rgba(16,185,129,0.2)',
  },
  {
    icon: RefreshCw,
    title: 'New Releases Every Week',
    description: 'The library never stops growing. Get access to every new book and audiobook added — forever on Pro, or 3 months on Starter.',
    color: 'from-pink-600 to-rose-700',
    glow: 'rgba(236,72,153,0.2)',
  },
  {
    icon: Zap,
    title: 'Instant Lifetime Access',
    description: 'One payment, forever. No subscriptions, no hidden fees, no monthly renewals. Pay once and own your access for life.',
    color: 'from-indigo-600 to-violet-700',
    glow: 'rgba(99,102,241,0.2)',
  },
  {
    icon: Download,
    title: 'Download & Keep Forever',
    description: 'Download any book or audiobook to your device. Your content is always available — even offline. Yours to keep forever.',
    color: 'from-slate-600 to-slate-700',
    glow: 'rgba(100,116,139,0.2)',
  },
  {
    icon: Globe,
    title: 'Resell & Build Income',
    description: 'Use our books as lead magnets, sell them as your own products, bundle them in courses — keep 100% of what you earn.',
    color: 'from-violet-700 to-blue-700',
    glow: 'rgba(139,92,246,0.2)',
  },
]

export default function Features() {
  return (
    <section className="section-padding max-w-7xl mx-auto px-6 md:px-12 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-sm text-violet-300 font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          What&apos;s Inside
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
        >
          Everything You Need to Build{' '}
          <span className="text-gradient">Your Digital Empire</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto"
        >
          One library. One lifetime payment. Unlimited knowledge, tools, and opportunities to grow.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map(({ icon: Icon, title, description, color, glow }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="glass-hover rounded-2xl p-6 card-hover"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}
              style={{ boxShadow: `0 8px 24px ${glow}` }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-sm mb-2 leading-snug">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
