import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'Learnpedia.ai — The AI-Powered Encyclopedia for Modern Entrepreneurs',
  description:
    '50+ Premium Digital Books, 20+ Audiobooks & AI Tools to help you build, brand & scale your digital empire. Lifetime access from ₹999.',
  keywords: [
    'digital books', 'PLR ebooks', 'AI tools', 'audiobooks', 'online business',
    'digital products', 'entrepreneur resources', 'passive income', 'AI education',
  ],
  openGraph: {
    title: 'Learnpedia.ai — AI-Powered Encyclopedia for Entrepreneurs',
    description: 'Digital Books + Audiobooks + AI Tools. One lifetime payment. Build your digital empire.',
    url: 'https://learnpedia.ai',
    siteName: 'Learnpedia.ai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learnpedia.ai',
    description: '50+ AI-curated books, audiobooks & tools for digital entrepreneurs.',
  },
  metadataBase: new URL('https://learnpedia.ai'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background text-slate-100 antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
