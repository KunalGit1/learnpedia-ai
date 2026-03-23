import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerSupabaseClient, createServiceClient } from '@/lib/supabase-server'
import products from '@/data/products.json'

export async function GET(request: NextRequest) {
  const bookId = request.nextUrl.searchParams.get('bookId')
  if (!bookId) return NextResponse.json({ error: 'Missing bookId' }, { status: 400 })

  // Find book
  const book = products.books.find((b) => b.id === bookId)
  if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 })

  // Auth check
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Plan check
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan
  if (!plan || plan === 'none') {
    return NextResponse.json({ error: 'No active plan' }, { status: 403 })
  }
  if (book.tier === 'pro' && plan !== 'pro') {
    return NextResponse.json({ error: 'Pro plan required' }, { status: 403 })
  }

  // Generate signed URL (valid 60 seconds — enough for the download to start)
  const service = createServiceClient()
  const { data, error } = await service.storage
    .from('books')
    .createSignedUrl(book.file, 60)

  if (error || !data?.signedUrl) {
    console.error('Storage error:', error)
    return NextResponse.json({ error: 'File unavailable' }, { status: 500 })
  }

  return NextResponse.redirect(data.signedUrl)
}
