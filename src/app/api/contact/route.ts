import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL || 'notifications@billrice.com';
const resendTo = 'bill@billrice.com';

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const intent = String(data.intent || 'unknown');

    const subject = `New Lead: ${intent}`;
    const bodyLines: string[] = [];
    Object.keys(data).forEach((key) => {
      if (key === 'intent') return;
      const value = Array.isArray(data[key]) ? data[key].join(', ') : data[key];
      bodyLines.push(`${key}: ${value}`);
    });

    const text = `Intent: ${intent}\n\n${bodyLines.join('\n')}`;

    if (!resend) {
      console.warn('RESEND_API_KEY not set. Skipping email send.');
      return NextResponse.json({ ok: true, skippedEmail: true });
    }

    await resend.emails.send({
      from: resendFrom,
      to: resendTo,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Contact API error', error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}


