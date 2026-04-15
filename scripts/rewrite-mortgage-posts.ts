/**
 * Rewrite the 2 mortgage KPI/metrics posts in Bill Rice's voice.
 *
 * Replaces title, excerpt, body, and category on each doc. Keeps the
 * existing _id, slug, and publishedAt date intact.
 *
 * Usage: npx tsx scripts/rewrite-mortgage-posts.ts
 * Requires SANITY_API_TOKEN in .env.local.
 */

import { createClient } from 'next-sanity'
import { randomUUID } from 'crypto'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'st1plnki',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-21',
  useCdn: false,
  token,
})

type Segment = string | { text: string; href: string } | { text: string; bold: true }

function para(segments: Segment[], style: 'normal' | 'h2' | 'h3' = 'normal') {
  const markDefs: Array<{ _key: string; _type: 'link'; href: string }> = []
  const children = segments.map((seg) => {
    if (typeof seg === 'string') {
      return { _type: 'span', _key: randomUUID(), text: seg, marks: [] as string[] }
    }
    if ('href' in seg) {
      const key = randomUUID()
      markDefs.push({ _key: key, _type: 'link', href: seg.href })
      return { _type: 'span', _key: randomUUID(), text: seg.text, marks: [key] }
    }
    return { _type: 'span', _key: randomUUID(), text: seg.text, marks: ['strong'] }
  })
  return { _type: 'block', _key: randomUUID(), style, markDefs, children }
}

function h2(text: string) {
  return para([text], 'h2')
}

// Simple paragraph from plain string
function p(text: string) {
  return para([text])
}

// ─────────────────────────────────────────────────────────
// POST 1: mortgage-lenders-measuring-wrong-kpis
// ─────────────────────────────────────────────────────────

const post1Title = 'The Mortgage KPIs I Actually Watch (And the Ones Most Lenders Get Wrong)'
const post1Excerpt =
  "I've spent 30+ years building mortgage lending operations — from DeepGreen Bank to EquityOnline at Quicken Loans to a hundred-plus Kaleidico clients. Here are the KPIs I watch, and the ones I've learned to ignore."
const post1Body = [
  p("I've spent 30+ years inside mortgage lending operations. I was Employee #7 at DeepGreen Bank in 2000. I built EquityOnline as VP of National Home Equity at Quicken Loans. I founded Kaleidico in 2005 and have run lead generation and marketing engagements for a hundred-plus mortgage lenders since. I've watched the industry through the 2008 crash, the refi booms, the QM era, the rate spikes, and now the AI-plus-compliance era."),
  p("Across all of it, the most consistent pattern I see is this: most mortgage lenders are measuring the wrong things. They track metrics that feel important because they've always been tracked, while the metrics that actually determine whether the business makes money go unmeasured or get measured so poorly that the data is meaningless."),
  p("This post is the short version of what I watch when I walk into a lender's operation, and what I've learned to stop paying attention to."),

  h2('The KPIs I watch'),

  p("Here are the metrics that actually predict whether a mortgage lending operation is going to be profitable in the next 12 months."),

  para([{ text: 'Effective CPA per funded loan, by channel.', bold: true }, " Not cost per lead. Not cost per application. Cost per funded loan, broken out by every acquisition channel. This is the number that tells you whether your marketing spend is actually producing revenue, and it's the number most lenders either don't calculate or calculate so loosely that the channels can't be compared. When I'm auditing an operation, this is the first view I ask for. If the lender can't produce it in a week, the operation has a data problem that's almost certainly costing them money."]),

  para([{ text: 'Speed-to-first-contact.', bold: true }, " The data has been unchanged for 20 years: a lead contacted in the first five minutes converts at a multiple of the same lead contacted at 30 minutes, which converts at a multiple of the same lead contacted at two hours. I built icoSales at Kaleidico specifically to attack this metric. If a lender's median speed-to-first-contact is measured in hours, their sales operation is leaving conversions on the floor every day."]),

  para([{ text: 'Contact rate per lead source.', bold: true }, " What percentage of the leads I bought from Vendor X did my team actually get on the phone? This is the metric that separates good vendors from bad vendors, and it's almost entirely independent of lead price. A cheap vendor with a 20% contact rate is more expensive than an expensive vendor with a 45% contact rate. The effective economics don't show up until you measure this."]),

  para([{ text: 'Application-to-funded rate, by source cohort.', bold: true }, " A 60% application-to-close rate on pre-qualified leads is a completely different number than a 60% rate on unqualified leads. Aggregate conversion numbers hide the variance that matters. I insist on seeing this metric cohorted by source and product mix, because the averages lie."]),

  para([{ text: 'Dial attempts per lead.', bold: true }, " Most mortgage sales floors under-dial. The research is consistent across verticals: 8-12 attempts over 14 days is a reasonable baseline. Most floors average 2-4 attempts before abandoning a lead. The lenders that enforce a disciplined cadence convert materially more loans from the same lead inventory. This metric surfaces the discipline problem."]),

  para([{ text: 'Lead-to-funded payback period.', bold: true }, " How many weeks or months between when the lead cost was spent and when the funded loan revenue hits the P&L? This matters for cash flow planning and for identifying channels where the economics are structurally broken even if the nominal CAC looks acceptable."]),

  para([{ text: 'Loan officer productivity, measured in funded loans per week.', bold: true }, " Not calls made. Not applications taken. Funded loans per LO per week, with a rolling four-week average. This is the only LO metric that matters at the operational level, and it's the one I've watched lenders under-measure the most."]),

  h2("The KPIs I've learned to ignore"),

  p("Here are the metrics that get obsessive attention in most mortgage operations but tell you almost nothing useful."),

  para([{ text: 'Monthly funded volume in absolute terms.', bold: true }, " Celebrating a record month is fine, but absolute volume without unit economics context tells you nothing about the health of the business. I've watched lenders hit record volume while burning cash on negative-margin loans. The volume number is a vanity metric unless it's paired with a margin view."]),

  para([{ text: 'Raw application counts.', bold: true }, " An application is an ambiguous object. Some lenders count every form submission as an application. Others require full documentation before the count increments. Comparing application counts across lenders, or even across periods at the same lender if the definition drifted, is essentially meaningless."]),

  para([{ text: 'Average loan size.', bold: true }, " Optimizing for average loan size usually means chasing jumbo loans at the expense of diversified business. The metric drives portfolio concentration, which is the opposite of what you want during a rate cycle. I track loan size distribution, not averages."]),

  para([{ text: 'Raw lead counts.', bold: true }, " The number of leads bought this month tells me nothing about whether the marketing spend is productive. A lender buying 5,000 leads at a $40 CPL with a 5% contact rate is often running a worse program than a lender buying 1,500 leads at $80 CPL with a 42% contact rate. Raw counts without quality context are noise."]),

  para([{ text: 'Pull-through rate as a headline number.', bold: true }, " I care about pull-through at the cohort level, not at the aggregate level. Aggregate pull-through hides the source-level variance that actually tells you what's working. A 72% aggregate pull-through that's a 90% rate on your best source and a 35% rate on your worst is a different operational picture than a uniformly mediocre 72%."]),

  h2('Why the industry gets this wrong'),

  p("Three reasons the wrong KPIs dominate mortgage lending dashboards."),

  p("First, path dependency. The metrics most mortgage operations track today are the metrics they tracked in 2005, with minor iterations. The industry has gotten dramatically more sophisticated in data infrastructure, but the KPIs that get executive attention are still mostly inherited from an earlier era."),

  p("Second, LOS and CRM default reports. Most lenders live inside their loan origination system and their CRM, and the default reports those systems generate happen to emphasize the legacy KPIs. Changing what gets reported requires effort that most operations teams don't have the bandwidth to invest, so the default wins."),

  p("Third, executive discomfort with unit economics. Lenders that started in high-volume, low-competition markets could cover operational waste with transaction volume. The executives who ran those operations are not natural unit-economics thinkers. Moving to a margin-first, effective-CPA view feels like a cultural shift, not just a reporting change."),

  p("None of these are good reasons to keep measuring the wrong things. They're just the reasons the wrong measurement persists."),

  h2('What to do about it'),

  p("If you're running a mortgage lending operation and you want to stop measuring the wrong things, the fix is neither fast nor glamorous."),

  p("Start with one week of building a one-page view that shows effective CPA per funded loan, contact rate, and application-to-funded rate, broken out by every acquisition channel. If your team can't produce this view in a week, you have a data pipeline problem that needs to be solved before any other KPI work matters."),

  p("Once you have that view, run it weekly. Make it the opening dashboard in every operations meeting. Kill channels where the effective CPA exceeds your margin envelope. Double-down on channels where the effective CPA is below your target. Ignore vendor claims that contradict your own cohort data."),

  p("Then add the cadence and speed-to-contact discipline. Most operations gain 15-25% in funded loan throughput just from tightening cadence and first-touch speed, without any additional marketing spend. That's pure margin."),

  p("The lenders I've worked with who committed to this kind of KPI discipline tend to outperform their peers not by some flashy marketing advantage but by the compounding effect of measuring and optimizing the right things over a multi-year period. The lenders who keep tracking monthly funded volume and average loan size keep being surprised when their margin compresses."),

  h2('The bottom line'),

  p("Mortgage lending is not going to get easier in the next five years. Rate volatility, compliance complexity, AI-driven competitor efficiency, and the ongoing consolidation wave are all going to pressure unit economics. The lenders that survive and compound will be the ones who measure the right things and make operational decisions based on what the data actually says."),

  para([
    'I advise mortgage lenders on exactly these questions through ',
    { text: 'Kaleidico', href: 'https://kaleidico.com/' },
    ' and ',
    { text: 'Bill Rice Strategy Group', href: 'https://billricestrategy.com/' },
    ". If your operation is running on the wrong KPIs and you want to fix it, ",
    { text: 'reach out', href: 'https://billricestrategy.com/' },
    ".",
  ]),

  p("And if you want the full lead-buying side of this discipline, that's the subject of my book, "),

  para([
    { text: "The Lead Buyer's Playbook", href: 'https://www.leadbuyerplaybook.com/' },
    ". Free online or on Amazon.",
  ]),
]

// ─────────────────────────────────────────────────────────
// POST 2: 5-lead-generation-metrics-mortgage-lender-gets-wrong
// ─────────────────────────────────────────────────────────

const post2Title = '5 Lead Generation Metrics Every Mortgage Lender Gets Wrong'
const post2Excerpt =
  "I've been buying, generating, and converting mortgage leads since 2000. These are the 5 lead gen metrics most mortgage lenders measure wrong — and what to measure instead."
const post2Body = [
  p("In 2000, I joined DeepGreen Bank as Employee #7 and helped launch the industry's first unconditional online HELOC. In 2002, I went to Quicken Loans as VP of National Home Equity and built EquityOnline. In 2005, I founded Kaleidico, and I've been running lead generation programs for mortgage lenders ever since."),
  p("Across that 25-year stretch of building, buying, and converting mortgage leads, there are five lead generation metrics I see mortgage lenders measure wrong almost universally. These aren't small errors. Each one materially distorts operational decision-making and usually costs the lender money in ways they never surface."),
  p("Here are the five, and what I use instead."),

  h2('1. Cost per lead'),

  p("The most-tracked metric in mortgage lead generation is also the least informative."),

  p("Cost per lead tells you what you paid. It tells you nothing about what you got. A lead from Vendor A at $40 and a lead from Vendor B at $80 look like a 2x price difference on the CPL report. In my experience, the actual economic difference between the two is almost never 2x and is frequently inverted — the $80 lead often produces more revenue per funded loan, a higher contact rate, and a shorter payback period than the $40 lead."),

  p("CPL is an input variable. It should not be the headline number on any lead gen dashboard."),

  para([{ text: 'What I watch instead: ', bold: true }, "Effective CPA per funded loan, by source. The actual question is, how many dollars did I spend in this channel, divided by how many dollars of funded revenue did I generate from this channel? That's the number that tells me whether the channel is working. Every other lead-gen metric is supporting detail."]),

  h2('2. Conversion rate'),

  p("The second most-cited metric after CPL is conversion rate, usually stated in the abstract ('our conversion rate is 8%') as if that number were comparable across periods or across lenders."),

  p("It isn't. Conversion rate is a ratio between two variables — the numerator (funded loans, or applications, or whatever stage you measure) and the denominator (leads bought, or applications taken, or whatever precedes the numerator). Both the numerator and the denominator can be defined differently by different operators, different periods, and different vendors. An aggregate conversion rate of 8% at Lender A is often not comparable to 8% at Lender B."),

  p("Even within the same lender, the aggregate conversion rate hides the variance that actually matters. A lender converting 10% on good vendors and 2% on bad vendors has a meaningfully different operational picture than a lender converting a uniform 6% across all sources."),

  para([{ text: 'What I watch instead: ', bold: true }, "Cohorted conversion rates, segmented by lead source, product mix, and time vintage. The aggregate number is the headline for the CFO meeting. The cohorted view is what actually drives operational decisions."]),

  h2('3. Lead volume'),

  p("Every lender I've ever worked with has been able to tell me how many leads they bought or generated last month. Most of them have not been able to tell me what percentage of those leads were ever contacted by a human, and most of the remainder can't tell me what the distribution of contact attempts per lead looks like."),

  p("Lead volume without a quality-of-work overlay is a vanity metric. It feels important because it's a big number, but it tells you almost nothing about the productive output of the program."),

  p("I've audited lenders buying 5,000 leads a month where 40% never received a single dial attempt. The lead cost spent on those 2,000 leads was effectively zero-return. The lender tracked the 5,000 lead count in their dashboard and treated it as a sign of program scale. It was actually a sign of program waste."),

  para([{ text: 'What I watch instead: ', bold: true }, "Worked leads — specifically, leads that received the full dial cadence (typically 8-12 attempts over 14 days). That's the number of leads your operation actually worked. If worked leads is dramatically lower than purchased leads, you have a capacity or process problem, and buying more leads won't fix it."]),

  h2('4. Speed to first response'),

  p("Most lenders I meet track this metric, and most of them track it poorly."),

  p("The common mistake is measuring speed to first response as an aggregate, with any response counted — an automated email, an SMS autoresponder, a voicemail. Those are not first responses. The lead doesn't care that your CRM fired an auto-email 12 seconds after form submission. The lead cares whether a human loan officer actually got them on the phone."),

  p("The metric that moves conversions is time from lead receipt to live conversation with a human. Everything else is theater. I've watched lenders celebrate sub-minute 'response times' that were purely automated, while their actual human contact time was measured in hours."),

  para([{ text: 'What I watch instead: ', bold: true }, "Median time from lead receipt to live human conversation, on leads where contact was eventually made. Broken out by hour of day. Broken out by day of week. This metric surfaces the capacity gaps and the staffing misalignments that are costing the operation real money."]),

  h2('5. Average loan size'),

  p("Mortgage lenders love to track average loan size because it's an easy number to produce and it usually trends in a direction they can spin as positive. It is also nearly useless as a standalone metric."),

  p("Average loan size is driven by geographic mix, product mix, market conditions, and the distribution of borrowers a lender happens to attract — all variables that have very little to do with the lender's operational performance. A rising average loan size can mean the lender is winning more affluent borrowers. It can also mean the lender is losing the lower-loan-size business, concentrating into jumbo products, or simply being carried along by housing price appreciation."),

  p("When a lender cites rising average loan size as a positive KPI, I almost always discover that the underlying portfolio concentration is getting worse, not better."),

  para([{ text: 'What I watch instead: ', bold: true }, "Loan size distribution — what percentage of funded loans falls into each $100K bucket. That view shows whether the business is actually diversified or is concentrating into a narrower slice of the market. Concentration looks like strength in a good rate environment and like fragility when the environment shifts."]),

  h2('The pattern underneath the five mistakes'),

  p("Look at these five metrics together and a pattern emerges. The commonly-tracked mortgage lead generation metrics are almost all aggregate, absolute, or volume-oriented. The metrics that actually drive operational decisions are cohort-based, ratio-based, or quality-adjusted."),

  p("That's not a coincidence. Aggregate metrics are easier to produce. They're what the LOS and CRM report by default. They make for good executive dashboards. Cohort-based metrics require more effort, more discipline, and often some custom data work."),

  p("The lenders that win the next five years will be the ones that put in the work to measure the right things. The ones that keep celebrating monthly volume and average loan size while their effective CPA rises and their margin compresses are the ones that are going to show up in the 2028 consolidation stories."),

  h2('A practical starting point'),

  p("If you're a mortgage lender running on the standard KPI set and you want to upgrade, here's the first step I recommend."),

  p("Produce one view, updated weekly, that shows these four numbers by acquisition channel:"),

  p("1. Dollars spent"),
  p("2. Funded loans produced"),
  p("3. Effective CPA (dollars spent divided by funded loans)"),
  p("4. Median time to live human contact for leads from that channel"),

  p("That's it. Four numbers, weekly, by channel. If you can't produce this view today, getting to where you can produce it is the single highest-leverage KPI work you can do."),

  p("Once you have the view, run your operations meetings off it. Kill channels where the effective CPA exceeds your margin envelope. Double-down on channels where it's below. Fix the speed-to-contact issues on channels where the response times are clearly inadequate."),

  p("The compounding impact of running a tight program on the right metrics is, in my experience, the single biggest operational advantage available to a mortgage lender right now. It's harder to build than a new marketing campaign, but the return on the effort is substantially larger."),

  para([
    "I help mortgage lenders build this kind of measurement discipline through ",
    { text: 'Kaleidico', href: 'https://kaleidico.com/' },
    ' and advise on lead acquisition economics more broadly at ',
    { text: 'Bill Rice Strategy Group', href: 'https://billricestrategy.com/' },
    '. The full framework for the buy side of this is in ',
    { text: "The Lead Buyer's Playbook", href: 'https://www.leadbuyerplaybook.com/' },
    '.',
  ]),
]

// ─────────────────────────────────────────────────────────

const rewrites = [
  {
    id: 'mortgage-lenders-measuring-wrong-kpis',
    title: post1Title,
    excerpt: post1Excerpt,
    body: post1Body,
  },
  {
    id: '5-lead-generation-metrics-mortgage-lender-gets-wrong',
    title: post2Title,
    excerpt: post2Excerpt,
    body: post2Body,
  },
]

async function ensureCategory(title: string) {
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const id = `category.${slug}`
  const existing = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id })
  if (!existing) {
    await client.createIfNotExists({
      _id: id,
      _type: 'category',
      title,
      slug: { _type: 'slug', current: slug },
    })
  }
  return { _type: 'reference', _ref: id, _key: randomUUID() }
}

async function main() {
  const mortgageMarketingRef = await ensureCategory('Mortgage Marketing')
  const leadGenerationRef = await ensureCategory('Lead Generation')

  const categoryMap: Record<string, Array<{ _type: string; _ref: string; _key: string }>> = {
    'mortgage-lenders-measuring-wrong-kpis': [mortgageMarketingRef],
    '5-lead-generation-metrics-mortgage-lender-gets-wrong': [leadGenerationRef, mortgageMarketingRef],
  }

  for (const r of rewrites) {
    console.log(`Rewriting ${r.id}...`)
    await client
      .patch(r.id)
      .set({
        title: r.title,
        excerpt: r.excerpt,
        body: r.body,
        categories: categoryMap[r.id],
      })
      .commit()
    console.log(`  ✓ updated`)
  }
  console.log('\nDone. Posts rewritten with Bill\'s voice.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
