import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const TASK_PROMPTS: Record<string, string> = {
  ebook: `Write a complete, well-structured ebook chapter. Include an engaging introduction, 3-5 main sections with subheadings, actionable tips, bullet points, and a conclusion with key takeaways.`,
  blog: `Write a complete SEO-optimised blog post. Include a compelling hook opening, clear subheadings every 250-300 words, bullet points for scannability, practical examples, and a strong call-to-action at the end.`,
  email: `Write a 5-email nurture sequence. For each email include: Subject line, Preview text, Body (200-250 words), and CTA. Arc: Welcome → Value → Value → Case Study → Offer.`,
  social: `Create a complete social media content pack. Include: 3 LinkedIn posts (150-200 words each), 5 Twitter/X thread starters, and 3 Instagram captions with relevant hashtags.`,
  sales: `Write a complete sales page. Include: Headline + subheadline, Pain points section, Solution introduction, 6 key benefits, FAQ (5 Q&As), and a strong guarantee + CTA.`,
  outline: `Create a detailed content outline. Include: 3 title options, target audience definition, core message, full chapter/section breakdown with subsections, key points per section, and recommended CTAs.`,
}

export async function POST(req: NextRequest) {
  try {
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

    if (!profile || !['starter', 'pro'].includes(profile.plan)) {
      return NextResponse.json({ error: 'Active plan required' }, { status: 403 })
    }

    const { task, topic, audience, tone, length } = await req.json()

    if (!topic?.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    const taskInstruction = TASK_PROMPTS[task] || TASK_PROMPTS.blog
    const maxTokens = length === 'short' ? 600 : length === 'long' ? 2500 : 1400

    const systemPrompt = `You are an expert content writer specialising in digital entrepreneurship, AI tools, and business strategy. Write engaging, actionable, well-structured content in a confident expert voice. Use proper markdown formatting with headings (##, ###), bullet points, and bold text for emphasis.`

    const userPrompt = `${taskInstruction}

Topic: ${topic}
Target Audience: ${audience || 'digital entrepreneurs'}
Tone: ${tone || 'professional'}

Write the complete content now:`

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Groq error:', err)
      return NextResponse.json({ error: 'AI service error' }, { status: 500 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? ''

    return NextResponse.json({
      content,
      wordCount: content.split(/\s+/).length,
      task,
      topic,
    })

  } catch (err) {
    console.error('Write API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
