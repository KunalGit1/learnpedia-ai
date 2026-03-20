'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Digital Product Creator',
    location: 'Mumbai',
    avatar: 'PS',
    color: 'from-violet-600 to-purple-700',
    text: 'I made back my ₹1,999 investment within 48 hours by reselling just one book. The quality of content is insane — feels like it was written by industry experts.',
    stars: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Online Business Coach',
    location: 'Bangalore',
    avatar: 'RV',
    color: 'from-blue-600 to-cyan-700',
    text: 'The AI Wealth Code alone is worth 10x the price. I\'ve been building online businesses for 8 years and this library covers everything I wish I knew earlier.',
    stars: 5,
  },
  {
    name: 'Anjali Patel',
    role: 'Content Creator & Blogger',
    location: 'Ahmedabad',
    avatar: 'AP',
    color: 'from-emerald-600 to-teal-700',
    text: 'As someone who listens to audiobooks on my commute, the audio library is a game changer. Professional narration, great content. Already recommended to my entire team.',
    stars: 5,
  },
  {
    name: 'Karan Mehta',
    role: 'SaaS Founder',
    location: 'Delhi',
    avatar: 'KM',
    color: 'from-orange-600 to-red-700',
    text: 'The AI Content Writer saved me 20+ hours this month alone. I\'m generating product descriptions, email sequences, and social posts in minutes. Absolutely worth it.',
    stars: 5,
  },
  {
    name: 'Neha Gupta',
    role: 'Freelance Marketer',
    location: 'Pune',
    avatar: 'NG',
    color: 'from-pink-600 to-rose-700',
    text: 'Bought the Pro plan expecting good books. Got so much more — the prompt library, the AI tools, the audiobooks. Best ₹1,999 I\'ve ever spent on my business education.',
    stars: 5,
  },
  {
    name: 'Aditya Singh',
    role: 'YouTuber & Entrepreneur',
    location: 'Hyderabad',
    avatar: 'AS',
    color: 'from-indigo-600 to-violet-700',
    text: 'I was skeptical about PLR content but the quality blew me away. These aren\'t generic recycled articles — they\'re comprehensive, well-researched, and actually useful.',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-violet-700/8 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-sm text-violet-300 font-medium mb-6"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            Member Reviews
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            What Our Members Say
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-hover rounded-2xl p-6 card-hover relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-5">&quot;{t.text}&quot;</p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role} · {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
