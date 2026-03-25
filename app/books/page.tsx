import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookCover from '@/components/BookCover'
import products from '@/data/products.json'
import Link from 'next/link'
import { BookOpen, Search, Filter, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Books Library — Learnpedia.ai',
  description: '50+ premium PLR digital books on AI, business, marketing, and entrepreneurship.',
}

export default function BooksPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-sm text-violet-300 font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Digital Library
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Premium <span className="text-gradient">Digital Books</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Expertly crafted books you can read, rebrand, and resell. New titles added weekly.
          </p>
        </div>

        {/* Search/filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-16">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search books..."
              className="w-full bg-surface border border-white/8 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 glass rounded-xl text-sm text-slate-400 hover:text-white border border-white/5 hover:border-violet-500/30 transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Books grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {products.books.map((book, i) => (
            <Link key={book.id} href={`/books/${book.slug}`} className="group block">
              <div className="relative mb-4 mx-auto w-fit">
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
                {book.bestseller && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
                    Best
                  </span>
                )}
              </div>
              <div className="text-center">
                <span className="text-xs text-violet-400 font-semibold">{book.category}</span>
                <h3 className="text-white text-sm font-bold mt-1 group-hover:text-violet-300 transition-colors leading-snug">
                  {book.title}
                </h3>
                <p className="text-slate-600 text-xs mt-1">{book.pages} pages</p>
              </div>
            </Link>
          ))}

          {/* Locked placeholder cards for non-members */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`locked-${i}`} className="group block">
              <div className="relative mb-4 mx-auto w-52 h-72 rounded-xl glass border border-white/5 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-5 h-5 text-slate-600" />
                  </div>
                  <p className="text-slate-700 text-xs">Unlock with membership</p>
                </div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-white/5 rounded-full w-20 mx-auto mb-2" />
                <div className="h-3 bg-white/5 rounded-full w-32 mx-auto" />
              </div>
            </div>
          ))}
        </div>

        {/* Unlock CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-4">Showing 5 of 50+ books. Unlock all with membership.</p>
          <Link href="/pricing" className="btn-primary inline-flex text-sm px-8 py-3.5">
            <span className="relative z-10">Get All Access — ₹1,999</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
