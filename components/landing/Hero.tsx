'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Star, Users, BookOpen } from 'lucide-react'
import BookCover from '@/components/BookCover'
import products from '@/data/products.json'

export default function Hero() {
  const previewBooks = products.books.slice(0, 4)

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-violet-700/20 -top-40 -left-40 animate-float-slow" />
      <div className="orb w-[400px] h-[400px] bg-blue-600/15 top-1/3 -right-20 animate-float-delayed" />
      <div className="orb w-[300px] h-[300px] bg-purple-500/10 bottom-0 left-1/3 animate-float" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-sm text-violet-300 font-medium">
            <Sparkles className="w-4 h-4 text-violet-400" />
            AI Tools Now Available for Members
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 max-w-5xl"
        >
          <span className="text-white">The AI-Powered </span>
          <span className="text-gradient-hero block md:inline">Encyclopedia</span>
          <span className="text-white"> for Modern</span>
          <br />
          <span className="text-white">Entrepreneurs</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10"
        >
          50+ Premium Digital Books, 20+ Audiobooks & AI Tools — everything you need to
          build, brand & scale your digital empire.{' '}
          <span className="text-violet-400 font-semibold">Lifetime access from ₹999.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          <Link href="/pricing" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
            <Sparkles className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Unlock Lifetime Access</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
          <Link href="/books" className="btn-ghost text-base px-8 py-4 w-full sm:w-auto">
            Browse Library
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-16 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-background flex items-center justify-center text-[10px] font-bold text-white`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span>10,000+ entrepreneurs</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span>4.9/5 rating</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <span>50+ books & growing</span>
          </div>
        </motion.div>

        {/* Floating book covers */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative flex items-end justify-center gap-4 md:gap-6"
        >
          {previewBooks.map((book, i) => (
            <motion.div
              key={book.id}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
              className={i === 1 || i === 2 ? 'mb-6' : ''}
            >
              <BookCover
                title={book.title}
                subtitle={book.subtitle}
                category={book.category}
                gradient={book.gradient}
                accentColor={book.accentColor}
                size={i === 1 || i === 2 ? 'lg' : 'md'}
                tilt={i % 2 === 0}
                index={i}
              />
            </motion.div>
          ))}

          {/* Glow under books */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-violet-600/20 blur-3xl rounded-full" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2 text-slate-600 text-sm"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-slate-700 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-slate-600 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
