import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import products from '@/data/products.json'
import Link from 'next/link'
import { Sparkles, ImageIcon, PenTool, Library, BarChart3, Share2, ArrowRight, Lock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Tools — Learnpedia.ai',
  description: 'AI image generator, content writer, prompt library and more — built for digital entrepreneurs.',
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, ImageIcon, PenTool, Library, BarChart3, Share2,
}

export default function AIToolsPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-500/20 text-sm text-amber-300 font-medium mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            AI-Powered Tools
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            AI Tools for{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
              Digital Entrepreneurs
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Not just a book library — a full AI-powered toolkit to help you create content, generate visuals, plan your business, and automate your growth.
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.aiTools.map((tool) => {
            const Icon = iconMap[tool.icon] || Sparkles
            const isComingSoon = tool.status === 'coming-soon'

            return (
              <div
                key={tool.id}
                className={`relative glass-hover rounded-2xl p-8 ${isComingSoon ? 'opacity-60' : ''} card-hover`}
              >
                {/* Status badges */}
                <div className="absolute top-5 right-5 flex gap-2">
                  {isComingSoon && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-700/80 text-slate-400 uppercase tracking-wide">
                      Coming Soon
                    </span>
                  )}
                  {!isComingSoon && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-400/20">
                      Included
                    </span>
                  )}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-amber-400" />
                </div>

                <h3 className="text-white font-black text-xl mb-3">{tool.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{tool.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-slate-500 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {!isComingSoon ? (
                  <Link href="/checkout" className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                    Get All Access <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="text-sm text-slate-600 font-semibold">Notify me when ready →</span>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center glass rounded-3xl p-12 border border-amber-500/10">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-3">Unlock All AI Tools</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">
            Get full access to all AI tools plus 50+ digital books and 20+ audiobooks. Everything for one lifetime payment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout" className="btn-primary text-sm px-8 py-4 inline-flex">
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Get All Access — ₹1,999</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
