import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase-server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { plan, userId, userEmail } = session.metadata ?? {}

    if (!plan) return NextResponse.json({ received: true })

    const supabase = createServiceClient()

    // If user was logged in, record purchase
    if (userId) {
      await supabase.from('purchases').upsert({
        user_id: userId,
        stripe_session_id: session.id,
        plan,
        amount: session.amount_total ?? 0,
        status: 'completed',
      })

      // Update their profile plan (upgrade to pro if applicable)
      const { data: profile } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', userId)
        .single()

      const newPlan = plan === 'pro' ? 'pro' : (profile?.plan === 'pro' ? 'pro' : 'starter')
      await supabase.from('profiles').update({ plan: newPlan }).eq('id', userId)
    } else if (userEmail) {
      // Guest checkout — store by email, user will claim on sign up
      await supabase.from('purchases').upsert({
        stripe_session_id: session.id,
        plan,
        amount: session.amount_total ?? 0,
        status: 'completed',
        user_id: null,
      })
    }
  }

  return NextResponse.json({ received: true })
}
