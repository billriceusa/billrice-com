/**
 * Entity graph for billrice.com.
 *
 * Modelled as a single JSON-LD @graph with stable @ids so every node refers to
 * ONE Bill Rice rather than repeating inline Person objects (which reads as
 * several different people). billrice.com is a PERSON's site — the agency
 * entities live on their own domains and are referenced, not redefined here.
 *
 * sameAs is identity only: profiles that unambiguously identify the person.
 * Owned properties are expressed as relationships (worksFor / author / founder),
 * not as sameAs — a site Bill owns is not a site that *is* Bill.
 */

import { BILL_RICE_ID, BILL_RICE_SAME_AS } from './identity'

/**
 * billrice.com is the AUTHORITATIVE description of the person. Every other
 * property Bill owns emits a reference node carrying this same @id — see
 * src/lib/identity.ts and ~/Code/_shared-docs/bill-rice-identity.md.
 */
export const PERSON_ID = BILL_RICE_ID
export const WEBSITE_ID = 'https://billrice.com/#website'
export const KALEIDICO_ID = 'https://kaleidico.com/#organization'
export const BRSG_ID = 'https://billricestrategy.com/#organization'
export const VERIFIED_VECTOR_ID = 'https://verifiedvector.com/#organization'
export const LEAD_BUYERS_PLAYBOOK_ID = 'https://leadbuyersplaybook.com/#book'
export const SALES_TEAM_OF_ONE_ID = 'https://salesteamofone.com/#book'

export const personStructuredData = {
  "@type": "Person",
  "@id": PERSON_ID,
  "name": "Bill Rice",
  "jobTitle": "Fintech Marketing Strategist & Lead Generation Pioneer",
  "description": "Fintech marketing pioneer who coined 'lead management,' was Employee #7 at DeepGreen Bank, built EquityOnline at Quicken Loans, and owned Velocity Lending, a DTC mortgage lender. 30+ years building lead generation platforms for financial services companies. Author of The Lead Buyer's Playbook.",
  "url": "https://billrice.com",
  "mainEntityOfPage": { "@id": WEBSITE_ID },
  "nationality": { "@type": "Country", "name": "United States" },
  "image": {
    "@type": "ImageObject",
    "url": "https://billrice.com/bill-rice-headshot.jpg",
    "width": 1080,
    "height": 1080,
    "caption": "Bill Rice - Fintech Marketing Pioneer & Lead Generation Strategist"
  },
  // Identity only. Profiles that ARE Bill Rice — not properties he owns.
  "sameAs": [...BILL_RICE_SAME_AS],
  // Ownership/affiliation expressed as relationships, by reference.
  "worksFor": [
    { "@id": KALEIDICO_ID },
    { "@id": BRSG_ID },
    { "@id": VERIFIED_VECTOR_ID }
  ],
  "author": [
    { "@id": LEAD_BUYERS_PLAYBOOK_ID },
    { "@id": SALES_TEAM_OF_ONE_ID }
  ],
  "knowsAbout": [
    "Lead Generation",
    "Lead Management",
    "Lead Buying",
    "Mortgage Marketing",
    "Fintech Marketing",
    "B2B Marketing",
    "Demand Generation",
    "Aged Leads",
    "Go-to-Market Strategy",
    "AI-powered Marketing"
  ],
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "United States Air Force Academy",
      "description": "B.S. Political Science, 1992"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "University of Phoenix",
      "description": "MBA, Marketing, 2003"
    }
  ],
  "hasOccupation": [
    {
      "@type": "Occupation",
      "name": "AFOSI Special Agent & Case Officer",
      "occupationalCategory": "Intelligence & Counterespionage",
      "description": "U.S. Air Force Office of Special Investigations — counterespionage operations, information warfare"
    },
    {
      "@type": "Occupation",
      "name": "VP National Home Equity",
      "occupationalCategory": "Fintech Executive",
      "description": "Built the EquityOnline platform at Quicken Loans"
    },
    {
      "@type": "Occupation",
      "name": "Owner / Operator",
      "occupationalCategory": "Mortgage Lending",
      "description": "Owned and ran Velocity Lending, a DTC mortgage lender, 2016-2018"
    },
    {
      "@type": "Occupation",
      "name": "Founder & CRO",
      "occupationalCategory": "Marketing Agency Founder",
      "description": "Founded Kaleidico, coined 'lead management', built icoSales"
    }
  ],
  "memberOf": [
    {
      "@type": "Organization",
      "name": "Lead Generation World",
      "url": "https://leadgenerationworld.com/"
    }
  ],
  "award": "Coined the industry term 'lead management' and authored the original Wikipedia definition",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "bill@billrice.com",
    "contactType": "Professional Inquiries"
  }
};

export const websiteStructuredData = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  "name": "Bill Rice",
  "alternateName": "Bill Rice — Fintech & Lead Generation",
  "url": "https://billrice.com",
  "description": "The canonical record on Bill Rice: 30+ years in mortgage and fintech lead generation, the books, and the writing.",
  "inLanguage": "en-US",
  "copyrightYear": 2026,
  "publisher": { "@id": PERSON_ID },
  "copyrightHolder": { "@id": PERSON_ID },
  "about": { "@id": PERSON_ID }
};

// The companies Bill founded/works for live on their own domains. Referenced
// here so the Person node resolves, but authoritatively defined by those sites.
export const organizationNodes = [
  {
    "@type": "Organization",
    "@id": KALEIDICO_ID,
    "name": "Kaleidico",
    "url": "https://kaleidico.com/",
    "description": "Demand generation agency for mortgage lenders, law firms, and senior living communities. Founded 2005 as a lead management software company (icoSales); pivoted to an agency after 2008.",
    "foundingDate": "2005",
    "founder": { "@id": PERSON_ID }
  },
  {
    "@type": "Organization",
    "@id": BRSG_ID,
    "name": "Bill Rice Strategy Group",
    "url": "https://billricestrategy.com/",
    "description": "B2B marketing strategy consulting for fintech companies.",
    "foundingDate": "2020",
    "founder": { "@id": PERSON_ID }
  },
  {
    "@type": "Organization",
    "@id": VERIFIED_VECTOR_ID,
    "name": "Verified Vector",
    "url": "https://verifiedvector.com/",
    "description": "AI-first marketing agency — every deliverable produced in code.",
    "foundingDate": "2024",
    "founder": { "@id": PERSON_ID }
  }
];

export const bookNodes = [
  {
    "@type": "Book",
    "@id": LEAD_BUYERS_PLAYBOOK_ID,
    "name": "The Lead Buyer's Playbook",
    "alternateName": "The Enterprise Guide to Buying and Converting Leads Profitably",
    "author": { "@id": PERSON_ID },
    "publisher": { "@id": PERSON_ID },
    "url": "https://leadbuyersplaybook.com/",
    "datePublished": "2025-11",
    "bookEdition": "First Edition",
    "bookFormat": "https://schema.org/EBook",
    "description": "The enterprise guide to buying and converting leads profitably. A systematic approach that turns lead buying from a cost center into a competitive advantage.",
    "genre": "Business",
    "inLanguage": "en"
  },
  {
    "@type": "Book",
    "@id": SALES_TEAM_OF_ONE_ID,
    "name": "Sales Team of One",
    "alternateName": "How to Stay Irreplaceable When AI Comes for the Sales Team",
    "author": { "@id": PERSON_ID },
    "publisher": { "@id": PERSON_ID },
    "url": "https://salesteamofone.com/",
    "bookFormat": "https://schema.org/EBook",
    "description": "The sales org that used to feed a seller is being automated out from under the people standing on it. A field guide to being the whole team yourself — and wielding the thing that is coming for everyone else.",
    "genre": "Business",
    "inLanguage": "en"
  }
];

/** The single graph emitted on the homepage. */
export const siteEntityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    personStructuredData,
    websiteStructuredData,
    ...organizationNodes,
    ...bookNodes
  ]
};

/** ProfilePage wrapper for /about — the authoritative page about the person. */
export const aboutProfilePageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://billrice.com/about#profilepage",
      "url": "https://billrice.com/about",
      "name": "About Bill Rice",
      "isPartOf": { "@id": WEBSITE_ID },
      "mainEntity": { "@id": PERSON_ID }
    },
    personStructuredData
  ]
};

// Breadcrumbs helpers
export const breadcrumbHomeToNow = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://billrice.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Now",
      "item": "https://billrice.com/now"
    }
  ]
};

export const breadcrumbHomeToAbout = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://billrice.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://billrice.com/about"
    }
  ]
};

export const breadcrumbHomeToContact = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://billrice.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Contact",
      "item": "https://billrice.com/contact"
    }
  ]
};