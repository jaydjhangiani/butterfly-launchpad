import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const BLOG_DIR = join(process.cwd(), "src/content/blog");
const OUTPUT = join(process.cwd(), "public/blog-meta.json");

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)/);
    if (!m) continue;
    fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return fm;
}

let files;
try {
  files = await readdir(BLOG_DIR);
} catch {
  console.log("No blog content directory found — writing empty blog-meta.json");
  await writeFile(OUTPUT, "[]");
  process.exit(0);
}

const posts = [];
for (const file of files) {
  if (!file.endsWith(".md")) continue;
  const raw = await readFile(join(BLOG_DIR, file), "utf-8");
  const fm = parseFrontmatter(raw);
  posts.push({
    slug: fm.slug || file.replace(/\.md$/, ""),
    title: fm.title || file.replace(/\.md$/, ""),
    excerpt: fm.excerpt || "",
    image: fm.image || null,
  });
}

await mkdir(join(process.cwd(), "public"), { recursive: true });
await writeFile(OUTPUT, JSON.stringify(posts, null, 2));
console.log(`blog-meta.json: ${posts.length} post(s)`);
