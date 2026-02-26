import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'stvshy',
  description: 'Mateusz Staszków - Developer & Producer. Discover my music, projects, and more.',
  generator: 'v0.app',
  icons: {
    icon: '/images/stvshy-s2.png',
    shortcut: '/images/stvshy-s2.png',
    apple: '/images/stvshy-s2.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
       <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <style dangerouslySetInnerHTML={{ __html: `
          /* Główny kursor na stronie */
          body {
    cursor: url('/cursors/cursor10.png') 0 0, auto !important;
          }
          
          /* Kursor w kształcie łapki/pointera dla klikalnych elementów */
          a, button, [role="button"], label, select,
          a *, button *, [role="button"] *, label *, select * {
cursor: url('/cursors/cursor10.png') 0 0, pointer !important;  }
        `}} />

      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
