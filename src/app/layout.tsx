import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";

export const metadata: Metadata = {
  title: "Landex Systems. Turn point clouds into answers.",
  description:
    "Upload a scan you already have. About 20 minutes later you have equipment counts, floor plans, quantity takeoffs, and asset lists, then ask it anything else in plain language. Self serve or API.",
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
