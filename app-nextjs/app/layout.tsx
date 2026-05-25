import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Doctor Kegel - Sexual Wellness Plan',
  description: 'Get your personalized Kegel exercise plan for improved sexual wellness',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
