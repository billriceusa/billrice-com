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
import {
  BOOKS,
  SERIES_ID,
  SERIES_NAME,
  SERIES_PLANNED_VOLUMES,
  bookNodeId,
  type Book,
} from './books'

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

export const personStructuredData = {
  "@type": "Person",
  "@id": PERSON_ID,
  "name": "Bill Rice",
  "jobTitle": "Author · Founder & CRO, Kaleidico · Principal, Bill Rice Strategy Group",
  "description": "Author of The Lead Buyer's Playbook and Sales Team of One, and of the Team of One library for solo operators and bootstrapping founders. Founder, CRO and co-owner of Kaleidico; founder, principal and owner of Bill Rice Strategy Group. Coined 'lead management,' was Employee #7 at DeepGreen Bank, built EquityOnline at Quicken Loans, and owned Velocity Lending, a DTC mortgage lender — 30+ years on every side of the consumer-direct lead.",
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
  // Every book, plus the series itself, by reference. Generated from
  // src/lib/books.ts so a new title cannot be added to the site without also
  // being claimed here — the drift that left Sales Team of One unlisted.
  "author": [
    ...BOOKS.map((book) => ({ "@id": bookNodeId(book) })),
    { "@id": SERIES_ID }
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
    "AI-powered Marketing",
    // The subjects of the Team of One library, so the author pillar and the
    // expertise claims describe the same person.
    "Founder-Led Sales",
    "Small Business Cash Flow"
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
    // Author leads the list on purpose. It is the pillar this site is being
    // built around, and the first occupation is what most consumers of this
    // graph surface as the person's primary role.
    {
      "@type": "Occupation",
      "name": "Author",
      "occupationalCategory": "Business Nonfiction",
      "description": "Author of The Lead Buyer's Playbook (2025) and Sales Team of One (2026), and of the Team of One library — a planned eight volumes for solo operators and bootstrapping founders, each named for the constraint currently binding the business"
    },
    {
      "@type": "Occupation",
      "name": "Principal & Owner",
      "occupationalCategory": "B2B Strategy Consulting",
      "description": "Founder, principal and owner of Bill Rice Strategy Group, a B2B strategic agency serving fintech companies"
    },
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
      "name": "Founder, CRO & Co-Owner",
      "occupationalCategory": "Marketing Agency Founder",
      "description": "Founded Kaleidico in 2005, coined 'lead management', built icoSales; continues as CRO and co-owner following the agency's acquisition"
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

/**
 * One Book node per entry in src/lib/books.ts.
 *
 * Built rather than hand-written so the graph cannot disagree with the buy
 * buttons. Every optional field is emitted only when the fact is actually
 * known — a forthcoming book with no date is honest, a guessed datePublished
 * is a false claim that outlives the guess.
 */
function toBookNode(book: Book): Record<string, unknown> {
  return {
    "@type": "Book",
    "@id": bookNodeId(book),
    "name": book.title,
    // alternateName is the real subtitle, never a superseded working one.
    ...(book.subtitle ? { "alternateName": book.subtitle } : {}),
    "author": { "@id": PERSON_ID },
    "publisher": { "@id": PERSON_ID },
    "url": book.url,
    ...(book.datePublished ? { "datePublished": book.datePublished } : {}),
    ...(book.isbn ? { "isbn": book.isbn } : {}),
    ...(book.inSeries ? { "isPartOf": { "@id": SERIES_ID } } : {}),
    // A pre-order is a real, priced offer with a start date. Emitting it is
    // what makes the listing eligible to show as orderable rather than as an
    // announcement.
    ...(book.status === 'preorder' && book.amazonUrl
      ? {
          "offers": {
            "@type": "Offer",
            "url": book.amazonUrl,
            "price": book.priceUsd,
            "priceCurrency": "USD",
            "availability": "https://schema.org/PreOrder",
            ...(book.releaseDate ? { "availabilityStarts": book.releaseDate } : {}),
            "seller": { "@type": "Organization", "name": "Amazon.com" }
          }
        }
      : {}),
    "description": book.blurb,
    "genre": "Business",
    "inLanguage": "en"
  }
}

export const bookNodes = BOOKS.map(toBookNode)

/**
 * The series as its own entity, so "author of a body of work" is a claim the
 * graph can actually represent — not just three unrelated Book nodes.
 *
 * No `position` on any member and no numberOfItems: per the series bible this
 * is a library with no reading order, and every volume opens cold.
 */
export const seriesNode = {
  "@type": "BookSeries",
  "@id": SERIES_ID,
  "name": SERIES_NAME,
  "author": { "@id": PERSON_ID },
  "publisher": { "@id": PERSON_ID },
  "description": `A library of ${SERIES_PLANNED_VOLUMES} short books for the solo consultant and the bootstrapping founder — one person, or one person plus a few. Each volume is named for the constraint that is currently binding the business rather than for a department, and each stands alone: there is no reading order.`,
  "genre": "Business",
  "inLanguage": "en",
  "hasPart": BOOKS.filter((book) => book.inSeries).map((book) => ({
    "@id": bookNodeId(book)
  }))
};

/** The single graph emitted on the homepage. */
export const siteEntityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    personStructuredData,
    websiteStructuredData,
    ...organizationNodes,
    seriesNode,
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
    personStructuredData,
    // The Person node claims authorship by @id. Without these, those refs
    // dangle on the one page that is meant to be the authoritative
    // description of the person — so the books ride along here too.
    seriesNode,
    ...bookNodes
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