import { Link } from "react-router-dom";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import TestimonialSlider from "@/components/TestimonialSlider";
import WinsCarousel from "@/components/WinsCarousel";
import PageShell from "@/components/PageShell";
import butterflyGreen from "@/assets/butterfly-green.png";

const heroBg = "/lovable-uploads/c0608300-b10b-4964-8008-2a3e109dd5c8.jpg";

const sectionBg = {
  backgroundImage: `url("${heroBg}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const Index = () => {
  return (
    <PageShell>
      {/* Hero + Form section with background */}
      <div
        className="relative z-10 mx-[15px] md:mx-[25px] mt-4"
        style={sectionBg}
      >
        {/* Hero Section */}
        <header className="px-6 pt-8 pb-10 md:pt-14 md:pb-14 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Ready to invest in yourself?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            1-on-1 coaching with me will help you{" "}
            <strong className="text-foreground">find clarity</strong> on{" "}
            <strong className="text-foreground">what you want</strong> (in your
            career and in life), and then get further clear on{" "}
            <strong className="text-foreground">how to get there</strong> with a
            concrete action plan and tools to{" "}
            <strong className="text-foreground">stay accountable</strong> to
            that plan.
          </p>
        </header>

        {/* Lead Capture Section */}
        <main className="px-6 pb-16 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left: Persuasive text + butterfly */}
              <div className="p-8 md:p-10 flex flex-col justify-center relative py-[20px] pt-[32px]">
                <img
                  src={butterflyGreen}
                  alt="Butterfly"
                  className="md:w-48 md:h-48 sm:w-32 sm:h-32 mx-auto mb-6  md:block"
                />
                <div className="space-y-3 text-muted-foreground">
                  <p className="text-foreground font-semibold text-sm mb-2">
                    What you will get:
                  </p>
                  <p className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Clarity on your goal and the precise path to reach it
                  </p>
                  <p className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Mindset shifts and confidence to take brave action
                  </p>
                  <p className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>A tailored,
                    actionable plan with concrete milestones
                  </p>
                  <p className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    An accountability framework to keep you moving, even on
                    tough days
                  </p>
                  <p className="text-foreground font-semibold text-sm">
                    Let's have a 10-minute chat to understand what you need and
                    find you the package that will work for you!
                  </p>
                  <p className="text-sm">
                    Need another push into the beautiful waters?{" "}
                    <strong className="text-primary">
                      Read the testimonials below
                    </strong>
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div className="p-8 md:p-10 bg-primary-foreground px-[32px] py-[20px] pb-[32px] pt-[10px]">
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Testimonials */}
      <TestimonialSlider />

      <WinsCarousel />

      {/* Three teaser cards linking to dedicated pages */}
      <section
        className="relative z-10 mx-[15px] md:mx-[25px] my-6"
        style={sectionBg}
      >
        <div className="px-4 md:px-8 py-12 md:py-16 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
              Choose Your Path
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Three ways we can work together
            </h2>
            <p className="text-muted-foreground mt-3">
              Whether you want hands-on private coaching, a self-guided
              roadmap, or a workshop for your company — there's a path for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Private Coaching */}
            <Link
              to="/private-coaching"
              className="group bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border hover:border-primary hover:shadow-lg transition-all flex flex-col"
            >
              <span className="text-4xl mb-3">🦋</span>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Private Coaching
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                1-on-1 programs for working moms, solopreneurs, and corporate
                women — plus retainer support and stand-alone Power Hours.
              </p>
              <span className="text-sm font-semibold text-primary group-hover:underline">
                Explore programs →
              </span>
            </Link>

            {/* DIY Coaching */}
            <Link
              to="/diy-coaching"
              className="group bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border hover:border-primary hover:shadow-lg transition-all flex flex-col"
            >
              <span className="text-4xl mb-3">🧭</span>
              <h3 className="text-xl font-bold text-foreground mb-2">
                DIY Coaching · OwnYourNext
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                Take the free Clarity Compass Quiz, then get your personalised
                roadmap with built-in community accountability.
              </p>
              <span className="text-sm font-semibold text-primary group-hover:underline">
                Take the free quiz →
              </span>
            </Link>

            {/* Corporate */}
            <Link
              to="/corporate"
              className="group bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border hover:border-primary hover:shadow-lg transition-all flex flex-col"
            >
              <span className="text-4xl mb-3">🏢</span>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Corporate Programs
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                Workshops and webinars for new moms, managers of returning
                moms, and women in corporate. Trusted by Flipkart, Kantar,
                Swiggy.
              </p>
              <span className="text-sm font-semibold text-primary group-hover:underline">
                See workshops →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
