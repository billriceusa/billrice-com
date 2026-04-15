/**
 * Seed / update the singleton aboutPage document.
 *
 * Usage: npx tsx scripts/seed-about-page.ts
 *
 * Requires SANITY_API_TOKEN in .env.local.
 * Safe to re-run — upserts by _id = "aboutPage".
 */

import { createClient } from 'next-sanity'
import { randomUUID } from 'crypto'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN in environment. Set it in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'st1plnki',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-21',
  useCdn: false,
  token,
})

function paragraph(segments: Array<string | { text: string; href: string }>) {
  const markDefs: Array<{ _key: string; _type: 'link'; href: string }> = []
  const children = segments.map((seg) => {
    if (typeof seg === 'string') {
      return { _type: 'span', _key: randomUUID(), text: seg, marks: [] as string[] }
    }
    const key = randomUUID()
    markDefs.push({ _key: key, _type: 'link', href: seg.href })
    return { _type: 'span', _key: randomUUID(), text: seg.text, marks: [key] }
  })
  return { _type: 'block', _key: randomUUID(), style: 'normal', markDefs, children }
}

const doc = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  headline: 'About Bill Rice',
  heroTagline:
    'Fintech marketing pioneer. Coined "lead management." 30+ years building lead generation platforms and revenue systems for financial services companies.',
  shortVersion: [
    paragraph([
      'I started my career as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), running counterespionage operations in the late 1990s — the very beginning of the internet era. That experience taught me systems thinking, pattern recognition, and how to build operational frameworks under pressure.',
    ]),
    paragraph([
      'In 2000, I made the jump to fintech as Employee #7 at DeepGreen Bank, one of the very first internet-only banks in the United States. We launched the industry\'s first unconditional online HELOC. From there, I went to Quicken Loans (now Rocket Mortgage) as VP of National Home Equity, where I built EquityOnline — their first true online lending and offer platform.',
    ]),
    paragraph([
      'In 2005, I founded Kaleidico — originally as a lead management software company. I built icoSales, an intelligent lead scoring and distribution platform for the mortgage call centers that were buying internet leads by the thousands. I started calling it a "lead management" platform to differentiate it from a CRM — because it worked leads, not customers. There was no relationship yet. That was my punch line, and the term stuck. I authored the original Wikipedia page for lead management. The category I named is now an industry standard. After the 2008 mortgage meltdown destroyed my call-center clients, I pivoted Kaleidico into the demand generation agency it is today.',
    ]),
    paragraph([
      'Since then, I\'ve been a growth consultant for Quizzle (acquired by Bankrate), built the GTM strategy and launch for SpringEQ, and founded Bill Rice Strategy Group to do B2B content strategy and demand generation for fintech companies like Figure and Boldin.',
    ]),
    paragraph([
      'Today I run three companies — Kaleidico (B2C lead gen agency), Bill Rice Strategy Group (B2B consulting), and Verified Vector (programmatic SEO and AI marketing) — and operate a portfolio of authority content sites across lead generation, real estate investing, and crypto lending.',
    ]),
  ],
  differentiators: [
    {
      _key: randomUUID(),
      title: 'Intelligence to Internet',
      description:
        'I went from running counterespionage operations as an AFOSI Special Agent to building one of the first internet banks. The systems thinking and analytical rigor from intelligence work is the foundation of everything I do in marketing.',
    },
    {
      _key: randomUUID(),
      title: 'I Named the Category',
      description:
        'I coined "lead management" as a category and authored the original Wikipedia page. Before that, everyone called these platforms CRMs, even though they were working prospects, not managing customer relationships. The distinction matters because the workflows, metrics, and systems are fundamentally different.',
    },
    {
      _key: randomUUID(),
      title: 'Builder, Not Just Advisor',
      description:
        "I was Employee #7 at DeepGreen Bank. I built EquityOnline at Quicken Loans. I built icoSales from scratch. I built the GTM for SpringEQ. I don't just advise — I build the platforms, the campaigns, the systems, and the operations.",
    },
    {
      _key: randomUUID(),
      title: '30+ Years, Same Industry',
      description:
        "I've been in fintech and financial services since the industry's earliest days online. That depth means I understand compliance, regulation, sales cycles, and buyer psychology in ways that generalist marketers simply cannot.",
    },
  ],
  timelineEvents: [
    {
      _key: randomUUID(),
      year: '1992',
      title: 'U.S. Air Force Academy',
      subtitle: 'B.S. Political Science',
      description:
        'Commissioned from the United States Air Force Academy. Served as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), conducting counterespionage operations during the earliest days of the internet.',
    },
    {
      _key: randomUUID(),
      year: '1992-2000',
      title: 'Air Force Intelligence & Information Warfare',
      subtitle: 'USAF, TASC Inc., Iridium Communications',
      description:
        'Served as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), conducting counterespionage operations. Managed information warfare programs at TASC, Inc. and served as Call Intercept System Security Manager at Iridium Communications. Pioneered information warfare operations at the dawn of the internet age.',
    },
    {
      _key: randomUUID(),
      year: '2000-2004',
      title: 'DeepGreen Bank - Employee #7',
      subtitle: 'One of the first internet-only banks',
      description:
        "Joined DeepGreen Bank as Employee #7, one of the earliest internet-only banks in the United States. Helped launch the industry's first unconditional online HELOC (Home Equity Line of Credit), establishing a template that the industry would follow for the next two decades. DeepGreen was forced into a fire sale in 2004 amid the post-dot-com, post-9/11 funding environment.",
    },
    {
      _key: randomUUID(),
      year: '2004-2005',
      title: 'Quicken Loans - COO Rock Bank Project → VP, National Home Equity',
      subtitle: 'Built the EquityOnline platform',
      description:
        "Recruited to Quicken Loans (now Rocket Mortgage) in 2004, initially as COO of the Rock Bank project — a vision to give Quicken Loans a federally chartered bank to stabilize funding for unlimited loan origination growth. When that initiative wound down, pivoted to Vice President of National Home Equity and led the design and build of EquityOnline, Quicken Loans' first true online lending and offer platform. Completed an MBA in Marketing at the University of Phoenix (2003) during this era.",
    },
    {
      _key: randomUUID(),
      year: '2005',
      title: 'Founded Kaleidico',
      subtitle: 'Lead management software → demand generation agency',
      description:
        'Founded Kaleidico as a lead management software company, focused on intelligently managing the thousands of leads being ingested into mortgage lending call centers. Built icoSales, an intelligent lead scoring and distribution platform that competed with Leads360 (later Velocify). Coined the term "lead management" to differentiate platforms that work leads from CRMs that manage customers, and authored the original Wikipedia page for the category. After the 2008 mortgage meltdown destroyed the call-center lender client base, pivoted Kaleidico into a demand generation agency serving mortgage lenders, law firms, and senior living communities.',
    },
    {
      _key: randomUUID(),
      year: '2008-2012',
      title: 'Quizzle - Growth Marketing Consultant',
      subtitle: 'Free credit report platform, later acquired by Bankrate',
      description:
        'Served as growth marketing consultant for Quizzle, one of the first free credit report and financial planning platforms. Bankrate later acquired Quizzle to power their customer acquisition and retention strategy.',
    },
    {
      _key: randomUUID(),
      year: '2018',
      title: 'SpringEQ - GTM Strategy & Launch',
      subtitle: 'Home equity lending fintech',
      description:
        'Built the initial go-to-market strategy for SpringEQ. Led the build-out of the website, lead generation systems, and GTM launch, then supported initial operations through the early growth phase.',
    },
    {
      _key: randomUUID(),
      year: '2020',
      title: 'Founded Bill Rice Strategy Group',
      subtitle: 'B2B consulting for fintech',
      description:
        'Launched Bill Rice Strategy Group (BRSG) to focus on B2B consulting for fintech companies and financial services organizations. Provides content strategy, executive thought leadership, and demand generation for high-growth companies including Figure and Boldin.',
    },
    {
      _key: randomUUID(),
      year: '2024',
      title: 'Founded Verified Vector',
      subtitle: 'Programmatic SEO & AI marketing agency',
      description:
        'Launched Verified Vector, a programmatic SEO and AI marketing agency serving fintech companies. Builds compliance-ready AI-powered content and marketing systems at scale.',
    },
    {
      _key: randomUUID(),
      year: '2025',
      title: "Published The Lead Buyer's Playbook",
      subtitle: 'Enterprise guide to lead buying',
      description:
        "Published The Lead Buyer's Playbook, the enterprise guide to buying and converting leads profitably. Drawing on 30+ years in lead generation, the book covers strategic foundations, vendor management, compliance, financial modeling, and scaling operations.",
    },
    {
      _key: randomUUID(),
      year: '2025-Present',
      title: 'Building Authority Content Portfolio',
      subtitle: 'Niche education and lead generation platforms',
      description:
        'Building and operating a portfolio of authority-driven content sites: AgedLeadSales.com (sales training for aged leads), ProInvestorHub.com (real estate investing education), CryptoLendingHub.com (crypto lending reviews), HowToWorkLeads.com (lead conversion techniques), and DemoLeadGen.com (lead generation demo platform). All built on Next.js and Sanity.io.',
    },
  ],
  expertiseAreas: [
    { _key: randomUUID(), area: 'Demand Generation', detail: 'Building scalable, predictable revenue engines for B2B and B2C' },
    { _key: randomUUID(), area: 'Lead Management', detail: 'Coined the category. Built the systems. Wrote the definition.' },
    { _key: randomUUID(), area: 'Fintech Marketing', detail: 'Mortgage, lending, banking, payments, blockchain, RegTech' },
    { _key: randomUUID(), area: 'Go-to-Market Strategy', detail: '120-day sprints from strategy to measurable pipeline' },
    { _key: randomUUID(), area: 'Content & SEO', detail: 'Programmatic and editorial content at scale for regulated industries' },
    { _key: randomUUID(), area: 'Sales-Marketing Alignment', detail: 'Connecting marketing systems to sales operations and revenue' },
    { _key: randomUUID(), area: 'AI-Powered Marketing', detail: 'Compliance-ready AI content and automation systems' },
    { _key: randomUUID(), area: 'Startup Traction', detail: 'Pre-revenue to revenue. GTM strategy through initial operations.' },
  ],
  education: [
    { _key: randomUUID(), degree: 'B.S., Political Science', institution: 'United States Air Force Academy', year: '1992' },
    { _key: randomUUID(), degree: 'MBA, Marketing', institution: 'University of Phoenix', year: '2003' },
  ],
  currentVentures: [
    {
      _key: randomUUID(),
      name: 'Kaleidico',
      role: 'Founder & CRO',
      url: 'https://kaleidico.com/',
      description: 'B2C lead generation agency for mortgage lenders, law firms, and senior living communities.',
    },
    {
      _key: randomUUID(),
      name: 'Bill Rice Strategy Group',
      role: 'Founder & Chief Strategist',
      url: 'https://billricestrategy.com/',
      description: 'B2B content strategy, executive thought leadership, and demand generation for fintech companies.',
    },
    {
      _key: randomUUID(),
      name: 'Verified Vector',
      role: 'Founder',
      url: 'https://verifiedvector.com/',
      description: 'Programmatic SEO and AI marketing agency for fintech companies.',
    },
  ],
  speakingWriting: [
    paragraph([
      'Author of ',
      { text: "The Lead Buyer's Playbook", href: 'https://www.leadbuyerplaybook.com/' },
      ' (2025). Publisher of ',
      { text: 'The Lead Brief', href: 'https://theleadbrief.com/' },
      ' newsletter. Regular speaker at Lead Generation World and fintech industry conferences. Featured guest on 30+ marketing and business podcasts.',
    ]),
    paragraph([
      'Topics: demand generation, lead management systems, AI-driven marketing, B2B growth, sales-marketing alignment, aged lead reconversion, and go-to-market strategy for fintech startups.',
    ]),
  ],
}

async function main() {
  console.log(`Upserting aboutPage (_id: ${doc._id})...`)
  const result = await client.createOrReplace(doc)
  console.log('✓ Seeded:', result._id)
}

main().catch((err) => {
  console.error('Failed to seed aboutPage:', err)
  process.exit(1)
})
