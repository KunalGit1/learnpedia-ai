'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: 'What exactly is a Private Label Right (PLR)?',
    a: 'PLR (Private Label Rights) means you get full ownership rights to all content. You can rebrand books with your name, edit the content, bundle them into courses, sell them as your own products, use them as lead magnets, or repurpose them in any way. You keep 100% of the profits from any sales you make.',
  },
  {
    q: 'Is this really a one-time payment with lifetime access?',
    a: 'Yes — absolutely. You pay once and get lifetime access to everything included in your plan. No monthly fees, no renewal costs, no hidden charges. We believe in giving you real value without locking you into subscriptions.',
  },
  {
    q: 'What formats do the books come in?',
    a: 'All books are available as PDF downloads. Selected titles also come with editable Word/Google Docs files so you can customise the content. Audiobooks are available as MP3 files for easy listening on any device.',
  },
  {
    q: 'Can I actually sell these books and keep the profits?',
    a: 'Yes! That\'s the whole point. Sell them on your website, Gumroad, Amazon KDP, Etsy, or anywhere else. Rebrand them with your logo and name. Bundle them into courses. Use them as freebies to grow your email list. 100% of profits are yours.',
  },
  {
    q: 'Do I need any technical skills to use the AI tools?',
    a: 'None at all. Our AI tools are designed to be simple — just type what you need and get results instantly. No coding, no technical setup, no complicated interfaces. If you can type a sentence, you can use our AI tools.',
  },
  {
    q: 'What is included in the All Access plan?',
    a: 'Everything — 50+ premium digital books, 20+ audiobooks, AI Content Writer, AI Image Generator, AI Prompt Library (500+ prompts), Private Label Rights (resell & rebrand), new books and audiobooks added weekly, and priority support. One payment, lifetime access.',
  },
  {
    q: 'How quickly do I get access after payment?',
    a: 'Instantly. As soon as your payment is confirmed, you\'ll receive an email with your login credentials and full access to the member dashboard. Most members are exploring the library within 2 minutes of payment.',
  },
  {
    q: 'Do you offer a refund if I\'m not happy?',
    a: 'Yes — we offer a 7-day money-back guarantee, no questions asked. If you\'re not completely satisfied within 7 days of purchase, contact us and we\'ll refund you fully. We\'re confident you\'ll love it, but we believe in earning your trust.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-sm text-violet-300 font-medium mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            FAQs
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            Got Questions?{' '}
            <span className="text-gradient">We Have Answers.</span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`glass rounded-xl overflow-hidden transition-all duration-200 ${open === i ? 'border-violet-500/30' : 'border-white/5'}`}
              style={{ border: `1px solid ${open === i ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)'}` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className={`font-semibold text-sm leading-snug transition-colors ${open === i ? 'text-violet-300' : 'text-white'}`}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${open === i ? 'bg-violet-500/20' : 'bg-white/5'}`}>
                  {open === i
                    ? <Minus className="w-3.5 h-3.5 text-violet-400" />
                    : <Plus className="w-3.5 h-3.5 text-slate-400" />
                  }
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
