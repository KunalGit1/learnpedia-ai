import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Active plan check
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    if (profile?.plan !== 'pro') {
      return NextResponse.json({ error: 'Active plan required' }, { status: 403 })
    }

    const { prompt, width = 1024, height = 1024, style } = await req.json()

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Style prefix modifiers
    const styleMap: Record<string, string> = {
      'book-cover':  'premium ebook cover design, professional typography, dark background, ',
      'social':      'social media graphic, bold text layout, vibrant colors, eye-catching, ',
      'thumbnail':   'YouTube thumbnail style, bold dramatic, high contrast, clickbait aesthetic, ',
      'product':     'product mockup, clean white background, professional photography style, ',
      'abstract':    'abstract digital art, flowing gradients, premium aesthetic, ',
      'default':     '',
    }
    const prefix = styleMap[style] || styleMap.default
    const enhancedPrompt = `${prefix}${prompt}, high quality, detailed, 4k`

    const falResponse = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        image_size: { width, height },
        num_inference_steps: 4,
        num_images: 1,
        enable_safety_checker: true,
      }),
    })

    if (!falResponse.ok) {
      const err = await falResponse.text()
      console.error('fal.ai error:', err)
      return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
    }

    const falData = await falResponse.json()
    const imageUrl = falData.images?.[0]?.url

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image returned' }, { status: 500 })
    }

    return NextResponse.json({ imageUrl, prompt: enhancedPrompt })

  } catch (err) {
    console.error('Image API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
