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
      'Bill Rice is a fintech marketing pioneer with 30+ years building lead generation platforms and revenue systems for financial services companies. He coined "lead management," was Employee #7 at DeepGreen Bank (one of the first internet-only banks, sold to LightYear Capital in 2004), built EquityOnline at Quicken Loans, founded Kaleidico as a lead management software company in 2005 (later pivoted to a demand generation agency), and owned Velocity Lending — a DTC mortgage lender — from 2016 to 2018 as a live proof-of-concept. Today he is CRO at Kaleidico (post-acquisition), founder of Bill Rice Strategy Group (B2B strategic agency for fintech), and founder of Verified Vector (AI-first agency).',
    medium:
      'Bill Rice is a fintech marketing pioneer who has spent 30+ years building lead generation platforms and revenue systems for financial services companies. He started his career as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), running counterespionage operations, then made the jump to fintech as Employee #7 at DeepGreen Bank — one of the first internet-only banks, which grew to about 80 people before its sale to LightYear Capital in 2004. At Quicken Loans (now Rocket Mortgage), he initially joined as COO of the Rock Bank project and then pivoted to VP of National Home Equity, where he built EquityOnline — their first true online lending platform. He founded Kaleidico in 2005 as a lead management software company (pivoted to a demand generation agency after the 2008 mortgage meltdown), coined "lead management" as an industry category, and authored the original Wikipedia page. From 2016 to 2018 he owned and operated Velocity Lending, a DTC mortgage lender, as a live proof-of-concept for the Kaleidico playbook. Today he is CRO at Kaleidico (having retained 10% ownership post-acquisition), founder of Bill Rice Strategy Group (B2B strategic agency serving longtime fintech referral partners), and founder of Verified Vector (AI-first agency with no employees — just AI agents and Bill, with every deliverable produced in code). He is the author of The Lead Buyer\'s Playbook and publishes The Lead Brief newsletter.',
    full:
      'Bill Rice is a fintech marketing pioneer who has spent 30+ years building lead generation platforms and revenue systems for financial services companies. His career began as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI, USAFA \'92), conducting counterespionage operations during the earliest days of the internet. He transitioned to fintech in 2000 as Employee #7 at DeepGreen Bank, one of the very first internet-only banks in the United States; DeepGreen grew to about 80 people running what functionally behaved like a billion-dollar bank and launched the industry\'s first unconditional online HELOC before its sale to LightYear Capital in 2004. From there Bill joined Quicken Loans (now Rocket Mortgage), initially as COO of the Rock Bank project and then pivoting to Vice President of National Home Equity, where he led the design and build of EquityOnline — Quicken Loans\' first true online lending and offer platform. In 2005 he founded Kaleidico, originally as a lead management software company built around icoSales, an intelligent lead scoring and distribution platform for mortgage call centers buying thousands of internet leads. He coined the term "lead management" to differentiate platforms that work leads from CRMs that manage customers — "there was no relationship yet" — and authored the original Wikipedia page for the category. After the 2008 mortgage meltdown destroyed his call-center lender client base, he pivoted Kaleidico into the demand generation agency it is today. He also served as growth marketing consultant for Quizzle (later acquired by Bankrate), built the initial GTM strategy, website, lead generation, and launch operations for SpringEQ in 2016, and — from 2016 to 2018 — owned and operated Velocity Lending, a DTC mortgage lender he built as a live proof-of-concept for the Kaleidico playbook. Today he runs three companies: Kaleidico, where he serves as CRO following the agency\'s acquisition and liquidity event (he retained 10% ownership and continues to lead business development, sales, and marketing strategy and execution); Bill Rice Strategy Group, his B2B strategic agency serving fintech companies (many of them longtime referral partners who have been satellites in the same ecosystem Kaleidico has worked in for two decades); and Verified Vector, his AI-first agency with no employees — just AI agents and Bill, with every deliverable (strategy, content, presentations, sales, marketing) produced in code. He operates a portfolio of authority content sites including AgedLeadSales.com, ProInvestorHub.com, CryptoLendingHub.com, HowToWorkLeads.com, and DemoLeadGen.com. He is the author of The Lead Buyer\'s Playbook (2025), publisher of The Lead Brief newsletter, a regular speaker at Lead Generation World and fintech conferences, and a featured guest on 30+ marketing and business podcasts. Education: B.S. Political Science, United States Air Force Academy (1992); MBA Marketing, University of Phoenix (2003).',
  },

  titles: [
    'CRO, Kaleidico (Founder; retained 10% post-acquisition)',
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
      role: 'Founder & CRO (retained 10% post-acquisition)',
      url: 'https://kaleidico.com/',
      description: 'Demand generation agency for mortgage lenders, law firms, and senior living communities. Founded 2005 (started as lead management software; pivoted to full-service agency after 2008). Following the agency\'s acquisition and liquidity event, Bill retained 10% ownership and transitioned into the CRO role, continuing to lead business development, sales, and marketing strategy and execution.',
    },
    {
      name: 'Bill Rice Strategy Group',
      role: 'Founder & Chief Strategist',
      url: 'https://billricestrategy.com/',
      description: 'B2B strategic agency for fintech companies — many of them longtime referral partners and friends operating as satellites in the same ecosystem Kaleidico has worked in for two decades. Engages at a strategic level, bringing the systems and processes that fueled Kaleidico\'s growth from bootstrap to acquisition.',
    },
    {
      name: 'Verified Vector',
      role: 'Founder',
      url: 'https://verifiedvector.com/',
      description: 'AI-first agency — a playground and proof of concept that an agency can be run largely as an AI-first organization. No employees. Just AI agents and Bill. Every deliverable (strategy, content, presentations, sales, marketing) is produced in code.',
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
    { year: '1992-2000', role: 'AFOSI Special Agent & Case Officer, Information Warfare', org: 'USAF / TASC / Iridium Communications' },
    { year: '2000-2004', role: 'Employee #7 (grew to ~80 people), launched first unconditional online HELOC; sold to LightYear Capital 2004', org: 'DeepGreen Bank' },
    { year: '2004-2005', role: 'COO of Rock Bank project, then VP National Home Equity — built EquityOnline', org: 'Quicken Loans' },
    { year: '2005', role: 'Founded as lead management software company (icoSales); coined "lead management"; pivoted to demand gen agency after 2008; currently CRO (10% retained) post-acquisition', org: 'Kaleidico' },
    { year: '2008-2012', role: 'Growth marketing consultant (acquired by Bankrate)', org: 'Quizzle' },
    { year: '2016-2018', role: 'Owner / operator — DTC mortgage lender, proof-of-concept for Kaleidico playbook', org: 'Velocity Lending' },
    { year: '2016', role: 'GTM strategy, website, lead gen, and launch', org: 'SpringEQ' },
    { year: '2020', role: 'Founded B2B strategic agency for fintech (longtime referral partners)', org: 'Bill Rice Strategy Group' },
    { year: '2024', role: 'Founded AI-first agency — no employees, everything delivered in code', org: 'Verified Vector' },
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
