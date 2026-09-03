import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";

export const metadata: Metadata = {
  title: "Landex Systems. We make models smart.",
  description:
    "Landex gives every point in a scan, from LiDAR to a phone walkthrough, a deep understanding of what it is and what it belongs to, then decodes that understanding into class names, relationships, heatmaps, and quantities for your use case.",
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
      </body>
    </html>
  );
}
