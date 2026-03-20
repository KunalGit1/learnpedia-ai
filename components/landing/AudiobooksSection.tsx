'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Headphones, Play, Clock } from 'lucide-react'
import products from '@/data/products.json'

export default function AudiobooksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="orb w-[500px] h-[400px] bg-blue-700/10 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm text-blue-300 font-medium mb-4"
            >
              <Headphones className="w-4 h-4 text-blue-400" />
              Premium Audiobooks
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              Learn While You <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Live Your Life
              </span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href="/audiobooks" className="btn-ghost text-sm py-3 px-6 whitespace-nowrap">
              All Audiobooks
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Audiobook cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.audiobooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-hover rounded-2xl overflow-hidden card-hover"
            >
              {/* Cover */}
              <div className={`relative h-48 bg-gradient-to-br ${book.gradient} flex items-center justify-center overflow-hidden`}>
                {/* Pattern */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 0, transparent 50%)`,
                    backgroundSize: '12px 12px',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Play button */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all group-hover:scale-110">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>

                {/* Headphone icon watermark */}
                <Headphones className="absolute bottom-3 right-3 w-5 h-5 text-white/30" />
              </div>

              {/* Info */}
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: book.accentColor }}>
                  {book.category}
                </span>
                <h3 className="text-white font-bold text-sm mt-1 mb-1 group-hover:text-blue-300 transition-colors leading-snug">
                  {book.title}
                </h3>
                <p className="text-slate-600 text-xs mb-3 line-clamp-2">{book.subtitle}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{book.duration}</span>
                  </div>
                  <span className="text-[10px] text-amber-400/80 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    Pro
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Waveform decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-1 h-8"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-blue-500/30"
              animate={{ height: [4, Math.random() * 24 + 4, 4] }}
              transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
