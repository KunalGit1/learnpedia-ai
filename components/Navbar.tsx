'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, BookOpen, Sparkles, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'

const navLinks = [
  { label: 'Books', href: '/books' },
  { label: 'Audiobooks', href: '/audiobooks' },
  { label: 'AI Tools', href: '/ai-tools' },
  { label: 'Pricing', href: '/pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-lg shadow-violet-900/40 group-hover:shadow-violet-700/50 transition-shadow">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-white">Learn</span>
              <span className="text-gradient">pedia</span>
              <span className="text-violet-400">.ai</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors font-medium px-3 py-2">
              Sign In
            </Link>

            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              className="relative w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-colors overflow-hidden"
              whileTap={{ scale: 0.88 }}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, y: 10 }}
                    animate={{ rotate: 0, opacity: 1, y: 0 }}
                    exit={{ rotate: 90, opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, y: 10 }}
                    animate={{ rotate: 0, opacity: 1, y: 0 }}
                    exit={{ rotate: -90, opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <Moon className="w-4 h-4 text-violet-400" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <Link href="/pricing" className="btn-primary text-sm py-2.5 px-5">
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Get Access</span>
            </Link>
          </div>

          {/* Mobile toggle row */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggle}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center overflow-hidden"
              whileTap={{ scale: 0.88 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span key="sun-m" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }} className="absolute">
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.span>
                ) : (
                  <motion.span key="moon-m" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }} className="absolute">
                    <Moon className="w-4 h-4 text-violet-400" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <button
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-surface/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="py-3 px-4 text-center text-slate-400 hover:text-white rounded-xl border border-white/10 transition-all">
                  Sign In
                </Link>
                <Link href="/pricing" onClick={() => setMobileOpen(false)} className="btn-primary justify-center text-sm">
                  <Sparkles className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Get Lifetime Access</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
