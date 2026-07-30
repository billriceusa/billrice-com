import type { NextConfig } from "next";

// Slugs of the industry posts unpublished on 2026-07-30. Kept here so the
// redirect list and scripts/unpublish-industry-posts.ts can be diffed against
// each other by eye.
const RETIRED_INDUSTRY_POST_SLUGS = [
  'mortgage-lenders-measuring-wrong-kpis',
  '5-lead-generation-metrics-mortgage-lender-gets-wrong',
  'lead-buyers-framework',
  '30-years-fintech-gtm-lessons',
  'why-i-build-niche-authority-sites',
  'lead-management-vs-crm',
  'ai-in-mortgage-marketing-real-state',
  'aged-lead-opportunity',
  'fintech-marketing-is-not-saas-marketing',
  'what-i-look-for-advising-fintech',
];

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  
  // Compression and optimization
  compress: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },
  
  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // Retired 2026-07-30. Ten machine-drafted industry posts were removed from
      // the canonical record (see scripts/unpublish-industry-posts.ts). They have
      // no topical successor on this domain — the writing surface that remains is
      // Bill's first-person work — so they resolve to the homepage rather than to
      // a page that does not answer what the reader came for.
      ...RETIRED_INDUSTRY_POST_SLUGS.map((slug) => ({
        source: `/blog/${slug}`,
        destination: '/',
        permanent: true,
      })),
    ]
  },
};

export default nextConfig;
