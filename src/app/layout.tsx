import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landex Systems. An operating system for the building.",
  description:
    "Landex uses AI to turn video walkthroughs or LiDAR point clouds into a 3D model of a building where every element knows what it is. Query it, keep it current, and run the building off it for its lifetime.",
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
