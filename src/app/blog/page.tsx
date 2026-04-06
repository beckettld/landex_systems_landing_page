import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Field Notes | Landex Systems",
  description:
    "Technical writing on utility map digitization, GIS, OCR for engineering drawings, and infrastructure data.",
  robots: { index: false, follow: false },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#06091a",
        color: "#e8ecf4",
        padding: "96px 24px 160px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 13,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#7a86a8",
            marginBottom: 16,
          }}
        >
          Field Notes
        </div>
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 56,
            lineHeight: 1.05,
            margin: "0 0 20px",
            fontWeight: 700,
          }}
        >
          Writing from the field.
        </h1>
        <p
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "#b4bcd0",
            margin: "0 0 64px",
            maxWidth: 620,
          }}
        >
          Notes on digitizing legacy infrastructure data, the tools we use, and
          the things that break when you run them on real archives.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {sorted.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                borderTop: "1px solid rgba(232,236,244,0.1)",
                paddingTop: 32,
                display: "block",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#7a86a8",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {formatDate(p.date)} &nbsp;·&nbsp; {p.readingTime}
              </div>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 30,
                  lineHeight: 1.2,
                  margin: "0 0 12px",
                  fontWeight: 600,
                }}
              >
                {p.title}
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "#b4bcd0",
                  margin: 0,
                }}
              >
                {p.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
