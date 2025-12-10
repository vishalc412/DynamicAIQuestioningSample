import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FMCG Sales & JBP Assistant',
  description: 'AI-powered sales analysis for North America FMCG markets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
