'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Star, TrendingUp } from 'lucide-react'
import BookCover from '@/components/BookCover'
import products from '@/data/products.json'

export default function BooksPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="orb w-[500px] h-[500px] bg-violet-800/10 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-sm text-violet-300 font-medium mb-4"
            >
              <BookOpen className="w-4 h-4" />
              Premium Digital Library
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              Books That Actually <br />
              <span className="text-gradient">Make You Money</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/books" className="btn-ghost text-sm py-3 px-6 whitespace-nowrap">
              View All Books
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Books grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/books/${book.slug}`} className="block">
                {/* Cover */}
                <div className="relative mb-4">
                  <div className="mx-auto w-fit">
                    <BookCover
                      title={book.title}
                      subtitle={book.subtitle}
                      category={book.category}
                      gradient={book.gradient}
                      accentColor={book.accentColor}
                      size="lg"
                      tilt={false}
                      index={i}
                    />
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 right-0 flex flex-col gap-1">
                    {book.bestseller && (
                      <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                        Bestseller
                      </span>
                    )}
                    {book.new && (
                      <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <span className="text-xs text-violet-400 font-semibold uppercase tracking-wider">{book.category}</span>
                  <h3 className="text-white font-bold text-sm mt-1 mb-1 group-hover:text-violet-300 transition-colors leading-snug">
                    {book.title}
                  </h3>
                  <div className="flex items-center justify-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {book.pages} pages
                    </span>
                    <span className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      ))}
                    </span>
                  </div>
                  {book.tier === 'pro' && (
                    <span className="mt-2 inline-block text-[10px] text-amber-400/80 border border-amber-400/20 px-2 py-0.5 rounded-full">
                      Pro Only
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl glass border border-violet-500/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">20+ new books added every month</p>
              <p className="text-slate-500 text-sm">Pro members get every new release, forever</p>
            </div>
          </div>
          <Link href="/pricing" className="btn-primary text-sm py-3 px-6 whitespace-nowrap">
            <span className="relative z-10">Get All 50+ Books — ₹999</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
