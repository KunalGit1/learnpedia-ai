'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Download, ArrowLeft, Loader2, ImageIcon, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const STYLES = [
  { id: 'book-cover',  label: 'Book Cover',     emoji: '📚' },
  { id: 'social',      label: 'Social Graphic',  emoji: '📱' },
  { id: 'thumbnail',   label: 'YT Thumbnail',    emoji: '🎬' },
  { id: 'product',     label: 'Product Mockup',  emoji: '🛍️' },
  { id: 'abstract',    label: 'Abstract Art',    emoji: '🎨' },
  { id: 'default',     label: 'Custom',          emoji: '✨' },
]

const SIZES = [
  { id: 'square',    label: '1:1',  w: 1024, h: 1024, desc: 'Instagram / Profile' },
  { id: 'landscape', label: '16:9', w: 1344, h: 768,  desc: 'YouTube / Banner' },
  { id: 'portrait',  label: '9:16', w: 768,  h: 1344, desc: 'Stories / Reels' },
]

const PROMPT_IDEAS = [
  'A premium ebook cover about AI wealth building, dark purple theme',
  'Motivational quote graphic for Instagram, gold and black aesthetic',
  'YouTube thumbnail for a video about making money online',
  'Abstract digital art background for a business presentation',
  'Clean product mockup for a digital course on white background',
]

export default function ImageGeneratorPage() {
  const [prompt,  setPrompt]  = useState('')
  const [style,   setStyle]   = useState('book-cover')
  const [size,    setSize]    = useState('square')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error,   setError]   = useState('')

  const selectedSize = SIZES.find(s => s.id === size)!

  const generate = async () => {
    if (!prompt.trim()) { setError('Please describe the image you want'); return }
    setLoading(true); setError(''); setImageUrl('')
    try {
      const res = await fetch('/api/ai/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style,
          width:  selectedSize.w,
          height: selectedSize.h,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Generation failed'); return }
      setImageUrl(data.imageUrl)
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = async () => {
    const res  = await fetch(imageUrl)
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `learnpedia-image-${Date.now()}.png`
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
              <Sparkles className="w-5 h-5 text-amber-400" />
              AI Image Generator
            </h1>
            <p className="text-slate-500 text-sm">Powered by FLUX.1-schnell · ~5s per image</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Controls */}
          <div className="space-y-5">

            {/* Prompt */}
            <div className="glass rounded-2xl p-5">
              <label className="text-white font-semibold text-sm block mb-2">Describe your image *</label>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="e.g. A premium dark ebook cover about AI wealth building with purple gradient and modern typography"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              {/* Prompt ideas */}
              <p className="text-slate-600 text-xs mt-2 mb-1">Try these:</p>
              <div className="flex flex-wrap gap-1.5">
                {PROMPT_IDEAS.map((idea, i) => (
                  <button key={i} onClick={() => setPrompt(idea)}
                    className="text-[10px] text-slate-500 hover:text-slate-300 border border-white/5 hover:border-white/15 px-2 py-1 rounded-lg transition-all text-left">
                    {idea.slice(0, 40)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div className="glass rounded-2xl p-5">
              <p className="text-white font-semibold text-sm mb-3">Style</p>
              <div className="grid grid-cols-3 gap-2">
                {STYLES.map(s => (
                  <button key={s.id} onClick={() => setStyle(s.id)}
                    className={`p-3 rounded-xl text-center transition-all border ${
                      style === s.id
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-white/5 text-slate-400 hover:border-white/20'
                    }`}>
                    <div className="text-lg mb-1">{s.emoji}</div>
                    <p className="text-[10px] font-medium">{s.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="glass rounded-2xl p-5">
              <p className="text-white font-semibold text-sm mb-3">Size</p>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map(s => (
                  <button key={s.id} onClick={() => setSize(s.id)}
                    className={`p-3 rounded-xl text-center transition-all border ${
                      size === s.id
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-white/5 text-slate-400 hover:border-white/20'
                    }`}>
                    <p className="font-bold text-sm">{s.label}</p>
                    <p className="text-[10px] opacity-60 mt-0.5">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate */}
            <button onClick={generate} disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                : <><Sparkles className="w-4 h-4" /> Generate Image</>
              }
            </button>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </div>

          {/* Right — Preview */}
          <div className="glass rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white font-semibold text-sm">Preview</p>
              {imageUrl && (
                <div className="flex gap-2">
                  <button onClick={generate} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all">
                    <RefreshCw className="w-3 h-3" /> Regenerate
                  </button>
                  <button onClick={downloadImage} className="flex items-center gap-1.5 text-xs text-white bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 px-3 py-1.5 rounded-lg transition-all">
                    <Download className="w-3 h-3" /> Download
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 text-slate-500">
                    <div className="relative w-16 h-16">
                      <div className="w-16 h-16 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
                      <Sparkles className="w-6 h-6 text-amber-400 absolute inset-0 m-auto" />
                    </div>
                    <p className="text-sm">Creating your image...</p>
                    <p className="text-xs text-slate-600">Usually takes 3-8 seconds</p>
                  </motion.div>
                )}
                {!loading && !imageUrl && (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-3 text-slate-600">
                    <ImageIcon className="w-12 h-12" />
                    <p className="text-sm">Your image will appear here</p>
                  </motion.div>
                )}
                {!loading && imageUrl && (
                  <motion.div key="image" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-full">
                    <img src={imageUrl} alt="Generated" className="w-full rounded-xl object-contain max-h-[500px]" />
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
