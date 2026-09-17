// Every CTA on the page is a plain mailto to Allen. The topic only sets the
// subject so the asks (learn more, a scan, API access, a call) are easy to triage.

export type ContactTopic = 'learn' | 'scan' | 'api' | 'call'

export const CONTACT_EMAIL = 'allen@landexsystems.com'

// There is no self-serve door on this site. Access to the platform comes
// after a first scan through Allen, so every CTA is that inbox.

const SUBJECT: Record<ContactTopic, string> = {
  learn: 'Landex: learn more',
  scan: 'Landex: a scan to run',
  api: 'Landex: API access',
  call: 'Landex: book a call',
}

export function mailto(topic: ContactTopic): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT[topic])}`
}
