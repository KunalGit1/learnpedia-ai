'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PenTool, Sparkles, Copy, Download, ArrowLeft, Check, Loader2 } from 'lucide-react'
import Link from 'next/link'

const TASKS = [
  { id: 'blog',    label: 'Blog Post',       desc: 'SEO-optimised article' },
  { id: 'ebook',   label: 'Ebook Chapter',   desc: 'Long-form book content' },
  { id: 'email',   label: 'Email Sequence',  desc: '5-email nurture series' },
  { id: 'social',  label: 'Social Pack',     desc: 'LinkedIn + Twitter + Instagram' },
  { id: 'sales',   label: 'Sales Page',      desc: 'High-converting copy' },
  { id: 'outline', label: 'Content Outline', desc: 'Structured planning doc' },
]

const TONES   = ['Professional', 'Casual', 'Motivational', 'Educational', 'Conversational']
const LENGTHS = [
  { id: 'short',  label: 'Short',  desc: '~300 words' },
  { id: 'medium', label: 'Medium', desc: '~700 words' },
  { id: 'long',   label: 'Long',   desc: '~1,500 words' },
]

export default function ContentWriterPage() {
  const [task,     setTask]     = useState('blog')
  const [topic,    setTopic]    = useState('')
  const [audience, setAudience] = useState('')
  const [tone,     setTone]     = useState('Professional')
  const [length,   setLength]   = useState('medium')
  const [loading,  setLoading]  = useState(false)
  const [content,  setContent]  = useState('')
  const [error,    setError]    = useState('')
  const [copied,   setCopied]   = useState(false)

  const generate = async () => {
    if (!topic.trim()) { setError('Please enter a topic'); return }
    setLoading(true); setError(''); setContent('')
    try {
      const res = await fetch('/api/ai/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, topic, audience, tone: tone.toLowerCase(), length }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); return }
      setContent(data.content)
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `${task}-${topic.slice(0, 30).replace(/\s+/g, '-')}.txt`
    a.click()
    URL.revokeObjectURL(url)
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
              <PenTool className="w-5 h-5 text-violet-400" />
              AI Content Writer
            </h1>
            <p className="text-slate-500 text-sm">Powered by Llama 3.1 · Instant generation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Controls */}
          <div className="space-y-5">

            {/* Content type */}
            <div className="glass rounded-2xl p-5">
              <p className="text-white font-semibold text-sm mb-3">Content Type</p>
              <div className="grid grid-cols-2 gap-2">
                {TASKS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTask(t.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      task === t.id
                        ? 'border-violet-500 bg-violet-500/15 text-white'
                        : 'border-white/5 bg-white/2 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <p className="font-semibold text-xs">{t.label}</p>
                    <p className="text-[10px] opacity-60 mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div className="glass rounded-2xl p-5">
              <label className="text-white font-semibold text-sm block mb-2">Topic *</label>
              <textarea
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. How to make ₹1 lakh per month with AI tools"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>

            {/* Audience + Tone */}
            <div className="glass rounded-2xl p-5 space-y-4">
              <div>
                <label className="text-white font-semibold text-sm block mb-2">Target Audience</label>
                <input
                  value={audience}
                  onChange={e => setAudience(e.target.value)}
                  placeholder="e.g. Indian freelancers aged 25-35"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-white font-semibold text-sm block mb-2">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map(t => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                        tone === t
                          ? 'border-violet-500 bg-violet-500/15 text-violet-300'
                          : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Length */}
            <div className="glass rounded-2xl p-5">
              <p className="text-white font-semibold text-sm mb-3">Length</p>
              <div className="grid grid-cols-3 gap-2">
                {LENGTHS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setLength(l.id)}
                    className={`p-3 rounded-xl text-center transition-all border ${
                      length === l.id
                        ? 'border-violet-500 bg-violet-500/15 text-white'
                        : 'border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <p className="font-semibold text-xs">{l.label}</p>
                    <p className="text-[10px] opacity-60">{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={loading}
              className="w-full btn-primary py-4 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin relative z-10" /><span className="relative z-10">Generating...</span></>
              ) : (
                <><Sparkles className="w-4 h-4 relative z-10" /><span className="relative z-10">Generate Content</span></>
              )}
            </button>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </div>

          {/* Right — Output */}
          <div className="glass rounded-2xl p-5 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white font-semibold text-sm">Output</p>
              {content && (
                <div className="flex gap-2">
                  <button onClick={copy} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all">
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button onClick={download} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all">
                    <Download className="w-3 h-3" /> Save
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
                      <Sparkles className="w-5 h-5 text-violet-400 absolute inset-0 m-auto" />
                    </div>
                    <p className="text-sm">Writing your content...</p>
                  </motion.div>
                )}
                {!loading && !content && (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
                    <PenTool className="w-10 h-10" />
                    <p className="text-sm">Your generated content will appear here</p>
                  </motion.div>
                )}
                {!loading && content && (
                  <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap text-sm">
                    {content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
