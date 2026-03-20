'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, ImageIcon, PenTool, Library, BarChart3, Share2, Lock } from 'lucide-react'
import products from '@/data/products.json'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, ImageIcon, PenTool, Library, BarChart3, Share2,
}

export default function AIToolsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glow background */}
      <div className="orb w-[600px] h-[400px] bg-amber-600/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-500/20 text-sm text-amber-300 font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            AI Tools for Members
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            AI Tools Built for <br />
            <span className="text-gradient-gold">Digital Entrepreneurs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Not just books — a full AI-powered toolkit to create, launch, and scale your digital business.
          </motion.p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.aiTools.map((tool, i) => {
            const Icon = iconMap[tool.icon] || Sparkles
            const isComingSoon = tool.status === 'coming-soon'
            const isPro = tool.tier === 'pro'

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative glass-hover rounded-2xl p-6 card-hover ${isComingSoon ? 'opacity-70' : ''}`}
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {isComingSoon && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 uppercase tracking-wide">
                      Soon
                    </span>
                  )}
                  {isPro && !isComingSoon && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 uppercase tracking-wide">
                      <Lock className="w-2.5 h-2.5" /> Pro
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/20 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-amber-400" />
                </div>

                <h3 className="text-white font-bold text-lg mb-2">{tool.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{tool.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-slate-500 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/pricing" className="btn-primary inline-flex text-base px-8 py-4">
            <Sparkles className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Unlock All AI Tools — ₹1,999</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
          <p className="text-slate-600 text-sm mt-3">Prompt Library included in Starter (₹999)</p>
        </motion.div>
      </div>
    </section>
  )
}
