/**
 * What Bill is working on now.
 *
 * Defined here, once, because /now had no fallback at all: every section is
 * gated on a non-empty array from Sanity, so with the dataset unreachable the
 * page rendered as a bare header and a contact box. The Sanity side is also in
 * worse shape than it looks — there are two `nowPage` documents and the query
 * takes `[0]` with no ordering, so which one a reader gets is not defined.
 *
 * scripts/seed-now-page.ts imports this and converts it to portable text, so
 * the copy that seeds Sanity and the copy that renders without Sanity are the
 * same copy. Editing it in Studio is still fine; Sanity wins when it answers.
 *
 * Editorial note: the lead-marketplace client below is deliberately unnamed.
 * Naming current-client work breaks the confidentiality rule this estate holds
 * itself to (see BACKLOG, editorial rulebook #2) — vendors can be named under
 * critique, clients cannot be named as build examples.
 */

export type NowSegment = string | { text: string; href: string }

export type NowPriority = {
  title: string
  body: NowSegment[]
}

export const NOW_LAST_UPDATED = '2026-10-11'

export const NOW_PRIORITIES: NowPriority[] = [
  {
    title: 'AI-Powered Sales and Marketing Systems',
    body: [
      'Designing and building the systems themselves through ',
      { text: 'Bill Rice Strategy Group', href: 'https://billricestrategy.com/' },
      ' — not slide decks about them. The work is pairing a seller or a small revenue team with AI leverage so the output looks like a department: research, targeting, outreach, follow-up and the reporting that proves what worked. Most of what used to require headcount is now a system somebody has to actually build.',
    ],
  },
  {
    title: 'AI Content Marketing, SEO and Thought Leadership',
    body: [
      'Building content engines that earn visibility in search and in the models people now ask instead of searching. That means original market research rather than commentary on somebody else’s — industry whitepapers, primary data, and the kind of position pieces a founder can defend on a panel. Being cited by an LLM and ranking in a SERP are converging into the same problem, and both reward the same thing: saying something only you can say.',
    ],
  },
  {
    title: 'Custom CRM and Lead Management Software',
    body: [
      'Back to building software, which is where this career started. Currently developing a custom lead management platform and an autonomous CRM for a lead marketplace operator — a system that works the pipeline on its own and escalates to a human when something needs judgment, rather than one that waits for a human to remember to work it. Twenty years after coining the term, the interesting question is no longer how to manage leads but how little management they should need.',
    ],
  },
  {
    title: 'Sales Team of One',
    body: [
      { text: 'Sales Team of One', href: 'https://salesteamofone.com/' },
      ' releases on 20 October 2026. It argues that the sales org that used to feed a seller is being automated out from under the people standing on it, and that the one safe seat left is being the whole team yourself. Written in the open — the chapters are free to read now.',
    ],
  },
]

export const NOW_SPEAKING_TOPICS = [
  'AI-Powered Sales and Marketing Systems',
  'Enterprise Lead Buying Strategy',
  'Staying Irreplaceable When AI Comes for the Sales Team',
  'Building Predictable B2B Revenue Pipelines',
  'Compliance-First Marketing in Regulated Industries',
]

export const NOW_CONSULTING_AVAILABILITY =
  'Currently accepting strategic consulting engagements for fintech companies and B2B organizations building AI-powered sales and marketing systems, content and search visibility programs, or custom lead management software.'
