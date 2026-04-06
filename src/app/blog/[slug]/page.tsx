import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getPost, type Block } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { robots: { index: false, follow: false } };
  return {
    title: `${post.title} | Landex Systems`,
    description: post.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

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
      <article style={{ maxWidth: 720, margin: "0 auto" }}>
        <Link
          href="/blog"
          style={{
            fontSize: 13,
            color: "#7a86a8",
            textDecoration: "none",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          ← Field Notes
        </Link>

        <div
          style={{
            fontSize: 12,
            color: "#7a86a8",
            letterSpacing: 1,
            textTransform: "uppercase",
            marginTop: 48,
            marginBottom: 16,
          }}
        >
          {formatDate(post.date)} &nbsp;·&nbsp; {post.readingTime} &nbsp;·&nbsp;{" "}
          {post.author}
        </div>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 48,
            lineHeight: 1.1,
            margin: "0 0 24px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontSize: 20,
            lineHeight: 1.55,
            color: "#b4bcd0",
            margin: "0 0 56px",
            fontStyle: "italic",
          }}
        >
          {post.description}
        </p>

        <div
          style={{
            borderTop: "1px solid rgba(232,236,244,0.1)",
            paddingTop: 48,
          }}
        >
          {post.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            paddingTop: 32,
            borderTop: "1px solid rgba(232,236,244,0.1)",
            fontSize: 14,
            color: "#7a86a8",
          }}
        >
          Tags: {post.tags.join(", ")}
        </div>
      </article>
    </main>
  );
}

function BlockView({ block }: { block: Block }) {
  const pStyle: React.CSSProperties = {
    fontSize: 18,
    lineHeight: 1.75,
    color: "#d4d9e6",
    margin: "0 0 24px",
  };
  switch (block.type) {
    case "p":
      return <p style={pStyle}>{block.text}</p>;
    case "h2":
      return (
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 28,
            lineHeight: 1.25,
            margin: "56px 0 20px",
            fontWeight: 600,
            color: "#e8ecf4",
          }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 21,
            lineHeight: 1.3,
            margin: "40px 0 16px",
            fontWeight: 600,
            color: "#e8ecf4",
          }}
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul style={{ ...pStyle, paddingLeft: 22 }}>
          {block.items.map((it, i) => (
            <li key={i} style={{ marginBottom: 10 }}>
              {it}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol style={{ ...pStyle, paddingLeft: 22 }}>
          {block.items.map((it, i) => (
            <li key={i} style={{ marginBottom: 10 }}>
              {it}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          style={{
            ...pStyle,
            borderLeft: "3px solid #7a86a8",
            paddingLeft: 20,
            fontStyle: "italic",
            color: "#b4bcd0",
          }}
        >
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <pre
          style={{
            background: "rgba(232,236,244,0.05)",
            padding: 16,
            borderRadius: 6,
            overflowX: "auto",
            fontSize: 14,
            lineHeight: 1.6,
            margin: "0 0 24px",
          }}
        >
          <code>{block.text}</code>
        </pre>
      );
  }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
