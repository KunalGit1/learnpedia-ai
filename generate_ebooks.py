"""
Learnpedia.ai -- Ebook PDF Generator
Run: pip install fpdf2 && python generate_ebooks.py
Outputs 5 PDFs in ./ebooks/
"""

from fpdf import FPDF
from fpdf.enums import XPos, YPos
from pathlib import Path

OUT = Path("ebooks")
OUT.mkdir(exist_ok=True)

DARK   = (15, 15, 35)
PURPLE = (139, 92, 246)
CYAN   = (6, 182, 212)
WHITE  = (255, 255, 255)
GRAY   = (160, 160, 180)


class Book(FPDF):
    def __init__(self, title, subtitle):
        super().__init__()
        self.btitle = title
        self.bsub   = subtitle
        self.set_margins(22, 22, 22)
        self.set_auto_page_break(True, 28)

    def _font(self, size, bold=False):
        self.set_font("Helvetica", "B" if bold else "", size)

    def _rgb(self, rgb):
        self.set_text_color(*rgb)

    def footer(self):
        self.set_y(-14)
        self._font(8)
        self._rgb(GRAY)
        self.cell(0, 5, f"{self.btitle}  |  learnpedia.ai  |  Page {self.page_no()}",
                  align="C")

    # ── cover ────────────────────────────────────────────────
    def cover(self):
        self.add_page()
        self.set_fill_color(*DARK)
        self.rect(0, 0, 210, 297, "F")

        self.set_fill_color(*PURPLE)
        self.rect(0, 0, 210, 6, "F")
        self.set_fill_color(*CYAN)
        self.rect(0, 291, 210, 6, "F")

        # decorative circles
        self.set_fill_color(30, 20, 60)
        self.ellipse(130, 50, 110, 110, "F")
        self.set_fill_color(20, 15, 45)
        self.ellipse(145, 65, 80, 80, "F")

        self.set_y(35)
        self._font(12, bold=True)
        self._rgb(PURPLE)
        self.cell(0, 8, "LEARNPEDIA.AI", align="C",
                  new_x=XPos.LMARGIN, new_y=YPos.NEXT)

        self.ln(15)
        self._font(26, bold=True)
        self._rgb(WHITE)
        self.multi_cell(0, 11, self.btitle, align="C")

        self.ln(6)
        self._font(12)
        self._rgb(GRAY)
        self.multi_cell(0, 7, self.bsub, align="C")

        self.ln(12)
        self.set_fill_color(*PURPLE)
        self.rect(55, self.get_y(), 100, 2, "F")
        self.ln(14)

        self._font(9)
        self._rgb(GRAY)
        self.cell(0, 5, "Learnpedia.ai  |  2025 Edition", align="C")

    # ── table of contents ────────────────────────────────────
    def toc(self, chapters):
        self.add_page()
        self._font(18, bold=True)
        self._rgb(DARK)
        self.set_x(self.l_margin)
        self.cell(0, 10, "Table of Contents",
                  new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_fill_color(*PURPLE)
        self.rect(22, self.get_y() + 2, 55, 2, "F")
        self.ln(12)
        for num, title in chapters:
            self._font(11)
            self._rgb(DARK)
            self.set_x(self.l_margin)
            self.multi_cell(166, 9, f"{num}.  {title}")
        self.ln(4)

    # ── chapter heading ──────────────────────────────────────
    def chapter(self, num, title):
        self.add_page()
        self.set_fill_color(*PURPLE)
        self.rect(22, 22, 34, 10, "F")
        self._font(9, bold=True)
        self._rgb(WHITE)
        self.set_xy(22, 22)
        self.cell(34, 10, f"CHAPTER {num}", align="C",
                  new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(4)
        self._font(19, bold=True)
        self._rgb(DARK)
        self.multi_cell(0, 9, title)
        self.set_fill_color(*CYAN)
        self.rect(22, self.get_y() + 2, 65, 2, "F")
        self.ln(12)

    # ── section heading ──────────────────────────────────────
    def section(self, title):
        self.ln(5)
        self._font(13, bold=True)
        self._rgb(PURPLE)
        self.multi_cell(0, 7, title)
        self.ln(2)

    # ── paragraph ────────────────────────────────────────────
    def para(self, text):
        self._font(11)
        self._rgb(DARK)
        self.multi_cell(0, 6, text)
        self.ln(5)

    # ── bullet ───────────────────────────────────────────────
    def bullet(self, text):
        self._font(11)
        self._rgb(DARK)
        x = self.get_x()
        self.set_x(27)
        self.cell(6, 6, "-", new_x=XPos.RIGHT, new_y=YPos.TOP)
        self.multi_cell(0, 6, text)
        self.ln(1)

    # ── callout box ──────────────────────────────────────────
    def callout(self, label, text):
        self.ln(4)
        self.set_fill_color(225, 215, 255)
        y0 = self.get_y()
        self.rect(20, y0, 170, 4, "F")  # placeholder, overdrawn below

        # measure height by writing first
        self._font(10, bold=True)
        self._rgb(PURPLE)
        self.set_x(24)
        self.multi_cell(0, 7, label)
        self._font(10)
        self._rgb((50, 30, 90))
        self.set_x(24)
        self.multi_cell(0, 6, text)
        y1 = self.get_y()

        # draw background rect
        self.set_fill_color(230, 220, 255)
        self.rect(20, y0 - 1, 170, y1 - y0 + 4, "F")

        # redraw text on top
        self._font(10, bold=True)
        self._rgb(PURPLE)
        self.set_xy(24, y0)
        self.multi_cell(0, 7, label)
        self._font(10)
        self._rgb((50, 30, 90))
        self.set_x(24)
        self.multi_cell(0, 6, text)
        self.ln(6)


# =============================================================
# EBOOK 1
# =============================================================
def ebook1():
    pdf = Book("The AI Productivity Bible",
               "50 Power Prompts to 10x Your Work in 2025")
    pdf.cover()
    pdf.toc([
        ("01", "Why AI Changes Everything About Productivity"),
        ("02", "Morning Power Routines with AI"),
        ("03", "Deep Work & Focus - AI as Your Co-Pilot"),
        ("04", "Email, Meetings & Communication"),
        ("05", "Content Creation at Lightning Speed"),
        ("06", "Research & Learning 10x Faster"),
        ("07", "Project Management & Planning"),
        ("08", "The 50 Power Prompts - Master List"),
    ])

    pdf.chapter(1, "Why AI Changes Everything About Productivity")
    pdf.para("We are living through the most significant shift in how humans work since the invention of the computer. AI has made it possible for a single person to produce the output of an entire team.")
    pdf.para("This ebook is not about theory. It is a practical, battle-tested guide with 50 prompts you can copy, paste, and use today to reclaim hours of your day and produce higher-quality work.")
    pdf.callout("Key Insight", "A prompt is a skill. The better your prompts, the better your output. This book teaches you to think in prompts.")
    pdf.section("The Productivity Multiplier Effect")
    pdf.para("Traditional productivity advice focuses on doing things faster. AI productivity is about deciding what not to do yourself. Delegation used to require people. Now it requires only a well-crafted prompt.")
    pdf.para("Research from MIT found that workers using AI assistants completed tasks 55% faster and with 18% higher quality ratings. The gap between AI-native workers and traditional workers will only grow.")
    pdf.bullet("AI does not replace judgment - it amplifies it")
    pdf.bullet("The best users treat AI as a brilliant, tireless junior colleague")
    pdf.bullet("Context is everything - more context = better output")
    pdf.bullet("Iteration beats perfection on the first prompt")

    pdf.chapter(2, "Morning Power Routines with AI")
    pdf.section("The 15-Minute AI Morning Stack")
    pdf.para("The first 30 minutes of your workday set the trajectory for everything that follows. Here is a battle-tested AI morning routine that top performers use.")
    pdf.callout("Prompt #1 - Daily Priority Setter", 'I have [X hours] of deep work today. My three most important goals this week are [list]. My energy is [high/medium/low]. Give me a prioritized task list for today with time blocks, and flag anything I should defer.')
    pdf.callout("Prompt #2 - Email Triage", 'Here are my unread emails [paste]. Categorize them as: (1) Needs reply today, (2) Can wait 48h, (3) FYI only, (4) Can delete. For each in category 1, draft a 3-sentence reply.')
    pdf.callout("Prompt #3 - Meeting Prep", 'I have a meeting about [topic] with [attendees/roles] in 20 minutes. Generate 5 smart questions I should ask, 3 points I should make, and 2 potential objections I should prepare for.')
    pdf.section("Building the Habit")
    pdf.para("Run these three prompts every morning for 30 days and you will never go back. Most people report saving 45 to 90 minutes per day within the first week.")

    pdf.chapter(3, "Deep Work & Focus - AI as Your Co-Pilot")
    pdf.section("The Problem with Modern Work")
    pdf.para("Knowledge workers switch tasks an average of every 3 minutes. Each switch costs 23 minutes of recovery time. AI can help you stay in flow by handling the context-switching burden.")
    pdf.callout("Prompt #4 - Focus Mode Activator", 'I need to write a [document type] about [topic]. Before I start, give me: (1) The three most important points to make, (2) A simple outline, (3) The one thing I must NOT forget to include.')
    pdf.callout("Prompt #5 - Writer\'s Block Breaker", 'I\'m writing about [topic] and I\'m stuck after this paragraph: [paste]. Give me 5 different ways to continue, ranging from analytical to storytelling approaches.')
    pdf.callout("Prompt #6 - Rubber Duck Debug", 'I\'m trying to solve [problem]. Here is what I know: [context]. Here is where I\'m stuck: [specific issue]. Ask me 5 clarifying questions that will help me think through this more clearly.')
    pdf.section("Deep Work Sprints")
    pdf.para("Use 90-minute sprints. At the start of each, use Prompt #4. At the end, use AI to summarise what you accomplished and what needs to happen next.")

    pdf.chapter(4, "Email, Meetings & Communication")
    pdf.section("The Email Tax")
    pdf.para("The average professional spends 2.6 hours per day on email. That is 650 hours per year. AI can cut this to 45 minutes without sacrificing quality.")
    pdf.callout("Prompt #7 - Email Writer", 'Write a professional email to [recipient/role] about [topic]. Tone: [formal/friendly/assertive]. Key points: [list]. Keep it under 150 words. End with a clear call to action.')
    pdf.callout("Prompt #8 - Difficult Message", 'I need to tell [person] that [difficult message]. I want to be honest but not damage the relationship. Draft 3 versions: direct, diplomatic, and empathetic.')
    pdf.callout("Prompt #9 - Meeting Agenda", 'Create a 45-minute meeting agenda for [purpose]. Attendees: [roles]. Decision needed: [decision]. Format: time blocks with owner and expected outcome for each item.')
    pdf.callout("Prompt #10 - Meeting Summary", 'Here are my rough notes from a meeting: [paste notes]. Convert into: (1) Key decisions made, (2) Action items with owners, (3) Open questions, (4) A 3-sentence executive summary.')

    pdf.chapter(5, "Content Creation at Lightning Speed")
    pdf.section("Content is the New Currency")
    pdf.para("Whether you are building a personal brand, running a business, or creating marketing materials, AI makes it possible for one person to produce what previously required a full content team.")
    pdf.callout("Prompt #11 - Blog Post in 5 Minutes", 'Write a 1000-word blog post about [topic] for [target audience]. Use a hook opening, subheadings every 250 words, one personal story, practical tips, and end with a strong CTA. SEO keyword: [keyword].')
    pdf.callout("Prompt #12 - Social Media Pack", 'From this blog post: [paste], create: (1) LinkedIn post 200 words, (2) Twitter thread 8 tweets, (3) Instagram caption with hashtags, (4) YouTube video description.')
    pdf.callout("Prompt #13 - Video Script", 'Write a 5-minute YouTube script about [topic]. Format: hook (30s), problem setup (60s), 3 main points (3 min), action step (30s). Conversational tone, no jargon.')
    pdf.bullet("Always ask AI for 3 headline options - pick the best")
    pdf.bullet("Use AI for drafts, add your personal voice in editing")
    pdf.bullet("Repurpose one piece of content into 5+ formats")
    pdf.bullet("Build a prompt library of your best content prompts")

    pdf.chapter(6, "Research & Learning 10x Faster")
    pdf.callout("Prompt #14 - Rapid Research Brief", 'Give me a comprehensive briefing on [topic] as if I have no prior knowledge but am an intelligent professional. Cover: key concepts, current state, major players, controversies, and what I should read next.')
    pdf.callout("Prompt #15 - Feynman Explainer", 'Explain [complex topic] using the Feynman technique - as if explaining to a smart 12-year-old. Then explain it again for an expert audience. Show me where the real complexity lies.')
    pdf.callout("Prompt #16 - Book Summary Engine", 'Summarize the key ideas from [book title] by [author]. Give me: (1) The core thesis, (2) 5 actionable insights, (3) The most counter-intuitive idea, (4) One quote that captures the essence.')

    pdf.chapter(7, "Project Management & Planning")
    pdf.callout("Prompt #17 - Project Kickoff", 'I\'m starting a project to [goal]. Timeline: [weeks]. Team: [roles]. Budget: [amount]. Create a project plan with phases, milestones, risks, and a RACI matrix.')
    pdf.callout("Prompt #18 - Risk Radar", 'Here is my project plan: [paste]. Identify the top 10 risks I have not thought of. For each: likelihood (H/M/L), impact (H/M/L), and a mitigation strategy.')
    pdf.callout("Prompt #19 - Stakeholder Update", 'Write a weekly project update email. Status: [on track/at risk/delayed]. Key wins: [list]. Blockers: [list]. Next week focus: [list]. Audience: non-technical executives. Under 200 words.')

    pdf.chapter(8, "The 50 Power Prompts - Master List")
    pdf.section("Quick Reference by Category")
    categories = [
        ("PLANNING", ["Daily Priority Setter", "Weekly Review", "Goal Decomposer", "Decision Matrix", "Project Kickoff", "Risk Radar", "Meeting Agenda", "OKR Builder"]),
        ("COMMUNICATION", ["Email Writer", "Difficult Message", "Stakeholder Update", "Negotiation Prep", "Feedback Giver", "Conflict Resolver", "Pitch Narrative", "Executive Summary"]),
        ("CONTENT", ["Blog Post Builder", "Social Media Pack", "Video Script", "Newsletter Writer", "Case Study Creator", "Product Description", "Ad Copy Generator", "SEO Brief"]),
        ("LEARNING", ["Rapid Research Brief", "Feynman Explainer", "Book Summary Engine", "Interview Prep", "Course Outline", "Mental Model Finder", "Counter-Argument Builder", "Analogy Creator"]),
        ("FOCUS & THINKING", ["Focus Mode Activator", "Writer's Block Breaker", "Rubber Duck Debug", "Second Brain Organiser", "Brainstorm Sprint", "Devil's Advocate", "Assumption Buster", "Framework Selector"]),
        ("PERSONAL GROWTH", ["Morning Routine Designer", "Habit Stack Builder", "Career Path Mapper", "Skills Gap Analysis", "Performance Review", "Personal Brand Audit", "Network Strategy", "Life Vision Builder"]),
    ]
    for cat, items in categories:
        pdf.section(cat)
        for item in items:
            pdf.bullet(item)
    pdf.callout("Final Thought", "These 50 prompts are starting points. The real power comes from customising them to your specific context, industry, and voice. Your prompt library is a competitive advantage.")

    pdf.output(OUT / "01_AI_Productivity_Bible.pdf")
    print("  Done: 01_AI_Productivity_Bible.pdf")


# =============================================================
# EBOOK 2
# =============================================================
def ebook2():
    pdf = Book("Make Money with AI in 2025",
               "The Complete Playbook for AI-Powered Income Streams")
    pdf.cover()
    pdf.toc([
        ("01", "The AI Economy - Why Now Is the Best Time"),
        ("02", "Freelancing with AI - 5x Your Rates"),
        ("03", "Selling Digital Products with AI"),
        ("04", "AI Content Agencies - The New Business Model"),
        ("05", "Passive Income with AI Automation"),
        ("06", "The 30-Day First Rs.1 Lakh Challenge"),
    ])

    pdf.chapter(1, "The AI Economy - Why Now Is the Best Time")
    pdf.para("We are at an inflection point. The tools that used to require a team of 10 now require one person and the right prompts. This gap between what AI-native entrepreneurs can produce and what traditional businesses expect to pay for is where the money is.")
    pdf.para("The Indian digital economy is growing at 40% year-on-year. Businesses are desperately searching for people who understand AI. They do not need you to be an engineer. They need you to understand what AI can do and help them use it.")
    pdf.callout("Market Reality", "Upwork reports AI-related freelance jobs grew 400% in 2024. The average AI-skilled freelancer earns 3x more than a non-AI freelancer for the same work.")
    pdf.section("The 6 AI Income Streams")
    for s in ["AI Freelancing (immediate cash)", "Digital Products (passive income)", "AI Content Agency (scalable)", "AI Consulting (high ticket)", "Automation Services (recurring)", "AI Education and Courses (leverage)"]:
        pdf.bullet(s)

    pdf.chapter(2, "Freelancing with AI - 5x Your Rates")
    pdf.section("The AI Freelancer Advantage")
    pdf.para("Traditional freelancers trade time for money. AI freelancers trade expertise for money and use AI to do the time-consuming parts. A copywriter who takes 4 hours per article now takes 45 minutes and delivers higher quality.")
    pdf.section("Highest Paying AI Freelance Services in 2025")
    pdf.bullet("AI Prompt Engineering - Rs.5,000 to Rs.15,000 per project")
    pdf.bullet("AI Content Writing - Rs.3,000 to Rs.8,000 per article")
    pdf.bullet("AI Video Scripts + Voiceover - Rs.8,000 to Rs.25,000 per video")
    pdf.bullet("AI Chatbot Setup - Rs.20,000 to Rs.80,000 per project")
    pdf.bullet("AI Social Media Management - Rs.15,000 to Rs.40,000 per month")
    pdf.bullet("AI Marketing Campaigns - Rs.25,000 to Rs.1,00,000 per campaign")
    pdf.section("How to Land Your First Client in 7 Days")
    pdf.bullet("Day 1: Set up profiles on Upwork, Fiverr, and LinkedIn")
    pdf.bullet("Day 2: Write 3 niche-specific service descriptions")
    pdf.bullet("Day 3: Create 3 portfolio samples using AI tools")
    pdf.bullet("Day 4: Send 20 cold messages to local businesses")
    pdf.bullet("Day 5: Follow up and offer a free audit")
    pdf.bullet("Day 6-7: Close your first paid project")

    pdf.chapter(3, "Selling Digital Products with AI")
    pdf.section("Why Digital Products Are the Perfect AI Business")
    pdf.para("Create once. Sell forever. No inventory. No shipping. No customer service calls at 2am. Digital products are the ideal vehicle for AI-generated content because the creation cost is near-zero and the margin is near-100 percent.")
    pdf.section("Best-Selling Digital Product Types")
    for p in ["Ebooks and Guides", "Prompt packs and templates", "Notion dashboards and systems", "Canva design templates", "Online mini-courses (3-5 videos)", "AI tool tutorial bundles", "Swipe files and copywriting vaults", "Business plan templates"]:
        pdf.bullet(p)
    pdf.callout("Case Study", "A solopreneur created a ChatGPT Prompts for Real Estate ebook in 2 days using AI tools. Priced at $27. Sold 800 copies in 3 months = $21,600 with zero marginal cost.")

    pdf.chapter(4, "AI Content Agencies - The New Business Model")
    pdf.section("The 1-Person Agency Model")
    pdf.para("Agencies used to require teams. With AI, one person can manage 8-12 clients, delivering content that used to require a team of 5. This is the fastest path to Rs.1,00,000+ per month in India today.")
    pdf.callout("Service Stack for a Solo AI Agency", "Social media (4 posts/week) + 2 blog posts/month + 1 email newsletter/week + monthly strategy call = Rs.25,000 to Rs.40,000 per month per client. With 5 clients = Rs.1.25 to 2 lakh/month.")

    pdf.chapter(5, "Passive Income with AI Automation")
    pdf.section("Set It and Earn")
    pdf.para("AI makes passive income more achievable than ever through automated content pipelines, digital product stores, and AI-powered affiliate marketing.")
    pdf.bullet("YouTube automation: AI scripts + AI voiceover + AI thumbnails")
    pdf.bullet("Automated email sequences that sell your products 24/7")
    pdf.bullet("AI-written SEO blogs that rank and drive affiliate revenue")
    pdf.bullet("Automated social media posting across all platforms")

    pdf.chapter(6, "The 30-Day First Rs.1 Lakh Challenge")
    pdf.section("Week 1 - Foundation")
    pdf.bullet("Choose ONE service or product")
    pdf.bullet("Build your profile and portfolio (3 samples minimum)")
    pdf.bullet("Set your pricing (start 30% below market, raise fast)")
    pdf.section("Week 2 - Outreach")
    pdf.bullet("Send 50 personalised outreach messages")
    pdf.bullet("Offer 2 clients a free trial project")
    pdf.bullet("Collect testimonials immediately")
    pdf.section("Week 3 - First Paid Projects")
    pdf.bullet("Convert 2-3 trials to paid")
    pdf.bullet("Deliver exceptional work (AI makes this easy)")
    pdf.bullet("Ask for referrals")
    pdf.section("Week 4 - Scale")
    pdf.bullet("Raise your rates by 50%")
    pdf.bullet("Systematise your service with AI workflows")
    pdf.bullet("Launch your first digital product")
    pdf.callout("Reality Check", "Rs.1 lakh in 30 days is achievable but not guaranteed. The people who hit it take consistent daily action. The framework works. Your execution determines the result.")

    pdf.output(OUT / "02_Make_Money_with_AI.pdf")
    print("  Done: 02_Make_Money_with_AI.pdf")


# =============================================================
# EBOOK 3
# =============================================================
def ebook3():
    pdf = Book("AI Tools Masterclass 2025",
               "The Complete Guide to Claude, Midjourney, Suno, Runway & More")
    pdf.cover()
    pdf.toc([
        ("01", "The AI Tools Landscape - A Map"),
        ("02", "Claude & ChatGPT - The Thinking Tools"),
        ("03", "Midjourney & FLUX - Visual Creation"),
        ("04", "Runway, Kling & Suno - Video & Audio"),
        ("05", "Automation Tools - Make.com & Zapier"),
        ("06", "Building Your Personal AI Stack"),
    ])

    pdf.chapter(1, "The AI Tools Landscape - A Map")
    pdf.para("The AI tools landscape in 2025 is vast, fast-moving, and overwhelming for newcomers. This masterclass cuts through the noise and gives you exactly what you need to know about the most impactful tools available right now.")
    pdf.section("The 6 Categories of AI Tools")
    pdf.bullet("Text & Reasoning: Claude, ChatGPT, Gemini, Perplexity")
    pdf.bullet("Image Generation: Midjourney, FLUX, DALL-E 3, Stable Diffusion")
    pdf.bullet("Video Generation: Runway, Kling, Sora, Pika")
    pdf.bullet("Audio & Music: Suno, ElevenLabs, Murf, Adobe Podcast")
    pdf.bullet("Automation: Make.com, Zapier, n8n, Activepieces")
    pdf.bullet("Productivity: Notion AI, Gamma, Otter.ai, Fireflies")

    pdf.chapter(2, "Claude & ChatGPT - The Thinking Tools")
    pdf.section("When to Use Claude vs ChatGPT")
    pdf.para("Both are excellent but have distinct personalities. Claude excels at nuanced writing, long documents, and careful reasoning. ChatGPT excels at coding, structured outputs, and tool use via plugins.")
    pdf.callout("Claude Best For", "Long-form writing, analysis, summarisation of documents, following complex instructions with many constraints, thoughtful and nuanced responses.")
    pdf.callout("ChatGPT Best For", "Coding assistance, structured data extraction, image analysis, web browsing tasks, integration with third-party tools via plugins.")
    pdf.section("Power User Tips - Claude")
    pdf.bullet("Always provide rich context - Claude uses every detail you give")
    pdf.bullet("Use XML tags to structure complex prompts: <context>, <task>, <format>")
    pdf.bullet("Use 'Think step by step' for complex reasoning tasks")
    pdf.bullet("Ask Claude to critique its own output before you accept it")
    pdf.bullet("For documents, paste the full text - Claude handles 200k+ tokens")

    pdf.chapter(3, "Midjourney & FLUX - Visual Creation")
    pdf.section("Midjourney v6 - The Standard for Quality")
    pdf.para("Midjourney remains the gold standard for photorealistic and artistic image generation. Version 6 introduced dramatic improvements in text rendering, prompt adherence, and human anatomy.")
    pdf.section("Essential Midjourney Parameters")
    pdf.bullet("--ar 16:9  |  Widescreen ratio - great for thumbnails")
    pdf.bullet("--ar 9:16  |  Portrait/vertical - ideal for Reels and Shorts")
    pdf.bullet("--style raw  |  Less stylised, more photorealistic")
    pdf.bullet("--chaos 20  |  Adds variety to results")
    pdf.bullet("--no text  |  Removes text from image")
    pdf.section("FLUX - The Open Source Challenger")
    pdf.para("FLUX by Black Forest Labs is available via fal.ai and Replicate, offering API access for developers. Exceptional for consistent character generation with LoRA fine-tuning.")

    pdf.chapter(4, "Runway, Kling & Suno - Video & Audio")
    pdf.section("AI Video Generation in 2025")
    pdf.para("AI video has crossed a quality threshold that makes it viable for real content production. The tools below can generate 5-10 second clips that are indistinguishable from real footage in many scenarios.")
    pdf.callout("Runway Gen-3", "Best for cinematic, film-quality clips. $0.05/second.")
    pdf.callout("Kling 1.6", "Best value. Standard mode ~$0.28/5s clip. Excellent motion.")
    pdf.callout("Sora by OpenAI", "Highest quality, limited access. Best for creative/artistic use.")
    pdf.callout("Pika 2.0", "Great for product videos and simple animations.")
    pdf.section("Suno - AI Music Generation")
    pdf.para("Suno v4 can generate full songs with vocals, instrumentation, and lyrics in any genre in under 60 seconds. YouTube videos, ads, podcasts, and apps no longer need expensive music licensing.")
    pdf.bullet("Generate 2 free songs per day on the free tier")
    pdf.bullet("Use custom mode to specify genre, mood, tempo, and instruments")
    pdf.bullet("Commercial license available on paid plans ($10/month)")

    pdf.chapter(5, "Automation Tools - Make.com & Zapier")
    pdf.section("Why Automation Is the Multiplier")
    pdf.para("Knowing individual AI tools is powerful. Connecting them together through automation is transformative. Make.com is the most powerful visual automation platform available to non-developers.")
    pdf.callout("Example Automation", "New YouTube video published > AI generates transcript > Claude summarises into blog post > Auto-published to WordPress > Social media posts created and scheduled > Email sent to newsletter list. Zero manual steps.")
    pdf.section("Make.com vs Zapier")
    pdf.bullet("Make.com: More powerful, visual flow builder, better for complex logic, cheaper")
    pdf.bullet("Zapier: Easier to learn, more app integrations, better for simple automations")
    pdf.bullet("n8n: Open source, self-hosted, unlimited runs, best for developers")

    pdf.chapter(6, "Building Your Personal AI Stack")
    pdf.section("The Recommended Starter Stack (Under $50/month)")
    pdf.bullet("Claude Pro - $20/month - Primary thinking and writing tool")
    pdf.bullet("Midjourney Basic - $10/month - Image generation")
    pdf.bullet("Make.com Core - $10/month - Automation workflows")
    pdf.bullet("Suno Basic - $10/month - Music and audio")
    pdf.bullet("ElevenLabs - Free tier - Voice generation")
    pdf.callout("Pro Tip", "Do not subscribe to everything at once. Master one tool for 30 days before adding another. Depth beats breadth in AI skill-building.")

    pdf.output(OUT / "03_AI_Tools_Masterclass.pdf")
    print("  Done: 03_AI_Tools_Masterclass.pdf")


# =============================================================
# EBOOK 4
# =============================================================
def ebook4():
    pdf = Book("Build Your Personal Brand with AI",
               "From Zero to 10,000 Followers in 90 Days Using AI")
    pdf.cover()
    pdf.toc([
        ("01", "Why Personal Brand is the New Resume"),
        ("02", "Finding Your Niche with AI Research"),
        ("03", "LinkedIn - The Professional Gold Mine"),
        ("04", "YouTube Shorts & Instagram Reels"),
        ("05", "Content Systems That Run on Autopilot"),
        ("06", "Monetising Your Personal Brand"),
    ])

    pdf.chapter(1, "Why Personal Brand is the New Resume")
    pdf.para("In 2025, your LinkedIn profile is seen by more potential employers, clients, and partners than your resume will ever be. Your YouTube channel builds trust at scale. Your Twitter/X presence demonstrates expertise in real-time.")
    pdf.para("Personal brand is not about vanity. It is about being discoverable by the right people who want to pay for what you know. AI has removed the biggest barrier to building one: the time and skill required to create consistent, high-quality content.")
    pdf.callout("The Opportunity", "Less than 1% of LinkedIn's 1 billion users post content regularly. On a platform where the algorithm rewards consistency, the bar to stand out is remarkably low.")

    pdf.chapter(2, "Finding Your Niche with AI Research")
    pdf.section("The Niche Formula")
    pdf.para("Your niche = Your expertise + An audience that will pay + A content format you enjoy. Getting this wrong means creating content for months with no results. Getting it right means compounding growth.")
    pdf.callout("AI Niche Research Prompt", 'I have expertise in [list your skills]. I want to build a personal brand that can eventually generate income. Research these angles: (1) What problems do [target audience] pay to solve? (2) What content gaps exist in this space? (3) What unique angle can I own? Give me 5 niche options with estimated audience size.')
    pdf.section("Profitable Niches for Indian Creators in 2025")
    for n in ["AI tools and productivity (massive demand, low competition)", "Finance and investing for millennials", "Career growth in tech (Data/AI/Cloud)", "D2C business building", "Solopreneur and freelancing life", "Health and fitness with science backing"]:
        pdf.bullet(n)

    pdf.chapter(3, "LinkedIn - The Professional Gold Mine")
    pdf.section("The LinkedIn Algorithm in 2025")
    pdf.para("LinkedIn rewards content that generates dwell time and meaningful comments. Best performing formats: text-only posts with a strong hook, carousels (PDF posts), and short videos.")
    pdf.section("The Perfect LinkedIn Post Formula")
    pdf.para("Line 1 (Hook): Make a bold statement, ask a provocative question, or share a surprising statistic. This determines whether people click 'see more'.")
    pdf.para("Lines 2-7 (Body): 3-5 short paragraphs. White space is your friend. Each line should make the reader want to read the next.")
    pdf.para("Final line (CTA): Ask a question, invite comments, or offer a resource. Comments are the most powerful signal to the algorithm.")
    pdf.callout("LinkedIn Post AI Prompt", 'Write a LinkedIn post about [topic] for [target audience]. Hook: make it controversial or surprising. Body: 4 short paragraphs, max 3 lines each. End: question to drive comments. Tone: expert but human. No hashtags in body.')
    pdf.section("Posting Consistency System")
    pdf.bullet("Post 4-5 times per week minimum for first 90 days")
    pdf.bullet("Batch-create 2 weeks of content every Sunday using AI")
    pdf.bullet("Use a scheduling tool (Buffer, Taplio) to maintain consistency")
    pdf.bullet("Comment meaningfully on 10 posts per day to grow reach")

    pdf.chapter(4, "YouTube Shorts & Instagram Reels")
    pdf.section("Short Form Video - The Fastest Audience Builder")
    pdf.para("Short-form video under 60 seconds is the fastest way to grow an audience in 2025. YouTube Shorts, Instagram Reels, and LinkedIn short videos all reward consistent posting with algorithmic distribution.")
    pdf.callout("Short Video Script Formula", "Hook (0-3s): Visual or verbal shock. Setup (3-15s): Define the problem or curiosity gap. Content (15-50s): Deliver the value. CTA (last 3s): Follow for more / comment below.")
    pdf.callout("AI Video Script Prompt", 'Write a 45-second short video script about [tip/insight] for [audience]. Format: hook line, 3 punchy tips (8 seconds each), CTA. Each line should be max 10 words. Make it feel like a secret being revealed.')
    pdf.section("Faceless Content Strategy")
    pdf.para("You do not need to show your face to build a personal brand. AI-generated visuals, screen recordings, and text-on-screen content can grow massive audiences without ever being on camera.")

    pdf.chapter(5, "Content Systems That Run on Autopilot")
    pdf.section("The Content Flywheel")
    pdf.para("One core idea > LinkedIn post > Twitter thread > YouTube Short script > Instagram Reel > Newsletter section. Five pieces of content from one idea, mostly AI-generated. This is the content flywheel.")
    pdf.section("Weekly Content Batch System")
    pdf.bullet("Monday: Brainstorm 5 ideas with AI (30 min)")
    pdf.bullet("Tuesday: Write all LinkedIn posts for the week (45 min with AI)")
    pdf.bullet("Wednesday: Create 3 short video scripts (30 min)")
    pdf.bullet("Thursday: Schedule everything and respond to comments (30 min)")
    pdf.bullet("Friday: Analyse performance, feed insights back into AI for next week")

    pdf.chapter(6, "Monetising Your Personal Brand")
    pdf.section("The 5 Monetisation Stages")
    pdf.bullet("1,000 followers: Freelance clients via DMs")
    pdf.bullet("5,000 followers: Paid newsletter or community")
    pdf.bullet("10,000 followers: Brand partnerships and sponsorships")
    pdf.bullet("25,000 followers: Online course or cohort")
    pdf.bullet("50,000+ followers: Speaking, consulting, book deals")
    pdf.callout("Key Insight", "The audience comes before the monetisation. Focus on providing genuine value for the first 90 days. The money follows attention. Trying to monetise too early kills growth.")

    pdf.output(OUT / "04_Build_Personal_Brand_with_AI.pdf")
    print("  Done: 04_Build_Personal_Brand_with_AI.pdf")


# =============================================================
# EBOOK 5
# =============================================================
def ebook5():
    pdf = Book("The Solopreneur's AI Toolkit",
               "Run a 7-Figure Business Alone with AI as Your Team")
    pdf.cover()
    pdf.toc([
        ("01", "The Solopreneur Revolution"),
        ("02", "Your AI Team - Roles & Tools"),
        ("03", "Sales & Marketing on Autopilot"),
        ("04", "Operations, Finance & Legal"),
        ("05", "Customer Service Without Hiring"),
        ("06", "The Rs.1 Crore Solopreneur Blueprint"),
    ])

    pdf.chapter(1, "The Solopreneur Revolution")
    pdf.para("The traditional business model required hiring to scale. More revenue meant more employees, more management overhead, and more complexity. AI has broken this equation permanently.")
    pdf.para("In 2025, a single person with the right AI stack can run a business that would have required 10-15 employees five years ago. The operating leverage of AI tools means your revenue can scale while your headcount stays at one.")
    pdf.callout("Case Study", "Pieter Levels runs 12 profitable SaaS products alone, generating $3M+ annually. His entire team is himself, AI, and a few contractors. This model is now accessible to anyone.")
    pdf.section("What Changes When You Have an AI Team")
    pdf.bullet("Marketing: AI writes your copy, schedules posts, and analyses results")
    pdf.bullet("Sales: AI qualifies leads, writes proposals, and follows up")
    pdf.bullet("Operations: AI manages projects, tracks KPIs, and flags issues")
    pdf.bullet("Customer service: AI handles 80% of queries without your involvement")
    pdf.bullet("Finance: AI categorises expenses, forecasts cash flow, and drafts invoices")
    pdf.bullet("Legal: AI reviews contracts, drafts agreements, and flags risks")

    pdf.chapter(2, "Your AI Team - Roles & Tools")
    pdf.section("Assembling Your AI Team")
    pdf.bullet("CMO (Marketing) - Claude + Canva + Buffer - Strategy, content, brand voice")
    pdf.bullet("Sales Manager - ChatGPT + Hunter.io - Outreach, follow-ups, proposals")
    pdf.bullet("Designer - Midjourney + FLUX - Graphics, thumbnails, brand assets")
    pdf.bullet("Video Producer - Runway + Kling + CapCut AI - Video content")
    pdf.bullet("Customer Support - Intercom AI + Claude - Handle queries 24/7")
    pdf.bullet("CFO (Finance) - Notion + Claude - Budgeting, invoicing, cash flow")
    pdf.bullet("Legal Counsel - Claude - Contract review, compliance")

    pdf.chapter(3, "Sales & Marketing on Autopilot")
    pdf.section("The AI Marketing Machine")
    pdf.para("Marketing is the lifeblood of any business. Without it, the best product in the world does not sell. AI makes it possible to run a full marketing operation without a team.")
    pdf.callout("Weekly Marketing Autopilot Stack", "Sunday: AI generates 20 social posts for the week. Monday-Friday: Auto-scheduled via Buffer. Daily: AI analyses engagement. Monthly: AI writes SEO blog post from top-performing content.")
    pdf.section("AI-Powered Lead Generation")
    pdf.bullet("Use Apollo.io to identify your ideal customer profile at scale")
    pdf.bullet("Use Claude to write personalised outreach for each prospect segment")
    pdf.bullet("Use Make.com to automate the entire outreach sequence")
    pdf.bullet("Use AI to score inbound leads and prioritise your follow-ups")
    pdf.callout("Cold Email Prompt", 'Write a cold email to a [role] at a [company type] about [your service]. Pain point: [specific problem]. Offer: [your solution + proof]. CTA: 15-min call. Max 120 words. No buzzwords. First line must be personalised to their specific company.')

    pdf.chapter(4, "Operations, Finance & Legal")
    pdf.section("Running Operations with AI")
    pdf.para("Operations are the boring but critical backbone of every business. Invoicing, project management, vendor communication, reporting - AI can handle most of this with minimal oversight.")
    pdf.callout("Invoice Writing Prompt", 'Create a professional invoice for services: [list services]. Client: [name]. My business: [name]. Payment terms: 15 days. Include a polite but firm late payment clause.')
    pdf.callout("Contract Review Prompt", 'Review this contract and identify: (1) Clauses that favour the other party unfairly, (2) Missing standard protections for me, (3) Ambiguous language, (4) Red flags I should negotiate. Contract: [paste text].')
    pdf.section("Financial Tracking for Solopreneurs")
    pdf.bullet("Track all income and expenses in a simple Notion database")
    pdf.bullet("Use Claude to categorise transactions and identify patterns monthly")
    pdf.bullet("Review a one-page AI-generated financial summary every Friday")
    pdf.bullet("Never let receivables exceed 30 days - AI can automate payment reminders")

    pdf.chapter(5, "Customer Service Without Hiring")
    pdf.section("The 80/20 of Customer Queries")
    pdf.para("In most businesses, 80% of customer queries fall into 5-10 repeatable categories. Once you have identified these, AI can handle them completely - faster, more consistently, and at any hour.")
    pdf.section("Building Your AI Support System")
    pdf.bullet("Document your 20 most common customer questions and ideal answers")
    pdf.bullet("Build a simple FAQ page using these (AI helps write them)")
    pdf.bullet("Set up Intercom or Crisp with AI auto-responses for common queries")
    pdf.bullet("Route complex queries to you via priority inbox")
    pdf.bullet("Review AI responses weekly and improve the knowledge base")
    pdf.callout("Customer Response Prompt", 'A customer sent this message: [paste message]. They are a [plan] subscriber. Respond in a friendly, helpful tone. Resolve their issue if possible, or explain next steps clearly. Max 100 words.')

    pdf.chapter(6, "The Rs.1 Crore Solopreneur Blueprint")
    pdf.section("Revenue Architecture for Rs.1 Crore/Year")
    pdf.para("Rs.1 crore = Rs.8.33 lakh per month. Here are three different paths to reach this as a solopreneur:")
    pdf.section("Path 1 - High-Ticket Services")
    pdf.bullet("5 retainer clients at Rs.1.65 lakh/month each = Rs.8.25 lakh/month")
    pdf.bullet("Services: AI strategy consulting, done-for-you content systems")
    pdf.bullet("Time to build: 12-18 months")
    pdf.section("Path 2 - Digital Products + Audience")
    pdf.bullet("10,000 followers x 5% conversion x Rs.1,999 = Rs.10 lakh/month")
    pdf.bullet("Products: courses, ebooks, templates, cohorts")
    pdf.bullet("Time to build: 18-24 months")
    pdf.section("Path 3 - SaaS / Software")
    pdf.bullet("500 customers x Rs.1,660/month = Rs.8.3 lakh/month")
    pdf.bullet("Build with no-code tools + AI assistance")
    pdf.bullet("Time to build: 12-30 months (high variance)")
    pdf.callout("The Truth About Rs.1 Crore", "All three paths work. None of them are quick. The solopreneurs who reach this level share one trait: they picked one path and stayed with it for 2+ years without switching. AI makes the journey faster. Your consistency makes it happen.")

    pdf.output(OUT / "05_Solopreneur_AI_Toolkit.pdf")
    print("  Done: 05_Solopreneur_AI_Toolkit.pdf")


# =============================================================
if __name__ == "__main__":
    print("Generating Learnpedia.ai ebooks...")
    ebook1()
    ebook2()
    ebook3()
    ebook4()
    ebook5()
    print("\nAll done! Files in ./ebooks/")
    for f in sorted(OUT.glob("*.pdf")):
        print(f"  {f.name}  ({f.stat().st_size // 1024} KB)")
