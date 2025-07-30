import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bill Rice - B2B Marketing Strategy Expert | Fintech & Lead Generation",
  description: "Bill Rice brings 20+ years of B2B marketing expertise helping fintech companies and growth-focused businesses build predictable revenue pipelines through proven marketing frameworks and lead generation systems.",
  keywords: ["B2B marketing", "fintech marketing", "lead generation", "sales scripts", "marketing strategy", "Bill Rice", "aged leads", "mortgage marketing", "business growth"],
  authors: [{ name: "Bill Rice" }],
  creator: "Bill Rice",
  publisher: "Bill Rice Strategy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
    description: 'Bill Rice brings 20+ years of B2B marketing expertise helping fintech companies and growth-focused businesses build predictable revenue pipelines through proven marketing frameworks and lead generation systems.',
    images: [
      {
        url: '/bill-rice-headshot.jpg',
        width: 1200,
        height: 630,
        alt: 'Bill Rice - B2B Marketing Strategy Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bill Rice - B2B Marketing Strategy Expert | Fintech & Lead Generation',
    description: 'Bill Rice brings 20+ years of B2B marketing expertise helping fintech companies and growth-focused businesses build predictable revenue pipelines.',
    images: ['/bill-rice-headshot.jpg'],
    creator: '@billrice',
  },
  alternates: {
    canonical: 'https://billrice.com',
  },
  category: 'Business',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
