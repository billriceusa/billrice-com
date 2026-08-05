# All Four Sides — source interview

Working notes for `/essays/all-four-sides`. Not for publication.

Interview conducted 2026-08-05. Round 1 (buyer seat) complete; Round 2 (software /
agency / author seats) outstanding.

---

## Verified — Bill's own account, 2026-08-05

Everything in this section came directly from Bill in the Round 1 interview. Do not
paraphrase the numbers loosely and do not extend them.

### The CAC premise in the old spec was wrong

The BACKLOG spec assumed the lender leg's receipt was *"what a funded loan actually cost
in acquisition, versus what he assumed going in."* **It wasn't.** Bill had a good read on
this going in — deep consumer-direct lending experience — and Velocity ran a **consistent
CAC of ~$1,500 cost per funded loan**, managed across LO compensation, lead buying, and
first-party lead acquisition. He was not wrong about the number. The blind spot is
elsewhere, and the essay has to look elsewhere.

### The actual blind spot: he knew leads, and underestimated the machine that receives them

Bill had spent his career on the **generation** side. He knew the online/digital lead
channel cold, including its weaknesses — skews to the lower end of the bell curve on
quality and qualification, lower intent, more shopping and tire-kicking.

What he underestimated was **standing up the sales operation**: automated processes that
are simultaneously efficient, highly responsive to the lead, and still deliver a natural,
quality customer experience.

> "This took not 30 days, but more like 6 months to really dial in."

That gap — roughly 30 days assumed, ~6 months actual — is the receipt the essay needs.

### The metrics reordered themselves

Bill's own hierarchy, as it changed under him at Velocity:

- **Speed to lead** evolved: first it meant speed to first *dial*; over time it became
  speed to first *contact* — text message and email.
- **Contact Rate** — more important than he'd thought. A measure of sales efficiency and
  effectiveness.
- **App-to-Loan rate** — more important than he'd thought. A measure of product and
  operational fit: did we have the right products and lending partners, and were we
  processing apps efficiently and effectively.
- **Cost Per Lead** — *less* important than he'd thought. **CAC is the appropriate
  measure** because it is closer to understanding profitability.

### "The twelfth dial" — resolved

The phrase in the old spec was unattributed and I flagged it as possibly invented. Bill's
answer: the real mechanism is **speed to contact, which meant text messaging** — and then
whether the LO had the training and the products to take a **clean app and file on the
first call**.

> "If that happened our pull through was over 50% because the process from app to closing
> was smooth and a delight — nothing floating away when a customer gets frustrated."

So: not dial count. Contact speed, then first-call execution quality, then pull-through.

### The unflattering one — the agency owner learns how to be a client

Asked what buying with his own money taught him that two decades of spending clients'
money hadn't:

> "Patience and true collaboration and data exchange with marketing partners was the key
> — treat them like part of the team, an outsourced marketing department with all the
> grace, patience, and collaboration of that kind of relationship — not a vendor to be
> used and abused."

This is the strongest turn available to the essay: the man who had run an agency for
eleven years sat down on the other side of the table and discovered what lead *buyers*
get wrong about agencies.

### The honest verdict on Velocity

> "It worked, but it was really hard and in my case distracting from my core competency
> and strength, but it gave me the hands on experience and success to help my partners
> more than I could have ever done otherwise. It is an incredible competitive
> differentiator."

So the essay is **"it worked, and here is the expensive thing I learned anyway"** — not
"it worked less well than the story implies." The cost was focus, not money.

---

## Outstanding — Round 2

Not yet answered. Do not draft the corresponding sections until these land.

1. **Software (icoSales, 2005)** — what did Bill believe the problem was while building
   it, versus what it actually was? The old spec guesses "routing and speed"; unverified.
2. **Agency (Kaleidico + MPL)** — what does the agency seat systematically fail to see
   about the lender's side? Inability to see the sales floor, or something worse —
   optimizing a number that reports well but does not fund loans?
3. **Agency, concrete change** — what actually changed in how Kaleidico operates after
   Velocity? A report, a question asked of clients, a metric no longer led with.
4. **Author (The Lead Buyer's Playbook)** — is it fair that the book places last, and
   what does it genuinely not cover? Working hypothesis, unconfirmed: it can teach someone
   to buy leads well, but cannot hand them a sales operation or a partnership temperament.
5. **The Monday-morning action** — the one thing a lender should do differently, so the
   essay ends on something actionable rather than on the four-seats conceit.

---

## Scope decisions

- **Deferred to its own essay:** regulators lagging consumer preference on text messaging.
  Bill agreed 2026-08-05. Real, live in the compliance work, but it pulls a 1,300-word
  argument sideways. Slate entry: "The Regulators Are Behind Your Customers."
- **Carried inside this essay, not standalone:** the Velocity story itself. Bill's call,
  2026-07-30 — stronger as evidence inside an argument than as an eighth career piece.

## Ships with the essay

Unchanged from the BACKLOG spec, all still open:

- Link the homepage hero line to `/essays/all-four-sides`. An unlinked hero sentence after
  this essay exists is a bug.
- Exactly one CTA: The Lead Brief. Audit whether it can stay on-domain rather than opening
  `theleadbrief.com` in a new tab.
- Article schema with `author` pointed at the canonical Person URI. **Still not done** —
  `/essays/[slug]` currently inlines an author via `articleJsonLd({ authorName })`.
- Link the seven existing `/essays` pieces as the receipts for legs 1–3.
