// Every CTA on the page is a plain mailto to Allen. The topic only sets the
// subject so the asks (learn more, a scan, API access, a call) are easy to triage.
//
// The address is never written out in the source or in the rendered HTML.
// Harvesters read the static page; people click, and EmailLink assembles the
// mailto in the browser after mount. On the page itself the team is shown as
// {allen, auddi, beckett}@landexsystems.com, which reads fine to a person and
// is not a valid address to a regex.

export type ContactTopic = 'learn' | 'scan' | 'api' | 'call' | 'hello'
export type ContactUser = 'allen' | 'auddi' | 'beckett'
export type ContactTo = ContactUser | 'team'

const DOMAIN = ['landexsystems', 'com']
const AT = String.fromCharCode(64)

export const CONTACT_USER: ContactUser = 'allen'
export const TEAM_USERS: ContactUser[] = ['allen', 'auddi', 'beckett']

// "Send us a scan" CTAs go to Allen's inbox. The self-serve path is the
// Stripe checkout on /tesseract/pricing; the site never links the app itself.

const SUBJECT: Record<ContactTopic, string> = {
  learn: 'Landex: learn more',
  scan: 'Landex: a scan to run',
  api: 'Landex: API access',
  call: 'Landex: book a call',
  hello: 'Landex',
}

export function domain(): string {
  return DOMAIN.join('.')
}

/** A real address, built at call time. Only call this in the browser. */
export function address(user: ContactUser = CONTACT_USER): string {
  return user + AT + domain()
}

/** What the page prints where an address used to be. */
export const TEAM_ADDRESS_LABEL = '{' + TEAM_USERS.join(', ') + '}' + AT + DOMAIN.join('.')

export function recipients(to: ContactTo = CONTACT_USER): string[] {
  return to === 'team' ? TEAM_USERS.map((u) => address(u)) : [address(to)]
}

export function mailto(topic: ContactTopic, to: ContactTo = CONTACT_USER): string {
  return `mailto:${recipients(to).join(',')}?subject=${encodeURIComponent(SUBJECT[topic])}`
}
