import { NextRequest, NextResponse } from 'next/server';

const bioData = {
  name: 'Bill Rice',
  url: 'https://billrice.com',
  email: 'bill@billrice.com',
  location: 'Ocala, FL',
  headshot: 'https://billrice.com/bill-rice-headshot.jpg',

  bios: {
    oneLiner:
      'Bill Rice is a fintech marketing strategist who coined "lead management" and helps financial services companies build scalable, predictable customer acquisition systems.',
    short:
      'Bill Rice is a fintech marketing pioneer with 30+ years building lead generation platforms and revenue systems for financial services companies. He coined the term "lead management," was Employee #7 at DeepGreen Bank (one of the first internet-only banks), built EquityOnline at Quicken Loans, and founded Kaleidico, Bill Rice Strategy Group, and Verified Vector.',
    medium:
      'Bill Rice is a fintech marketing pioneer who has spent 30+ years building lead generation platforms and revenue systems for financial services companies. He started his career as a U.S. Air Force intelligence officer running counterespionage operations, then made the jump to fintech as Employee #7 at DeepGreen Bank, one of the first internet-only banks, where he helped launch the industry\'s first unconditional online HELOC. At Quicken Loans (now Rocket Mortgage), he served as VP of National Home Equity and built EquityOnline, their first true online lending platform. He coined the term "lead management" and authored the original Wikipedia page for the category. He founded Kaleidico (B2C lead gen agency), Bill Rice Strategy Group (B2B fintech consulting), and Verified Vector (programmatic SEO and AI marketing). He is the author of The Lead Buyer\'s Playbook and publishes The Lead Brief newsletter.',
    full:
      'Bill Rice is a fintech marketing pioneer who has spent 30+ years building lead generation platforms and revenue systems for financial services companies. His career began as a U.S. Air Force intelligence officer (USAFA \'92) specializing in counterespionage operations during the earliest days of the internet. He transitioned to fintech in 2000 as Employee #7 at DeepGreen Bank, one of the very first internet-only banks in the United States, where he helped launch the industry\'s first unconditional online HELOC. He was then recruited to Quicken Loans (now Rocket Mortgage) as Vice President of National Home Equity, where he led the design and build of EquityOnline — Quicken Loans\' first true online lending and offer platform. In 2005 he founded Kaleidico, a demand generation agency, and built icoSales, an intelligent lead scoring and distribution platform. He coined the term "lead management" to differentiate platforms that work leads from CRMs that manage customers — "there was no relationship yet" — and authored the original Wikipedia page for the category. He served as growth marketing consultant for Quizzle (later acquired by Bankrate) and built the initial GTM strategy, website, lead generation, and launch operations for SpringEQ. Today he runs three companies: Kaleidico (B2C lead generation for mortgage, legal, and senior living), Bill Rice Strategy Group (B2B content strategy and demand generation for fintech), and Verified Vector (programmatic SEO and AI marketing). He operates a portfolio of authority content sites including AgedLeadSales.com, ProInvestorHub.com, CryptoLendingHub.com, HowToWorkLeads.com, and DemoLeadGen.com. He is the author of The Lead Buyer\'s Playbook (2025), publisher of The Lead Brief newsletter, a regular speaker at Lead Generation World and fintech conferences, and a featured guest on 30+ marketing and business podcasts. Education: B.S. Political Science, United States Air Force Academy (1992); MBA Marketing, University of Phoenix (2003).',
  },

  titles: [
    'Founder & CRO, Kaleidico',
    'Founder & Chief Strategist, Bill Rice Strategy Group',
    'Founder, Verified Vector',
  ],

  social: {
    linkedin: 'https://www.linkedin.com/in/billrice/',
    twitter: 'https://twitter.com/billrice',
    youtube: 'https://www.youtube.com/@billricestrategy',
  },

  companies: [
    {
      name: 'Kaleidico',
      role: 'Founder & CRO',
      url: 'https://kaleidico.com/',
      description: 'B2C lead generation agency for mortgage lenders, law firms, and senior living communities.',
    },
    {
      name: 'Bill Rice Strategy Group',
      role: 'Founder & Chief Strategist',
      url: 'https://billricestrategy.com/',
      description: 'B2B content strategy, executive thought leadership, and demand generation for fintech companies.',
    },
    {
      name: 'Verified Vector',
      role: 'Founder',
      url: 'https://verifiedvector.com/',
      description: 'Programmatic SEO and AI marketing agency for fintech companies.',
    },
  ],

  projects: [
    { name: 'Aged Lead Sales', url: 'https://agedleadsales.com/', description: 'Sales training and education for working aged leads.' },
    { name: 'How to Work Leads', url: 'https://www.howtoworkleads.com/', description: 'Practical strategies for converting leads into customers.' },
    { name: 'ProInvestorHub', url: 'https://proinvestorhub.com/', description: 'Real estate investing education with guides, calculators, and market data.' },
    { name: 'CryptoLendingHub', url: 'https://cryptolendinghub.com/', description: 'Crypto lending education with platform reviews and rate comparisons.' },
    { name: 'The Lead Brief', url: 'https://theleadbrief.com/', description: 'Weekly newsletter and podcast on lead generation strategy.' },
    { name: 'DemoLeadGen', url: 'https://demoleadgen.com/', description: 'Interactive lead generation demo platform.' },
  ],

  books: [
    {
      title: "The Lead Buyer's Playbook",
      subtitle: 'The Enterprise Guide to Buying and Converting Leads Profitably',
      year: 2025,
      url: 'https://www.leadbuyerplaybook.com/',
      amazon: 'https://www.amazon.com/dp/B0DRBK6QJZ',
    },
  ],

  expertise: [
    'Demand Generation',
    'Lead Management',
    'Fintech Marketing',
    'Go-to-Market Strategy',
    'Content & SEO',
    'Sales-Marketing Alignment',
    'AI-Powered Marketing',
    'Startup Traction',
  ],

  careerHighlights: [
    { year: '1992-2000', role: 'U.S. Air Force Officer & Intelligence Operations', org: 'USAF / TASC / Iridium Communications' },
    { year: '2000', role: 'Employee #7, launched first unconditional online HELOC', org: 'DeepGreen Bank' },
    { year: '2002-2005', role: 'VP National Home Equity, built EquityOnline', org: 'Quicken Loans' },
    { year: '2005', role: 'Founded agency, built icoSales, coined "lead management"', org: 'Kaleidico' },
    { year: '2008-2012', role: 'Growth marketing consultant (acquired by Bankrate)', org: 'Quizzle' },
    { year: '2018', role: 'GTM strategy, website, lead gen, and launch', org: 'SpringEQ' },
    { year: '2020', role: 'Founded B2B consulting for fintech', org: 'Bill Rice Strategy Group' },
    { year: '2024', role: 'Founded programmatic SEO & AI marketing agency', org: 'Verified Vector' },
    { year: '2025', role: 'Published The Lead Buyer\'s Playbook', org: '' },
  ],

  education: [
    { degree: 'B.S. Political Science', institution: 'United States Air Force Academy', year: 1992 },
    { degree: 'MBA, Marketing', institution: 'University of Phoenix', year: 2003 },
  ],

  speakingTopics: [
    'Enterprise Lead Buying Strategy',
    'AI-Powered Marketing for Fintech Companies',
    'Building Predictable B2B Revenue Pipelines',
    'Building Authority-Driven Niche Content Sites',
    'Compliance-First Marketing in Regulated Industries',
    'Lead Management Systems and Optimization',
    'Go-to-Market Strategy for Fintech Startups',
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');
  const bioLength = searchParams.get('length') as keyof typeof bioData.bios | null;

  // If requesting just a bio string
  if (format === 'text' && bioLength && bioData.bios[bioLength]) {
    return new NextResponse(bioData.bios[bioLength], {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // If requesting a specific section
  const section = searchParams.get('section') as keyof typeof bioData | null;
  if (section && section in bioData) {
    return NextResponse.json(bioData[section], {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // Full response
  return NextResponse.json(bioData, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
