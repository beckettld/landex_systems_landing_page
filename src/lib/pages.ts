// Every content page on the site, in one list: the sitemap, the footer and
// the "More" links on each page read from here. Add a page, add a row.

export type SitePage = { href: string; label: string; hint: string; updated: string }

export const PAGES: SitePage[] = [
  { href: '/deliverables', label: 'Deliverables', hint: 'Every file and answer we return', updated: '2026-09-21' },
  { href: '/scan-to-bim', label: 'Scan to BIM', hint: 'A laser scan as an IFC model', updated: '2026-09-21' },
  { href: '/drone-site-survey', label: 'Drone site survey', hint: 'A site tile counted and measured', updated: '2026-09-21' },
  { href: '/ask-the-scan', label: 'Ask the scan', hint: 'Questions in plain language', updated: '2026-09-21' },
]
