'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Headphones, Sparkles, Crown, Download, LogOut, ArrowRight, Lock, CheckCircle } from 'lucide-react'
import BookCover from '@/components/BookCover'
import products from '@/data/products.json'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Props {
  user: { email: string; id: string }
  profile: { plan: string; created_at: string }
  purchases: Array<{ id: string; plan: string; amount: number; created_at: string; status: string }>
}

export default function DashboardClient({ user, profile, purchases }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const plan = profile.plan
  const isPro = plan === 'pro'
  const hasAccess = plan === 'starter' || plan === 'pro'

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-2">
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isPro
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                : hasAccess
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-700 text-slate-400'
            }`}>
              {isPro ? <><Crown className="w-3 h-3" /> Pro Member</> : hasAccess ? <><CheckCircle className="w-3 h-3" /> Starter Member</> : 'No Active Plan'}
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-3xl font-black text-white">
            Welcome back 👋
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-slate-500 text-sm mt-1">
            {user.email}
          </motion.p>
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-2 text-slate-500 hover:text-white text-sm transition-colors">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

      {/* No plan — upsell */}
      {!hasAccess && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 glass rounded-2xl p-8 border border-violet-500/20 text-center">
          <Sparkles className="w-10 h-10 text-violet-400 mx-auto mb-3" />
          <h2 className="text-2xl font-black text-white mb-2">Unlock Your Library</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            You have an account but no active plan yet. Get lifetime access to 50+ books, audiobooks & AI tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/checkout?plan=pro" className="btn-primary inline-flex justify-center text-sm px-8 py-3.5">
              <Crown className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Get Pro — ₹1,999</span>
            </Link>
            <Link href="/checkout?plan=starter" className="btn-ghost inline-flex justify-center text-sm px-8 py-3.5">
              Starter — ₹999
            </Link>
          </div>
        </motion.div>
      )}

      {/* Stats row */}
      {hasAccess && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: 'Digital Books', value: '50+', color: 'text-violet-400', bg: 'rgba(139,92,246,0.1)' },
            { icon: Headphones, label: 'Audiobooks', value: isPro ? '20+' : '0', color: 'text-blue-400', bg: 'rgba(59,130,246,0.1)', locked: !isPro },
            { icon: Sparkles, label: 'AI Tools', value: isPro ? '5' : '1', color: 'text-amber-400', bg: 'rgba(245,158,11,0.1)' },
            { icon: Crown, label: 'Your Plan', value: isPro ? 'Pro' : 'Starter', color: isPro ? 'text-violet-400' : 'text-emerald-400', bg: 'rgba(139,92,246,0.1)' },
          ].map(({ icon: Icon, label, value, color, bg, locked }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass rounded-xl p-5 relative">
              {locked && <Lock className="absolute top-3 right-3 w-3.5 h-3.5 text-slate-600" />}
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: bg }}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className={`text-2xl font-black ${color} mb-0.5`}>{value}</div>
              <div className="text-slate-500 text-xs">{label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Books library */}
      {hasAccess && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-400" />
              Your Digital Books
            </h2>
            <span className="text-xs text-slate-600">{products.books.length} books available</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.books.map((book, i) => {
              const locked = book.tier === 'pro' && !isPro
              return (
                <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className={`relative group ${locked ? 'opacity-50' : ''}`}>
                  <div className="relative mb-3 mx-auto w-fit">
                    <BookCover title={book.title} subtitle={book.subtitle} category={book.category} gradient={book.gradient} accentColor={book.accentColor} size="md" tilt={false} index={i} />
                    {locked && (
                      <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-black/50">
                        <Lock className="w-6 h-6 text-white/70" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xs font-bold leading-snug mb-2">{book.title}</p>
                    {locked ? (
                      <Link href="/checkout?plan=pro" className="text-[10px] text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded-full hover:bg-amber-400/10 transition-colors">
                        Upgrade to Pro
                      </Link>
                    ) : (
                      <a
                        href={`/api/download?bookId=${book.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] text-violet-400 hover:text-violet-300 mx-auto transition-colors"
                      >
                        <Download className="w-3 h-3" /> Download PDF
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Audiobooks */}
      {hasAccess && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Headphones className="w-5 h-5 text-blue-400" />
              Audiobooks
              {!isPro && <span className="text-xs text-slate-600 font-normal ml-2">— Pro only</span>}
            </h2>
          </div>
          {isPro ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.audiobooks.map((book, i) => (
                <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className={`glass-hover rounded-xl overflow-hidden card-hover`}>
                  <div className={`h-32 bg-gradient-to-br ${book.gradient} flex items-center justify-center relative`}>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-white font-bold text-xs leading-snug mb-1">{book.title}</p>
                    <p className="text-slate-600 text-[10px] mb-3">{book.duration}</p>
                    <button className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors">
                      <Download className="w-3 h-3" /> Download MP3
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 text-center border border-amber-500/10">
              <Lock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <p className="text-white font-bold mb-2">Audiobooks are Pro only</p>
              <p className="text-slate-500 text-sm mb-5">Upgrade to unlock 20+ premium audiobooks</p>
              <Link href="/checkout?plan=pro" className="btn-primary inline-flex text-sm px-6 py-3">
                <Crown className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Upgrade to Pro — ₹1,999</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Purchase history */}
      {purchases.length > 0 && (
        <section>
          <h2 className="text-xl font-black text-white mb-5">Purchase History</h2>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Plan</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Amount</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Date</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-4 text-white font-semibold capitalize">{p.plan}</td>
                    <td className="px-5 py-4 text-slate-300">₹{(p.amount / 100).toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full capitalize">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
