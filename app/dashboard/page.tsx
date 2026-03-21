import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, created_at')
    .eq('id', user.id)
    .single()

  const { data: purchases } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <DashboardClient
        user={{ email: user.email ?? '', id: user.id }}
        profile={profile ?? { plan: 'none', created_at: '' }}
        purchases={purchases ?? []}
      />
      <Footer />
    </main>
  )
}
