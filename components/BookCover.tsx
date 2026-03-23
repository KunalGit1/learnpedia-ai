'use client'

import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface BookCoverProps {
  title: string
  subtitle?: string
  category: string
  gradient: string
  accentColor?: string
  size?: 'sm' | 'md' | 'lg'
  tilt?: boolean
  index?: number
}

export default function BookCover({
  title, subtitle, category, gradient, accentColor = '#8b5cf6', size = 'md', tilt = true, index = 0,
}: BookCoverProps) {
  const sizes = {
    sm: 'w-28 h-40',
    md: 'w-40 h-56',
    lg: 'w-52 h-72',
  }

  return (
    <motion.div
      className={clsx(
        sizes[size],
        'relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer select-none',
        'shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
      )}
      style={{ transformPerspective: 800 }}
      initial={tilt ? { rotateY: -8, rotateX: 2 } : { rotateY: 0, rotateX: 0 }}
      whileHover={{
        rotateY: 0,
        rotateX: 0,
        scale: 1.04,
        boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 40px ${accentColor}33`,
        transition: { duration: 0.3 },
      }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

      {/* Left spine shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4">
        {/* Category */}
        <div>
          <span
            className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.8)' }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3
            className={clsx(
              'font-black text-white leading-tight mb-1',
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
            )}
          >
            {title}
          </h3>
          {subtitle && size !== 'sm' && (
            <p className="text-white/60 text-[10px] leading-snug line-clamp-2">{subtitle}</p>
          )}
          {/* Brand */}
          <div className="mt-3 pt-2 border-t border-white/15 flex items-center justify-between">
            <span className="text-white/40 text-[9px] font-medium tracking-wider uppercase">Learnpedia.ai</span>
            <div className="w-4 h-4 rounded-sm bg-white/20 flex items-center justify-center">
              <span className="text-white text-[8px] font-black">L</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
