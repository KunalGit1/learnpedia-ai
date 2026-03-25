'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle, BookOpen, Crown, ArrowRight, Sparkles, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'

function SuccessContent() {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-6">
      <div className="orb w-[400px] h-[400px] bg-emerald-700/15 top-0 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 text-center max-w-lg">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-900/50"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/20 text-sm text-emerald-300 font-medium mb-5">
            <Crown className="w-4 h-4" />
            All Access — Activated!
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Welcome to <span className="text-gradient">Learnpedia!</span>
          </h1>

          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Your payment was successful. You now have lifetime access to 50+ books, 20+ audiobooks, and all AI tools.
          </p>

          {/* What's unlocked */}
          <div className="glass rounded-2xl p-6 mb-8 text-left border border-white/5">
            <h3 className="text-white font-bold mb-4 text-sm">What&apos;s now unlocked for you:</h3>
            <ul className="space-y-3">
              {[
                { icon: BookOpen, text: '50+ Premium Digital Books', color: 'text-violet-400' },
                { icon: Headphones, text: '20+ Premium Audiobooks', color: 'text-blue-400' },
                { icon: Sparkles, text: 'AI Content Writer (Llama 3.1)', color: 'text-pink-400' },
                { icon: Sparkles, text: 'AI Image Generator (FLUX.1)', color: 'text-emerald-400' },
                { icon: Sparkles, text: 'AI Prompt Library (500+ prompts)', color: 'text-amber-400' },
              ].map(({ icon: Icon, text, color }, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <Link href="/dashboard" className="btn-primary inline-flex text-base px-10 py-4">
            <span className="relative z-10">Go to My Dashboard</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
          </Link>

          <p className="text-slate-600 text-xs mt-5">
            A receipt has been sent to your email. Questions?{' '}
            <Link href="/contact" className="text-violet-400 hover:text-violet-300">Contact support</Link>
          </p>
        </motion.div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}
