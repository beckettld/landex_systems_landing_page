import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landex Systems. We compare your project documents to the field and tell you where they disagree.",
  description:
    "Landex compares your project documentation to the physical site and surfaces every disagreement, from substitutions to missing change orders, with the photo evidence next to the document.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
