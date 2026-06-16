import { Context } from "https://edge.netlify.com";

const SITE_URL = "https://www.butterflyeffectcoach.com";
const DEFAULT_IMAGE = `${SITE_URL}/ButterflyEffectCoach.jpg`;
const SITE_NAME = "Butterfly Effect Coach";

const BOT_RE =
  /twitterbot|facebookexternalhit|linkedinbot|slackbot|whatsapp|telegrambot|googlebot|bingbot|rogerbot|embedly|showyoubot|outbrain|pinterest\/0\.|vkshare|w3c_validator/i;

interface PageMeta {
  title: string;
  description: string;
  image: string;
  url: string;
}

const STATIC_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Career Coach for Women | Life & Career Coaching Services",
    description:
      "Empowering women with career clarity, mindset growth, leadership, and life coaching through personalized coaching services.",
  },
  "/private-coaching": {
    title: "Private Coaching for Women | Career & Life Coaching",
    description:
      "Get personalized private coaching for career clarity, mindset growth, confidence, and life transformation with expert coaching for women.",
  },
  "/corporate": {
    title: "Corporate Coaching for Women | Leadership & Growth",
    description:
      "Empower women leaders with corporate coaching focused on leadership, mindset, confidence, career growth, and workplace success.",
  },
  "/diy-coaching": {
    title: "DIY Coaching for Women | Self Growth & Career Clarity",
    description:
      "Explore DIY coaching programs for women focused on self-growth, mindset, confidence, and career clarity at your own pace.",
  },
  "/quiz": {
    title: "Find Your Coaching Program | Butterfly Effect Coach",
    description:
      "Not sure where to start? Take this short quiz to find the coaching program that fits your season of life and career goals.",
  },
  "/blog": {
    title: "Journal | Butterfly Effect Coach",
    description:
      "Essays on career clarity, business growth, and leadership for ambitious women — written by ICF-certified coach Krusha.",
  },
};

function escape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHTML(meta: PageMeta): string {
  const t = escape(meta.title);
  const d = escape(meta.description);
  const img = escape(meta.image);
  const url = escape(meta.url);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${t}</title>
  <meta name="description" content="${d}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:image" content="${img}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escape(SITE_NAME)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t}" />
  <meta name="twitter:description" content="${d}" />
  <meta name="twitter:image" content="${img}" />
</head>
<body></body>
</html>`;
}

export default async function handler(request: Request, context: Context) {
  const ua = request.headers.get("user-agent") ?? "";
  if (!BOT_RE.test(ua)) return context.next();

  const url = new URL(request.url);
  const path = url.pathname;

  // Static routes
  const staticMeta = STATIC_META[path];
  if (staticMeta) {
    return new Response(
      buildHTML({ ...staticMeta, image: DEFAULT_IMAGE, url: `${SITE_URL}${path}` }),
      { headers: { "content-type": "text/html;charset=utf-8" } }
    );
  }

  // Blog post routes: /blog/:slug
  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    try {
      const res = await fetch(`${url.origin}/blog-meta.json`);
      if (res.ok) {
        const posts: Array<{ slug: string; title: string; excerpt: string; image?: string }> =
          await res.json();
        const post = posts.find((p) => p.slug === slug);
        if (post) {
          return new Response(
            buildHTML({
              title: `${post.title} | ${SITE_NAME}`,
              description: post.excerpt,
              image: post.image ?? DEFAULT_IMAGE,
              url: `${SITE_URL}${path}`,
            }),
            { headers: { "content-type": "text/html;charset=utf-8" } }
          );
        }
      }
    } catch {
      // fall through
    }
  }

  return context.next();
}
