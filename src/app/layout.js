import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Omar Hamid | Senior Mobile Engineer & Kotlin Specialist',
  description: 'Portfolio of Omar Hamid, a Senior Mobile Engineer specializing in Kotlin, SwiftUI, and mobile architecture. Over 10 years of experience building high-quality mobile experiences.',
  keywords: 'Omar Hamid, mobile developer, Kotlin, Android, iOS, Swift, SwiftUI, mobile architecture, Kotlin Multiplatform, KMP',
  metadataBase: new URL('https://omardroid.github.io'),
  openGraph: {
    title: 'Omar Hamid | Senior Mobile Engineer & Kotlin Specialist',
    description: 'Portfolio of Omar Hamid, a Senior Mobile Engineer with expertise in Kotlin and mobile application architecture.',
    url: 'https://omardroid.github.io/portfolio',
    siteName: 'Omar Hamid Portfolio',
    locale: 'en_US',
    type: 'website',
    // images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: '...' }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`}
          sizes="any"
        />
        {/* <link rel="apple-touch-icon" href="/apple-icon.png" /> */}
      </head>
      <body className={`${inter.className} w-full overflow-x-hidden`}>{children}</body>
    </html>
  )
}
