'use client'

import { motion } from 'framer-motion'
import { BookOpen, Headphones, Sparkles, Users } from 'lucide-react'

const stats = [
  { icon: BookOpen, value: '50+', label: 'Premium Digital Books', color: 'text-violet-400', glow: 'rgba(139,92,246,0.15)' },
  { icon: Headphones, value: '20+', label: 'Audiobooks', color: 'text-blue-400', glow: 'rgba(59,130,246,0.15)' },
  { icon: Sparkles, value: '5', label: 'AI Tools', color: 'text-amber-400', glow: 'rgba(245,158,11,0.15)' },
  { icon: Users, value: '10K+', label: 'Active Members', color: 'text-emerald-400', glow: 'rgba(16,185,129,0.15)' },
]

export default function Stats() {
  return (
    <section className="relative py-16 border-y border-white/5">
      {/* Gradient line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label, color, glow }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass rounded-2xl p-6 flex flex-col items-center text-center card-hover"
              style={{ boxShadow: `0 0 40px ${glow}` }}
            >
              <div className={`mb-3 p-3 rounded-xl`} style={{ background: glow }}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className={`text-4xl font-black mb-1 ${color}`}>{value}</div>
              <div className="text-sm text-slate-500 font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
    </section>
  )
}
