import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://billrice.com'),
  title: {
    default: "Bill Rice - B2B Marketing Strategy Expert | Fintech & Lead Generation",
    template: "%s | Bill Rice - B2B Marketing Strategy Expert"
  },
  description: "Bill Rice brings 30+ years of B2B marketing expertise helping fintech companies and growth-focused businesses build predictable revenue pipelines through proven marketing frameworks and lead generation systems.",
  keywords: ["B2B marketing", "fintech marketing", "lead generation", "sales scripts", "marketing strategy", "Bill Rice", "aged leads", "mortgage marketing", "business growth", "marketing automation", "revenue pipelines", "growth strategy"],
  authors: [{ name: "Bill Rice", url: "https://billrice.com" }],
  creator: "Bill Rice",
  publisher: "Bill Rice Strategy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://billrice.com',
    siteName: 'Bill Rice - B2B Marketing Strategy Expert',
    title: 'Bill Rice - B2B Marketing Strategy Expert | Fintech & Lead Generation',
    description: 'Bill Rice brings 30+ years of B2B marketing expertise helping fintech companies and growth-focused businesses build predictable revenue pipelines through proven marketing frameworks and lead generation systems.',
    images: [
      {
        url: '/bill-rice-headshot.jpg',
        width: 1200,
        height: 630,
        alt: 'Bill Rice - B2B Marketing Strategy Expert',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bill Rice - B2B Marketing Strategy Expert | Fintech & Lead Generation',
    description: 'Bill Rice brings 30+ years of B2B marketing expertise helping fintech companies and growth-focused businesses build predictable revenue pipelines.',
    images: ['/bill-rice-headshot.jpg'],
    creator: '@billrice',
    site: '@billrice',
  },
  alternates: {
    canonical: 'https://billrice.com',
    types: {
      'application/rss+xml': [
        { url: 'https://theleadbrief.com/feed', title: 'The Lead Brief RSS Feed' },
      ],
    },
  },
  category: 'Business',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${geistMono.variable} antialiased`}
      >
        <head>
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="alternate" type="application/rss+xml" title="Bill Rice Blog" href="/feed.xml" />
        </head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}');
          `}
        </Script>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
