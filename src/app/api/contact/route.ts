import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isGoodOrigin, isHoneypotFilled, isGibberishName } from '@/lib/anti-spam';

const resendApiKey = process.env.RESEND_API_KEY;
// Sends FROM billrice.com (domain verified in Resend) so the lead is attributable
// to the personal hub, and TO the BRSG working inbox where Bill actually triages.
const resendFrom = process.env.RESEND_FROM_EMAIL || 'notifications@billrice.com';
const resendTo = process.env.CONTACT_TO_EMAIL || 'bill@billricestrategy.com';
const resendReplyTo = 'bill@billricestrategy.com';

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    if (!isGoodOrigin(request)) {
      return NextResponse.json({ ok: true });
    }

    const data = await request.json();

    if (isHoneypotFilled(data)) {
      return NextResponse.json({ ok: true });
    }

    if (
      isGibberishName(data.firstName) ||
      isGibberishName(data.lastName) ||
      isGibberishName(data.name)
    ) {
      return NextResponse.json({ ok: true });
    }

    const intent = String(data.intent || 'unknown');

    const subject = `New Lead: ${intent}`;
    const bodyLines: string[] = [];
    Object.keys(data).forEach((key) => {
      if (key === 'intent' || key === 'hp_url') return;
      const value = Array.isArray(data[key]) ? data[key].join(', ') : data[key];
      bodyLines.push(`${key}: ${value}`);
    });

    const text = `Intent: ${intent}\n\n${bodyLines.join('\n')}`;

    if (!resend) {
      console.warn('RESEND_API_KEY not set. Skipping email send.');
      return NextResponse.json({ ok: true, skippedEmail: true });
    }

    // Reply-to the lead when they gave us an address, so Bill can answer from the
    // notification itself. Falls back to the BRSG inbox.
    const leadEmail = typeof data.email === 'string' && data.email.includes('@') ? data.email : null;

    const { error: sendError } = await resend.emails.send({
      from: resendFrom,
      to: resendTo,
      replyTo: leadEmail || resendReplyTo,
      subject,
      text,
    });

    // Resend returns errors in the response body rather than throwing — a swallowed
    // error here is a silently lost lead.
    if (sendError) {
      console.error('Contact API: Resend rejected the send', sendError);
      return NextResponse.json({ ok: false, error: sendError.message }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Contact API error', error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}


