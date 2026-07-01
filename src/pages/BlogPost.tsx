import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageShell from "@/components/PageShell";
import SEO from "@/components/SEO";
import { getPostBySlug, formatPostDate } from "@/lib/blog";

const SITE_URL = "https://www.butterflyeffectcoach.com";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  });

  return (
    <PageShell>
      <SEO
        title={`${post.title} | Butterfly Effect Coach`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        schemaJson={schema}
      />

      <article className="mx-[25px] my-10 md:my-16">
        <div className="px-[20px] lg:px-[50px] max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-block text-sm text-primary font-semibold mb-6 hover:underline"
          >
            ← Back to Journal
          </Link>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
              {post.category}
            </span>
            <span>{formatPostDate(post.date)}</span>
            <span>· {post.author}</span>
          </div>

          <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground italic mb-10 leading-relaxed">
            {post.excerpt}
          </p>

          <div
            className="prose prose-lg max-w-none
              prose-headings:font-['Playfair_Display'] prose-headings:font-semibold prose-headings:text-foreground
              prose-p:text-foreground/85 prose-p:leading-relaxed
              prose-li:text-foreground/85
              prose-strong:text-foreground
              prose-a:text-primary hover:prose-a:underline"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </PageShell>
  );
};

export default BlogPost;
