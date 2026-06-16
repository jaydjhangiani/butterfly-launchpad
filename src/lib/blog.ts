// Static markdown blog loader.
// Drop any .md file with frontmatter into src/content/blog/ and it'll be picked up.

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  author: string;
  content: string; // raw markdown body (frontmatter stripped)
}

const rawFiles = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Minimal frontmatter parser — supports simple `key: "value"` or `key: value` lines.
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, fmBlock, body] = match;
  const data: Record<string, string> = {};
  for (const line of fmBlock.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return { data, content: body };
}

function fileToPost(path: string, raw: string): BlogPost {
  const { data, content } = parseFrontmatter(raw);
  const fallbackSlug = path.split("/").pop()!.replace(/\.md$/, "");
  return {
    slug: data.slug || fallbackSlug,
    title: data.title || fallbackSlug,
    excerpt: data.excerpt || "",
    date: data.date || "",
    category: data.category || "Article",
    author: data.author || "Krusha",
    content: content.trim(),
  };
}

const posts: BlogPost[] = Object.entries(rawFiles)
  .map(([path, raw]) => fileToPost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
