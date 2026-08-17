import { useState } from "react";
import { Link } from "react-router-dom";
import TestimonialSlider from "@/components/TestimonialSlider";
import WinsCarousel from "@/components/WinsCarousel";
import PageShell from "@/components/PageShell";
import DiscoveryCallDialog from "@/components/DiscoveryCallDialog";
import SEO from "@/components/SEO";
import coachPortrait from "@/assets/krusha-coach.png";
import { Button } from "@/components/ui/button";

import heroBg from "../assets/hero-bg.png";

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
      <SEO
        title="Career Coach for Women | Life & Career Coaching Services"
        description="Empowering women with career clarity, mindset growth, leadership, and life coaching through personalized coaching services."
        path="/"
        schemaJson={`{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.butterflyeffectcoach.com/#website",
              "url": "https://www.butterflyeffectcoach.com/",
              "name": "Butterfly Effect Coach",
              "alternateName": "Butterfly Effect Coaching"
            },
            {
              "@type": "Person",
              "@id": "https://www.butterflyeffectcoach.com/#krusha",
              "name": "Krusha",
              "jobTitle": "Career & Life Coach",
              "url": "https://www.butterflyeffectcoach.com/",
              "image": "https://www.butterflyeffectcoach.com/ButterflyEffectCoach.jpg",
              "description": "Career and life coach helping women build careers with confidence, clarity, and alignment.",
              "knowsAbout": ["Career Coaching", "Life Coaching", "Corporate Coaching", "Solopreneur Coaching"],
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Private Coaching",
                  "url": "https://www.butterflyeffectcoach.com/private-coaching"
                },
                {
                  "@type": "Offer",
                  "name": "Corporate Workshops",
                  "url": "https://www.butterflyeffectcoach.com/corporate"
                },
                {
                  "@type": "Offer",
                  "name": "DIY Coaching Resources",
                  "url": "https://www.butterflyeffectcoach.com/diy-coaching"
                }
              ]
            }
          ]
        }`}
      />
      <section
        className="relative z-10 mx-[15px] md:mx-[40px] lg:mx-[100px] mt-6 bg-[#F2D2D7]"
        style={sectionBg}
      >
        <div className="grid items-center gap-8 px-8 py-12 md:grid-cols-[5fr_6fr] md:px-16 md:py-16 lg:grid-cols-[4fr_6fr]">
          <div className="max-h-[420px] overflow-hidden rounded-lg">
            <img
              src={coachPortrait}
              alt="Krusha, Career & Life Coach for Women"
              title="Krusha — Career & Life Coach for Women | Butterfly Effect Coach"
              className="h-full w-full border border-border object-cover object-top shadow-md"
            />
          </div>

          <header className="text-center md:text-left md:px-10 lg:pr-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              career & life coaching for women
            </p>
            <h1 className="mb-4 text-2xl font-bold leading-tight text-foreground md:text-4xl lg:text-6xl">
              Procrastination ends here:
            </h1>
            <p className="mb-4 text-xl text-foreground md:text-xl">
              I help ambitious women who feel stuck & know they are meant for
              more to step up in their roles, pivot and/or launch their own
              business.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:max-w-none md:text-md">
              I help you find and achieve YOUR version of ‘having it all’.
            </p>
            <div className="mt-3 inline-flex flex-col items-center gap-1 md:items-start md:gap-3">
              <p className="order-2 mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:order-1 md:mt-0 md:max-w-none md:text-md">
                Not sure where to begin?
                <span className="hidden md:inline"> </span>
                <br className="md:hidden" />
                Let&apos;s find your next step together.
              </p>
              <Button
                onClick={() => setDiscoveryOpen(true)}
                size="lg"
                className="order-1 h-auto rounded-full px-8 py-4 text-base font-bold shadow-lg ring-4 ring-white/70 transition-transform hover:-translate-y-0.5 md:order-2"
              >
                Book your discovery call →
              </Button>
            </div>
          </header>
        </div>
      </section>

      <DiscoveryCallDialog
        open={discoveryOpen}
        onOpenChange={setDiscoveryOpen}
      />

      <TestimonialSlider />

      <section
        className="relative z-10 mx-[15px] md:mx-[40px] lg:mx-[100px] my-8 md:my-16 bg-[#F2D2D7]"
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

          <div className="grid gap-10 md:grid-cols-3 lg:px-10 pt-5">
            <Link
              to="/private-coaching"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:border-primary hover:shadow-lg md:p-8"
            >
              <span className="mb-3 text-4xl">🦋</span>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Private Coaching
              </h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                1-on-1 coaching designed to turn your unique goals into
                measurable results.
              </p>
              <Button size="sm">Explore programs</Button>
            </Link>

            <Link
              to="/diy-coaching"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:border-primary hover:shadow-lg md:p-8"
            >
              <span className="mb-3 text-4xl">🧭</span>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                DIY Coaching
              </h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                Not sure whether to grow where you are, pivot, or launch
                something new? This DIY kit gives you clarity and a built-in
                action plan to get moving.
              </p>
              {/* <span className="bg-primary text-primary-foreground text-center py-1 px-2 rounded-sm text-sm font-semibold hover:bg-primary/90">
                Start with the free quiz 
              </span> */}
              <Button size="sm">Start with the free quiz</Button>
            </Link>

            <Link
              to="/corporate"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:border-primary hover:shadow-lg md:p-8"
            >
              <span className="mb-3 text-4xl">🏢</span>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Corporate Programs
              </h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                Is your company committed to advancing the growth of the women
                on your team? We curate tailored workshops that fit your
                priorities.
              </p>
              <Button size="sm">Explore workshops </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Repeat the primary conversion action after visitors review the offers. */}
      <section className="mx-[15px] my-8 overflow-hidden rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground shadow-lg md:mx-[40px] md:my-16 md:px-12 md:py-14 lg:mx-[100px]">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/80">
            Your next step
          </p>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Ready to stop feeling stuck?
          </h2>
          <p className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-primary-foreground/90 md:text-lg">
            Tell me what you&apos;re navigating, and we&apos;ll explore the coaching
            path that best fits your goals.
          </p>
          <Button
            onClick={() => setDiscoveryOpen(true)}
            size="lg"
            className="h-auto rounded-full bg-white px-9 py-4 text-base font-bold text-primary shadow-md hover:bg-white/90"
          >
            Book your discovery call →
          </Button>
        </div>
      </section>

      <WinsCarousel />
    </PageShell>
  );
};

export default Index;
