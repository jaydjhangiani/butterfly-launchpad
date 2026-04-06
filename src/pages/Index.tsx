import ButterflyDecor from "@/components/ButterflyDecor";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import TestimonialSlider from "@/components/TestimonialSlider";
import logo from "@/assets/logo.png";
import accBadge from "@/assets/acc-badge.png";
import butterflyGreen from "@/assets/butterfly-green.png";
import heroBg from "@/assets/hero-bg.png";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-primary-foreground">
      {/* Header / Navbar */}
      <nav className="relative z-10 py-4  mx-auto items-center justify-between pb-0 pr-0 pl-0 pt-0 flex flex-row bg-primary-foreground shadow-none">
        <img
          src={logo}
          alt="Butterfly Effect Coach"
          className="h-40 md:h-48 px-4"
        />
        <img
          src={accBadge}
          alt="ICF Associate Certified Coach"
          className="h-16 md:h-20 px-8"
        />
      </nav>

      {/* Hero + Form section with background */}
      <div
        className="relative z-10 px-[15px] py-[15px] bg-inherit pt-0 pl-0 pr-0 pb-0 mx-[25px] ml-[25px] "
        style={{
          backgroundImage:
            'url("/lovable-uploads/c0608300-b10b-4964-8008-2a3e109dd5c8.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Hero Section */}
        <header className="px-6 pt-8 pb-10 md:pt-14 md:pb-14 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Ready to test the waters?
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

      {/* Power Hour Section */}
      <section
        className="relative z-10 px-[15px] py-[15px] bg-inherit pt-0 pl-0 pr-0 pb-0 mx-[25px] mb-[25px]"
        style={{
          backgroundImage:
            'url("/lovable-uploads/c0608300-b10b-4964-8008-2a3e109dd5c8.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="px-6 py-12 md:py-14 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            Didn't think 60 minutes could make a significant difference in your
            life? Think again.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg py-0 px-[20px] lg:px-[50px]">
            It's similar to what they say about how if you think 60 seconds is
            too less, try a plank.
          </p>
          <p className="text-muted-foreground text-base px-[20px] lg:px-[50px]">
            If you're not ready for deep work right now, but need a quick fix
            for scenarios such as:
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white/90 rounded-xl p-4 text-center space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
              <span className="text-3xl">🎯</span>
              <p className="text-sm font-medium text-foreground">
                Interview prep
              </p>
            </div>
            <div className="bg-white/90 rounded-xl p-4 text-center space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
              <span className="text-3xl">🤝</span>
              <p className="text-sm font-medium text-foreground">Negotiation</p>
            </div>
            <div className="bg-white/90 rounded-xl p-4 text-center space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
              <span className="text-3xl">💬</span>
              <p className="text-sm font-medium text-foreground">
                Handling a tough conversation
              </p>
            </div>
            <div className="bg-white/90 rounded-xl p-4 text-center space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
              <span className="text-3xl">📅</span>
              <p className="text-sm font-medium text-foreground">
                Time management
              </p>
            </div>
          </div>
          <p className="text-foreground font-semibold text-base px-[20px] lg:px-[50px]">
            You can now book a stand-alone hour with me, to gain back more
            control over said situation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">
          Butterfly Effect Coaching
        </p>
        <p className="mb-1">
          © {new Date().getFullYear()} Krusha Sahjwani. Proudly created by JXOS
        </p>
      </footer>
    </div>
  );
};

export default Index;
