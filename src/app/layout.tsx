import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";
import { MailFallbackNote } from "@/components/EmailLink/EmailLink";

const TITLE = "Landex Systems. Turn point clouds into answers.";
const DESCRIPTION =
  "Send us a scan you already have. Get back equipment counts, floor plans, quantity takeoffs, and asset lists, then ask it anything else in plain language.";

const ORIGIN = "https://www.landexsystems.com";

// What Google reads to connect the word "Landex" to this company: the
// organization, its other names, and the profiles it owns elsewhere.
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${ORIGIN}/#organization`,
      name: "Landex Systems",
      alternateName: ["Landex", "Landex Systems Inc"],
      url: ORIGIN,
      logo: { "@type": "ImageObject", url: `${ORIGIN}/assets/logo.png` },
      image: `${ORIGIN}/og.jpg`,
      description: DESCRIPTION,
      email: "allen@landexsystems.com",
      sameAs: [
        "https://www.linkedin.com/company/landex-systems",
        "https://github.com/Landex-Systems",
      ],
      founder: [
        { "@type": "Person", name: "Allen Chen" },
        { "@type": "Person", name: "Auddithio Nag" },
        { "@type": "Person", name: "Beckett Devoe" },
      ],
      knowsAbout: [
        "point cloud processing",
        "scan to BIM",
        "LiDAR scanning",
        "drone survey",
        "quantity takeoff",
        "floor plans from scans",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      url: ORIGIN,
      name: "Landex Systems",
      alternateName: "Landex",
      publisher: { "@id": `${ORIGIN}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: { default: TITLE, template: "%s | Landex Systems" },
  description: DESCRIPTION,
  applicationName: "Landex Systems",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Search Console: paste the token from "HTML tag" verification here, or
  // verify by DNS TXT on landexsystems.com instead.
  // verification: { google: "..." },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.landexsystems.com",
    siteName: "Landex Systems",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "A labeled drone-survey point cloud in the Landex viewer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <div className="grain" aria-hidden="true" />
        {children}
        <MailFallbackNote />
      </body>
    </html>
  );
}
