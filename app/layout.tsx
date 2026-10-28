import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'ProjectForge AI — Build work worth presenting', template: '%s | ProjectForge AI' },
  description: 'Engineering projects, research-ready implementations, and technical guidance for ambitious students.',
  generator: 'ProjectForge AI',
  metadataBase: new URL('https://projectforge.ai'),
  openGraph: { title: 'ProjectForge AI — Build work worth presenting', description: 'Explore engineering projects, AI/ML innovations, and research-ready implementations.', type: 'website' },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#07111f', userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
