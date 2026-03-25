'use client'

import { useState } from 'react'
import { BookOpen, Mail, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        })
        if (error) throw error
        setMessage({ type: 'success', text: 'Check your email to confirm your account!' })
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-6 py-20">
      <div className="orb w-[400px] h-[400px] bg-violet-700/15 -top-20 -left-20" />
      <div className="orb w-[300px] h-[300px] bg-blue-600/10 bottom-0 -right-20" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-lg shadow-violet-900/40">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">
              <span className="text-white">Learn</span>
              <span className="text-gradient">pedia</span>
              <span className="text-violet-400">.ai</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-slate-500 text-sm">
            {mode === 'login' ? 'Sign in to access your library' : 'Join 10,000+ entrepreneurs'}
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 border border-white/8">
          {/* Tab toggle */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-6">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setMessage(null) }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === m
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-surface border border-white/8 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full bg-surface border border-white/8 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors pr-11"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {mode === 'login' && (
                <div className="flex justify-end mt-2">
                  <Link href="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              )}
            </div>

            {/* Message */}
            {message && (
              <div className={`text-sm px-4 py-3 rounded-xl ${
                message.type === 'error'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                  : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              }`}>
                {message.text}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              <span className="relative z-10">{loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              {!loading && <ArrowRight className="w-4 h-4 relative z-10" />}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface px-4 text-xs text-slate-600">or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3.5 glass rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all border border-white/5 hover:border-violet-500/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
            {mode === 'login' ? 'Create an account' : 'Sign in'}
          </button>
        </p>

        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs text-slate-600">
            <Sparkles className="w-3 h-3 text-violet-600" />
            Powered by Learnpedia.ai
          </span>
        </div>
      </div>
    </main>
  )
}
