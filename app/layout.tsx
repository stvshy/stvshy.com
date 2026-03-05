import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
})

const monorale = localFont({
  src: [
    {
      path: '../public/fonts/Monorale (Raleway)/Monorale-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Monorale (Raleway)/Monorale-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-monorale',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stvshy.com'),
// Tytuł z szablonem (na podstronach "Music | Mateusz Staszków")
  title: {
    default: 'Mateusz Staszków (stvshy) - Developer & Producer',
    template: '%s | Mateusz Staszków (stvshy)',
  },  
description: 'Mateusz Staszków (stvshy) - Developer & Producer. Discover my music, projects, and portfolio. Fullstack Development & Sound Engineering.',  
keywords: ['Mateusz Staszków', 'stvshy', 'Developer', 'Music Producer', 'Wrocław', 'Development', 'Sound Engineering'],
generator: 'v0.app',
  icons: {
    icon: '/images/stvshy-s4.png',
    shortcut: '/images/stvshy-s2.png',
    apple: '/images/stvshy-s-mobile.png',
  },
openGraph: {
    title: 'Mateusz Staszków (stvshy)',
    description: 'Developer & Producer. Discover my music, projects, and portfolio.',
    url: 'https://stvshy.com',
    siteName: 'stvshy.com',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/images/stvshy-open.png',
        width: 1200,
        height: 630,
        alt: 'Mateusz Staszków (stvshy)',
      },
    ],
  },

  // Konfiguracja dla robotów Google
  robots: {
    index: true,
    follow: true,
  },

  other: {
    'nightmode': 'disable',
  }
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  userScalable: false,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mateusz Staszków',
    alternateName: 'stvshy',
    url: 'https://stvshy.com',
    image: 'https://stvshy.com/images/stvshy-s2.png',
    jobTitle: ['Software Developer', 'Music Producer'],
    sameAs: [
      'https://github.com/stvshy',
      'https://www.linkedin.com/in/mateusz-staszk%C3%B3w/',
      'https://www.instagram.com/stvshy',
      'https://open.spotify.com/artist/20jL6FuQUNHnlP3ApdjBbI?si=fvGq0tvJRXmhMa5_KKnAXg',
      'https://music.apple.com/pl/artist/stvshy/1863822260',
      'https://music.youtube.com/search?q=stvshy',
      'https://tidal.com/artist/72120078',
      'https://www.deezer.com/pl/artist/363730262',
      'https://music.amazon.com/artists/B0GCCG5GH3/stvshy',
      'https://soundcloud.com/stvshy',
    ]
  }
  return (
    <html lang="en" className="dark">
      <body className={`${montserrat.variable} ${monorale.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
