'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Copy, Check, ArrowLeft, Library } from 'lucide-react'
import Link from 'next/link'

const PROMPTS = [
  // Marketing
  { id: 1, category: 'Marketing', title: 'Cold Email Writer', prompt: 'Write a cold email to a [role] at a [company type] about [your service]. Pain point: [specific problem]. Offer: [your solution + proof]. CTA: 15-min call. Max 120 words. First line must reference something specific about their company.' },
  { id: 2, category: 'Marketing', title: 'Ad Copy Generator', prompt: 'Write 5 Facebook ad variations for [product/service]. Target audience: [describe]. Key benefit: [benefit]. Include: hook (first line stops the scroll), body (agitate the pain), CTA. Format: Short (50 words), Medium (100 words), Long (150 words).' },
  { id: 3, category: 'Marketing', title: 'Email Subject Lines', prompt: 'Generate 20 email subject lines for [topic/offer]. Mix these types: curiosity gap, number list, personal, urgency, question, bold claim. Open rate benchmark: 35%+. No clickbait. Each under 50 characters.' },
  { id: 4, category: 'Marketing', title: 'Brand Voice Guide', prompt: 'Create a brand voice guide for [brand name] in the [industry] space. Target audience: [describe]. Include: tone adjectives (5), words to use, words to avoid, example sentences (do/don\'t), and a 3-sentence brand manifesto.' },
  { id: 5, category: 'Marketing', title: 'Campaign Idea Generator', prompt: 'Generate 10 creative marketing campaign ideas for [product/service] targeting [audience]. Each idea: campaign name, core concept (2 sentences), key channels, expected emotion/reaction from audience. Focus on campaigns executable with a small budget.' },
  { id: 6, category: 'Marketing', title: 'Competitor Analysis', prompt: 'Analyse [competitor name] marketing strategy. Cover: positioning statement, target audience, key messages, content strategy, pricing signals, strengths, weaknesses, and 3 opportunities I can exploit as a competitor.' },

  // Sales
  { id: 7, category: 'Sales', title: 'Sales Page Headline', prompt: 'Write 10 sales page headlines for [product/service]. Target: [audience]. Main benefit: [benefit]. Problem solved: [problem]. Mix formats: question, bold claim, how-to, number, social proof. Make each one impossible to ignore.' },
  { id: 8, category: 'Sales', title: 'Objection Handler', prompt: 'For my [product/service] priced at [price], write responses to these 5 objections: "It\'s too expensive", "I need to think about it", "I don\'t have time", "I\'ll do it myself", "I\'ve tried things like this before". Each response: acknowledge, reframe, evidence, CTA.' },
  { id: 9, category: 'Sales', title: 'Proposal Writer', prompt: 'Write a professional project proposal for [project type] for [client type]. Include: executive summary, problem statement, proposed solution, deliverables (with timeline), investment (use "investment" not "cost"), next steps. Tone: confident, expert, partner (not vendor).' },
  { id: 10, category: 'Sales', title: 'Follow-up Sequence', prompt: 'Write a 5-touch follow-up sequence for a prospect who showed interest but went quiet. Touches: Day 1 (value add), Day 3 (case study), Day 7 (new angle), Day 14 (break-up email), Day 30 (re-engage). Each under 100 words. No desperation.' },
  { id: 11, category: 'Sales', title: 'Discovery Call Script', prompt: 'Create a 30-minute discovery call script for [your service]. Include: opening rapport (2 min), situation questions (5 min), problem questions (10 min), implication questions (5 min), needs-payoff questions (5 min), next steps (3 min). Use SPIN selling framework.' },
  { id: 12, category: 'Sales', title: 'Pricing Justification', prompt: 'Write 3 ways to justify the price of [product/service] at [price] to [target customer]. Method 1: ROI calculation. Method 2: Cost of NOT buying (pain amplification). Method 3: Price-per-day breakdown. Make each feel like an obvious decision.' },

  // Content
  { id: 13, category: 'Content', title: 'Blog Post Builder', prompt: 'Write a 1,200-word blog post about [topic] for [audience]. SEO keyword: [keyword]. Structure: hook story opening, 4 subheadings, bullet points in each section, one expert quote, practical takeaways box, strong CTA. Tone: [tone].' },
  { id: 14, category: 'Content', title: 'LinkedIn Post', prompt: 'Write a LinkedIn post about [topic/insight] for [target audience]. Format: bold hook line, white space between paragraphs (max 3 lines each), 3-5 key points, end with a question to drive comments. 150-250 words. No hashtags in body. Professional but human.' },
  { id: 15, category: 'Content', title: 'YouTube Script', prompt: 'Write a 7-minute YouTube script about [topic]. Structure: hook question (0-15s), problem setup (15-45s), credibility statement (45-60s), main content 3 key points (5 min), recap (30s), CTA (30s). Include [B-ROLL] cues. Conversational, no jargon.' },
  { id: 16, category: 'Content', title: 'Twitter/X Thread', prompt: 'Write a 12-tweet Twitter/X thread about [topic]. Tweet 1: bold hook that promises value. Tweets 2-10: one insight per tweet, max 240 chars each. Tweet 11: summary of key points. Tweet 12: CTA + follow prompt. Use numbers, line breaks, no filler words.' },
  { id: 17, category: 'Content', title: 'Newsletter Issue', prompt: 'Write a weekly newsletter issue about [topic] for [audience]. Sections: subject line + preview text, opening story (100 words), main insight or lesson (300 words), actionable tip of the week (100 words), recommended resource, closing line. Conversational, like emailing a friend.' },
  { id: 18, category: 'Content', title: 'Podcast Episode Outline', prompt: 'Create a podcast episode outline for [topic]. Episode length: [X] minutes. Include: episode title (5 options), hook/teaser for intro, 4 main talking points with sub-points, 3 thought-provoking questions, key takeaways listeners should remember, outro CTA.' },

  // Business Strategy
  { id: 19, category: 'Strategy', title: 'Business Plan Outline', prompt: 'Create a lean business plan for [business idea]. Include: problem statement, solution, target market (TAM/SAM/SOM), unique value proposition, revenue model, go-to-market strategy, key metrics to track, 90-day action plan, and biggest risks with mitigation.' },
  { id: 20, category: 'Strategy', title: 'SWOT Analysis', prompt: 'Conduct a detailed SWOT analysis for [business/product] in the [industry]. For each quadrant (Strengths, Weaknesses, Opportunities, Threats), provide 5 specific, actionable points. Then suggest 3 strategic priorities based on the analysis.' },
  { id: 21, category: 'Strategy', title: 'Pricing Strategy', prompt: 'Develop a pricing strategy for [product/service]. Consider: cost-plus pricing, value-based pricing, competitive pricing, and psychological pricing. Recommend the best approach for [target market] with justification. Include 3 pricing tier options with names and feature breakdowns.' },
  { id: 22, category: 'Strategy', title: 'Go-To-Market Plan', prompt: 'Write a 90-day go-to-market plan for [product/service] targeting [audience]. Month 1: foundation and early adopters. Month 2: traction and feedback loop. Month 3: scale what works. Include specific tactics, channels, weekly goals, and success metrics for each month.' },
  { id: 23, category: 'Strategy', title: 'OKR Builder', prompt: 'Create a quarterly OKR framework for [company/team] focused on [goal area]. Provide 3 Objectives, each with 3-4 measurable Key Results. Key Results should be: specific, time-bound, measurable (include numbers), and ambitious but achievable. Add a confidence score (1-10) for each.' },
  { id: 24, category: 'Strategy', title: 'Risk Assessment', prompt: 'Identify and assess the top 10 risks for [project/business] in [context]. For each risk: description, probability (H/M/L), impact (H/M/L), risk score, early warning signs, and mitigation strategy. Prioritise by risk score. Include one "black swan" scenario.' },

  // Productivity
  { id: 25, category: 'Productivity', title: 'Daily Priority Setter', prompt: 'I have [X hours] of focused work today. My top 3 goals this week are: [list]. Current energy level: [high/medium/low]. Pending items: [list]. Create a time-blocked schedule for today, flag any tasks to defer, and identify the ONE thing that would make today a success.' },
  { id: 26, category: 'Productivity', title: 'Meeting Agenda Creator', prompt: 'Create a [X]-minute meeting agenda for [meeting purpose] with [attendees/roles]. Decision needed: [decision]. Format each item with: time allocation, owner, desired outcome. Include 5 minutes for questions. End with clear action items template.' },
  { id: 27, category: 'Productivity', title: 'Project Kickoff Plan', prompt: 'Create a project kickoff plan for [project]. Timeline: [duration]. Team: [roles]. Budget: [amount]. Deliverable: [outcome]. Include: project charter, RACI matrix, milestone timeline, communication plan, definition of done, and first-week action items.' },
  { id: 28, category: 'Productivity', title: 'SOP Writer', prompt: 'Write a Standard Operating Procedure for [process/task]. Include: purpose, scope, who is responsible, step-by-step instructions (numbered), decision points (if/then), common mistakes to avoid, quality checks, and what success looks like. Suitable for a new team member.' },
  { id: 29, category: 'Productivity', title: 'Weekly Review Template', prompt: 'Guide me through a 20-minute weekly review. Sections: (1) What did I complete this week? (2) What did I not finish and why? (3) What surprised me? (4) What am I grateful for? (5) Top 3 priorities for next week. (6) One habit to improve. Generate reflection questions for each section.' },
  { id: 30, category: 'Productivity', title: 'Delegation Framework', prompt: 'I need to delegate [task/project] to [person/role]. Create a delegation brief including: task description, expected outcome, constraints (budget/time/quality), resources available, checkpoints, how to handle blockers, and success criteria. Make it clear enough that I don\'t need to explain twice.' },

  // AI & Tech
  { id: 31, category: 'AI & Tech', title: 'ChatGPT Prompt Improver', prompt: 'Here is my prompt: [paste prompt]. Improve it by: adding more context, specifying the output format, defining the audience, setting the tone, adding constraints, and including an example of what good output looks like. Give me the improved version and explain what you changed.' },
  { id: 32, category: 'AI & Tech', title: 'AI Tool Evaluator', prompt: 'Evaluate [AI tool name] for use case: [your use case]. Assess: accuracy for my use case, ease of use, pricing vs value, API availability, privacy/data handling, integrations, limitations, alternatives. Give a final recommendation: Use it / Try the free tier / Skip it.' },
  { id: 33, category: 'AI & Tech', title: 'Automation Workflow Designer', prompt: 'Design an automation workflow for [business process]. Current manual steps: [list]. Tools available: [list]. Goal: save [X hours/week]. Map out: trigger, steps/actions, conditions/filters, error handling, notifications. Include a Make.com or Zapier implementation suggestion.' },
  { id: 34, category: 'AI & Tech', title: 'Tech Stack Advisor', prompt: 'Recommend a tech stack for [project type] with these requirements: [list requirements]. Budget: [budget]. Team size: [size]. Timeline: [timeline]. Prioritise: speed to market, scalability, cost, developer experience. Compare 2 options with pros/cons and give a final recommendation.' },
  { id: 35, category: 'AI & Tech', title: 'Data Analysis Prompt', prompt: 'Analyse this data: [paste data]. Tell me: key trends, anomalies, what is performing best/worst, what is surprising, and what actions I should take based on this data. Format as an executive summary with bullet points. Use plain language, no jargon.' },
  { id: 36, category: 'AI & Tech', title: 'Code Explainer', prompt: 'Explain this code to me as if I\'m a smart non-programmer: [paste code]. Cover: what it does in plain English, why each major section exists, any potential issues or security concerns, and how I would modify it to [specific change I want].' },

  // Personal Brand
  { id: 37, category: 'Personal Brand', title: 'LinkedIn Bio Rewriter', prompt: 'Rewrite my LinkedIn headline and About section. Current headline: [paste]. Current about: [paste]. My target audience: [who I want to attract]. My goal: [what I want them to do]. Make it: specific, benefit-focused, personality-driven, and end with a clear CTA.' },
  { id: 38, category: 'Personal Brand', title: 'Content Pillar Builder', prompt: 'Help me build 5 content pillars for my personal brand as a [your role/expertise] targeting [audience]. For each pillar: pillar name, why it matters to my audience, 5 content ideas, best format (video/post/article), and how it relates to my business goals.' },
  { id: 39, category: 'Personal Brand', title: 'Thought Leadership Post', prompt: 'Write a thought leadership post about [contrarian or unique take on industry topic]. My position: [your view]. Format: provocative opening statement, 3 supporting arguments with evidence, acknowledgement of the opposing view, why I still hold my position, call to discussion. 300 words.' },
  { id: 40, category: 'Personal Brand', title: 'Speaking Bio', prompt: 'Write a professional speaking bio for [your name] for use at [event type]. Length: short (50 words) and long (150 words) versions. Include: current role, key achievements (with numbers), unique angle/expertise, why this audience should listen to you. Third-person voice.' },

  // Customer Success
  { id: 41, category: 'Customer Success', title: 'Onboarding Email Sequence', prompt: 'Write a 5-email onboarding sequence for new customers of [product/service]. Day 0: Welcome + quick win. Day 2: Feature highlight + tip. Day 5: Success story + social proof. Day 10: Check-in + offer help. Day 20: Advanced tip + upsell/referral ask. Each email: 150 words max, one CTA.' },
  { id: 42, category: 'Customer Success', title: 'FAQ Page Writer', prompt: 'Write FAQ content for [product/service]. Generate 15 questions your [target customer] actually asks before buying. For each: natural question phrasing, direct answer (50-100 words), and any relevant link or CTA. Organise into 3 categories: Pre-purchase, During use, Billing/Refunds.' },
  { id: 43, category: 'Customer Success', title: 'Complaint Response', prompt: 'A customer sent this complaint: [paste complaint]. Write a response that: acknowledges their frustration (without admitting fault prematurely), shows empathy, explains what happened (if appropriate), states what you will do to fix it, and turns this into a positive experience. Max 150 words.' },
  { id: 44, category: 'Customer Success', title: 'Review Request Email', prompt: 'Write an email asking [customer type] for a review/testimonial after [milestone/purchase]. Make it: personal (not templated-sounding), specific about what to review, low friction (tell them exactly where to leave it), and include 3 optional prompts they can answer to make writing easier.' },

  // Finance & Operations
  { id: 45, category: 'Finance', title: 'Invoice Email Writer', prompt: 'Write a professional invoice reminder email for a payment that is [X days] overdue. Amount: [amount]. Client: [type]. Tone: firm but not aggressive. Include: friendly reminder of the original invoice, clear payment details, a deadline, and consequence of further delay. Keep it under 100 words.' },
  { id: 46, category: 'Finance', title: 'Budget Planner Prompt', prompt: 'Help me create a monthly budget for my [business type]. Monthly revenue: [amount]. Known fixed costs: [list]. Variable costs: [list]. Goals: [e.g. save X, invest X]. Categorise all expenses, identify areas to cut, calculate profit margin, and suggest a percentage-based allocation framework.' },
  { id: 47, category: 'Finance', title: 'Contract Review Checklist', prompt: 'Review this contract and identify: (1) clauses that unfairly favour the other party, (2) missing standard protections for me, (3) ambiguous language that could be interpreted against me, (4) red flags I should negotiate, (5) missing clauses I should request. Contract: [paste text].' },
  { id: 48, category: 'Finance', title: 'Financial Report Summary', prompt: 'Summarise this financial data for a non-finance executive audience: [paste data]. Cover: key performance vs last period, top 3 positive trends, top 3 concerns, cash position, and 3 recommended actions. Use plain language. Format as a half-page brief with bullet points.' },

  // Mindset & Growth
  { id: 49, category: 'Mindset', title: 'Goal Setting Framework', prompt: 'Help me set meaningful goals for [time period]. My current situation: [describe]. What I want to achieve: [describe]. Values: [list]. Constraints: [time/money/energy]. Create: 1 north star goal, 3 supporting goals, weekly habits to build, metrics to track, and a review cadence.' },
  { id: 50, category: 'Mindset', title: 'Decision Making Framework', prompt: 'I need to decide whether to [describe decision]. Stakes: [high/medium/low]. Timeline: [when I must decide]. Options: [list options]. Help me: clarify what I\'m actually deciding, identify my real constraints, apply a decision framework, stress-test my assumptions, and make the call with confidence.' },
]

const CATEGORIES = ['All', ...Array.from(new Set(PROMPTS.map(p => p.category)))]

export default function PromptsPage() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [copied,   setCopied]   = useState<number | null>(null)

  const filtered = useMemo(() => PROMPTS.filter(p => {
    const matchCat = category === 'All' || p.category === category
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.prompt.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  }), [search, category])

  const copy = (p: typeof PROMPTS[0]) => {
    navigator.clipboard.writeText(p.prompt)
    setCopied(p.id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-500 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Library className="w-5 h-5 text-cyan-400" />
              AI Prompt Library
            </h1>
            <p className="text-slate-500 text-sm">{PROMPTS.length} battle-tested prompts · Click to copy</p>
          </div>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search prompts..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                  category === cat
                    ? 'border-cyan-500 bg-cyan-500/15 text-cyan-300'
                    : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-slate-600 text-xs mb-4">{filtered.length} prompts</p>

        {/* Prompts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
              className="glass rounded-xl p-4 hover:border-white/15 border border-white/5 transition-all group">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] text-cyan-400 font-medium uppercase tracking-wide">{p.category}</span>
                  <h3 className="text-white font-bold text-sm">{p.title}</h3>
                </div>
                <button onClick={() => copy(p)}
                  className="flex-shrink-0 flex items-center gap-1 text-[10px] text-slate-500 hover:text-white border border-white/10 hover:border-white/25 px-2.5 py-1.5 rounded-lg transition-all">
                  {copied === p.id
                    ? <><Check className="w-3 h-3 text-emerald-400" /> Copied!</>
                    : <><Copy className="w-3 h-3" /> Copy</>
                  }
                </button>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                {p.prompt}
              </p>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-600">
            <Library className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No prompts found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
