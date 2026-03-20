import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import products from '@/data/products.json'
import Link from 'next/link'
import { Headphones, Play, Clock, Lock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Audiobooks Library — Learnpedia.ai',
  description: '20+ premium audiobooks for entrepreneurs. Listen anytime, anywhere.',
}

export default function AudiobooksPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm text-blue-300 font-medium mb-6">
            <Headphones className="w-4 h-4" />
            Audio Library
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Premium{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Audiobooks
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Professional narration. Learn on your commute, at the gym, or during morning walks.
          </p>
        </div>

        {/* Featured audiobook */}
        {products.audiobooks.slice(0, 1).map((book) => (
          <div
            key={book.id}
            className={`relative rounded-3xl overflow-hidden mb-10 bg-gradient-to-br ${book.gradient} p-8 md:p-12`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 block">{book.category}</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{book.title}</h2>
              <p className="text-white/70 mb-6">{book.subtitle}</p>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4" />
                  {book.duration}
                </div>
                <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-semibold">Pro Member</span>
              </div>
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-all">
                <Play className="w-4 h-4 fill-current" />
                Unlock to Listen
              </Link>
            </div>
          </div>
        ))}

        {/* Audiobooks grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.audiobooks.map((book) => (
            <div key={book.id} className="group glass-hover rounded-2xl overflow-hidden card-hover">
              <div className={`relative h-48 bg-gradient-to-br ${book.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="relative z-10 w-14 h-14 rounded-full bg-white/20 flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                  <Lock className="w-5 h-5 text-white/70" />
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded-full">Pro</span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: book.accentColor }}>{book.category}</span>
                <h3 className="text-white font-bold text-sm mt-1 mb-1 leading-snug">{book.title}</h3>
                <p className="text-slate-600 text-xs mb-3 line-clamp-2">{book.subtitle}</p>
                <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                  <Clock className="w-3 h-3" />
                  {book.duration}
                </div>
              </div>
            </div>
          ))}

          {/* Locked placeholders */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`locked-${i}`} className="glass rounded-2xl overflow-hidden opacity-40">
              <div className="h-48 bg-slate-800/50 flex items-center justify-center">
                <Headphones className="w-10 h-10 text-slate-700" />
              </div>
              <div className="p-5">
                <div className="h-3 bg-white/5 rounded-full w-16 mb-2" />
                <div className="h-3 bg-white/5 rounded-full w-full mb-1" />
                <div className="h-3 bg-white/5 rounded-full w-3/4" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-4">All audiobooks require Pro membership.</p>
          <Link href="/pricing" className="btn-primary inline-flex text-sm px-8 py-3.5">
            <span className="relative z-10">Get Pro Access — ₹1,999</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
