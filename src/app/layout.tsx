import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";
import { MailFallbackNote } from "@/components/EmailLink/EmailLink";

const TITLE = "Landex Systems. Turn point clouds into answers.";
const DESCRIPTION =
  "Send us a scan you already have. Get back equipment counts, floor plans, quantity takeoffs, and asset lists, then ask it anything else in plain language.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.landexsystems.com"),
  title: TITLE,
  description: DESCRIPTION,
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
