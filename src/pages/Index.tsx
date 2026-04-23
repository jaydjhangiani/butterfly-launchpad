import { useState } from "react";
import { Link } from "react-router-dom";
import TestimonialSlider from "@/components/TestimonialSlider";
import WinsCarousel from "@/components/WinsCarousel";
import PageShell from "@/components/PageShell";
import DiscoveryCallDialog from "@/components/DiscoveryCallDialog";
import coachPortrait from "@/assets/coach-portrait.jpg";
import { Button } from "@/components/ui/button";

const heroBg = "/lovable-uploads/c0608300-b10b-4964-8008-2a3e109dd5c8.jpg";

const sectionBg = {
  backgroundImage: `url("${heroBg}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const Index = () => {
  const [discoveryOpen, setDiscoveryOpen] = useState(false);

  return (
    <PageShell>
      <section
        className="relative z-10 mx-[15px] md:mx-[25px] mt-4"
        style={sectionBg}
      >
        <div className="grid items-center gap-8 px-6 py-10 md:grid-cols-2 md:px-10 md:py-14">
          <div>
            <img
              src={coachPortrait}
              alt="Portrait of the coach"
              className="w-full rounded-lg border border-border object-cover shadow-md"
            />
          </div>

          <header className="text-center md:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Leadership, executive and career coaching
            </p>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Procrastination ends here:
            </h1>
            <p className="mb-4 text-xl text-foreground md:text-2xl">
              I help women create a career with confidence, clarity, and alignment.
            </p>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:max-w-none md:text-lg">
              Executive and career coaching for leaders ready to lead with greater skill, presence, and peace of mind.
            </p>
            <Button
              onClick={() => setDiscoveryOpen(true)}
              size="lg"
              className="rounded-full font-semibold"
            >
              Book your discovery call
            </Button>
          </header>
        </div>
      </section>

      <DiscoveryCallDialog open={discoveryOpen} onOpenChange={setDiscoveryOpen} />

      <TestimonialSlider />

      <section
        className="relative z-10 mx-[15px] md:mx-[25px] my-6"
        style={sectionBg}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
              Feel ready to begin?
            </p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Three ways we can work together
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              to="/private-coaching"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:border-primary hover:shadow-lg md:p-8"
            >
              <span className="mb-3 text-4xl">🦋</span>
              <h3 className="mb-2 text-xl font-bold text-foreground">Private Coaching</h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                1-on-1 coaching designed to turn your unique goals into measurable results.
              </p>
              <span className="text-sm font-semibold text-primary group-hover:underline">
                Explore programs →
              </span>
            </Link>

            <Link
              to="/diy-coaching"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:border-primary hover:shadow-lg md:p-8"
            >
              <span className="mb-3 text-4xl">🧭</span>
              <h3 className="mb-2 text-xl font-bold text-foreground">DIY Coaching</h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                Not sure whether to grow where you are, pivot, or launch something new? This DIY kit gives you clarity and a built-in action plan to get moving.
              </p>
              <span className="text-sm font-semibold text-primary group-hover:underline">
                Start with the free quiz →
              </span>
            </Link>

            <Link
              to="/corporate"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:border-primary hover:shadow-lg md:p-8"
            >
              <span className="mb-3 text-4xl">🏢</span>
              <h3 className="mb-2 text-xl font-bold text-foreground">Corporate Programs</h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                Is your company committed to advancing the growth of the women on your team? We curate tailored workshops that fit your priorities.
              </p>
              <span className="text-sm font-semibold text-primary group-hover:underline">
                Explore workshops →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <WinsCarousel />
    </PageShell>
  );
};

export default Index;