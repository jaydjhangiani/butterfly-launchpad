import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import SEO from "@/components/SEO";
import { getAllPosts, formatPostDate } from "@/lib/blog";

const Blog = () => {
  const posts = getAllPosts();

  return (
    <PageShell>
      <SEO
        title="Journal | Butterfly Effect Coach"
        description="Essays on career clarity, business growth, and leadership for ambitious women — written by ICF-certified coach Krusha."
        path="/blog"
      />

      <section className="mx-[25px] my-12 md:my-16">
        <div className="px-[20px] lg:px-[50px] max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Journal
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Reflections on coaching, career, and building a business on your own terms.
          </p>
        </div>

        <div className="px-[20px] lg:px-[50px] max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border transition-transform duration-300 hover:scale-105 hover:shadow-md"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                  {post.category}
                </span>
                <span>{formatPostDate(post.date)}</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-foreground mb-3 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <span className="text-primary font-semibold text-sm">Read →</span>
            </Link>
          ))}

          {posts.length === 0 && (
            <p className="text-center text-muted-foreground col-span-full">
              No posts yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
};

export default Blog;
