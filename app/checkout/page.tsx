'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Sparkles, Crown, ArrowRight, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get('plan') as 'starter' | 'pro' | null
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push(`/login?next=/checkout?plan=${plan}`)
        return
      }
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else throw new Error(data.error || 'Failed to create checkout')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (plan === 'starter' || plan === 'pro') handleCheckout()
  }, [plan])

  const planDetails = {
    starter: { name: 'Starter', price: '₹999', icon: Sparkles, color: 'from-slate-600 to-slate-700' },
    pro: { name: 'Pro', price: '₹1,999', icon: Crown, color: 'from-violet-600 to-purple-700' },
  }

  const details = plan ? planDetails[plan] : null

  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {loading ? (
          <>
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${details?.color ?? 'from-violet-600 to-purple-700'} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-white font-black text-2xl mb-2">Preparing checkout...</h2>
            <p className="text-slate-500 text-sm">Redirecting you to secure payment</p>
          </>
        ) : error ? (
          <>
            <h2 className="text-white font-black text-2xl mb-2">Something went wrong</h2>
            <p className="text-red-400 text-sm mb-5">{error}</p>
            <button onClick={handleCheckout} className="btn-primary inline-flex text-sm px-6 py-3">
              <span className="relative z-10">Try Again</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </button>
          </>
        ) : (
          <>
            <h2 className="text-white font-black text-2xl mb-2">Select a plan</h2>
            <div className="flex flex-col gap-3 mt-6">
              {(['starter', 'pro'] as const).map((p) => {
                const { name, price, icon: Icon, color } = planDetails[p]
                return (
                  <button key={p} onClick={() => router.push(`/checkout?plan=${p}`)} className={`flex items-center gap-4 p-5 glass rounded-xl hover:border-violet-500/30 transition-all text-left`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{name}</div>
                      <div className="text-violet-400 font-black">{price}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 ml-auto" />
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
