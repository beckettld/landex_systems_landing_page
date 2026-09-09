import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const DEFAULT_TO = [
  'allen@landexsystems.com',
  'beckett@landexsystems.com',
  'auddi@landexsystems.com',
]

const MAX = { name: 120, email: 200, company: 160, message: 5000 }

type Payload = {
  name?: unknown
  email?: unknown
  company?: unknown
  message?: unknown
  website?: unknown // honeypot, must stay empty
}

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: Request) {
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400 })
  }

  // Bots fill every field. Humans never see this one.
  if (str(body.website, 50)) return NextResponse.json({ ok: true })

  const name = str(body.name, MAX.name)
  const email = str(body.email, MAX.email)
  const company = str(body.company, MAX.company)
  const message = str(body.message, MAX.message)

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Name, email and message are required.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'That email address does not look right.' }, { status: 400 })
  }

  // Sends through our own Google Workspace account over SMTP. No third party.
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) {
    console.error('[contact] SMTP_USER / SMTP_PASS not set; dropping submission from', email)
    return NextResponse.json(
      { ok: false, error: 'The form is not configured yet. Email allen@landexsystems.com directly.' },
      { status: 503 },
    )
  }

  const to = (process.env.CONTACT_TO ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const from = process.env.CONTACT_FROM ?? `Landex Systems <${user}>`

  const subject = `Website contact: ${name}${company ? ` (${company})` : ''}`
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    '',
    message,
  ]
    .filter((l) => l !== null)
    .join('\n')
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
    <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>${
      company ? `<br/><strong>Company:</strong> ${escapeHtml(company)}` : ''
    }</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_PORT ?? '465') === '465',
    auth: { user, pass },
  })

  try {
    await transport.sendMail({
      from,
      to: to.length ? to : DEFAULT_TO,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    })
  } catch (err) {
    console.error('[contact] SMTP send failed:', err)
    return NextResponse.json(
      { ok: false, error: 'We could not send that. Email allen@landexsystems.com directly.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
