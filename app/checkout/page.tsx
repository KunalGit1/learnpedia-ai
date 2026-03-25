'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Crown, ArrowRight, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'

function CheckoutContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login?next=/checkout')
        return
      }
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'pro' }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else throw new Error(data.error || 'Failed to create checkout')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  useEffect(() => { handleCheckout() }, [])

  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {loading ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-white font-black text-2xl mb-2">Preparing checkout...</h2>
            <p className="text-slate-500 text-sm">Redirecting you to secure payment</p>
          </>
        ) : error ? (
          <>
            <Crown className="w-10 h-10 text-violet-400 mx-auto mb-4" />
            <h2 className="text-white font-black text-2xl mb-2">Something went wrong</h2>
            <p className="text-red-400 text-sm mb-5">{error}</p>
            <button onClick={handleCheckout} className="btn-primary inline-flex text-sm px-6 py-3">
              <span className="relative z-10">Try Again</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </button>
          </>
        ) : null}
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
