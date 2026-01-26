import React from "react"
import type { Metadata } from 'next'
import { Space_Grotesk, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-heading'
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'XYNTRA | Where Ideas Collide. Innovation Ignites.',
  description: 'Join XYNTRA - The premier hackathon by IEEE at Rajalakshmi Engineering College. Build, innovate, and transform the future.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${outfit.variable} font-sans antialiased bg-[#030014] text-white overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
