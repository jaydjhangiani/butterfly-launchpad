import { useState } from "react";
import PageShell from "@/components/PageShell";
import ProgramCard from "@/components/ProgramCard";
import PrePaymentDialog from "@/components/PrePaymentDialog";
import RetainerSelectorDialog from "@/components/RetainerSelectorDialog";
import TestimonialSlider from "@/components/TestimonialSlider";
import { Button } from "@/components/ui/button";

const heroBg = "/lovable-uploads/c0608300-b10b-4964-8008-2a3e109dd5c8.jpg";

const PrivateCoaching = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [retainerOpen, setRetainerOpen] = useState(false);
  const [activePackage, setActivePackage] = useState("");

  const openDialog = (pkg: string) => {
    setActivePackage(pkg);
    setDialogOpen(true);
  };

  const sectionBg = {
    backgroundImage: `url("${heroBg}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <PageShell>
      {/* Hero */}
      <section
        className="relative z-10 mx-[15px] md:mx-[25px] mt-4"
        style={sectionBg}
      >
        <div className="px-6 pt-12 pb-10 md:pt-16 md:pb-14 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Ready to invest in yourself?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            <strong className="text-foreground">Procrastination ends here:</strong>{" "}
            I help women create a career with confidence, clarity, and alignment.
          </p>
        </div>
      </section>

      {/* 3 program cards */}
      <section className="px-4 md:px-8 py-10 md:py-14 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <ProgramCard
            emoji="👩‍👧"
            title="Working Moms"
            duration="7-week program"
            format="60-min private video calls, once a week for 7 weeks (+ pre-work handbook)"
            features={[
              "Redefine your 2–5 year life plan: clarify how career fits your evolving identity as a mom.",
              "Identify gaps now: is the block flex, purpose, or something else, and what's really missing?",
              "Build a concrete 90-day bridge: exact steps, milestones, and quick wins.",
              "Install an accountability system: weekly check-ins, progress trackers, built-in support.",
              "Shift your mindset for lasting identity change.",
            ]}
            onCta={() => openDialog("Working Moms — 7-week program")}
            highlight
          />
          <ProgramCard
            emoji="💼"
            title="Female Solopreneurs"
            duration="5-week program"
            format="60-min private video calls, once a week for 5 weeks (+ pre-work handbook)"
            features={[
              "Define crystal-clear goals for your business.",
              "Assess the current reality and identify the gaps blocking growth.",
              "Build a concrete 90-day action plan to bridge every gap.",
              "Install a rigorous accountability system to ensure execution.",
              "Cultivate a growth mindset that sustains momentum and scale.",
            ]}
            onCta={() => openDialog("Female Solopreneurs — 5-week program")}
          />
          <ProgramCard
            emoji="💃"
            title="Corporate Girlies"
            duration="5-week program"
            format="60-min private video calls, once a week for 5 weeks (+ pre-work handbook)"
            features={[
              "Assess your current job reality and growth opportunities to define your path (promotion, role change, or pivot).",
              "Surface gaps between today and that path (visibility, sponsorship, skills, politics).",
              "Build a concrete 90-day bridge plan with milestones.",
              "Install a rigorous accountability system to ensure you execute.",
              "Strengthen a growth mindset to lead with confidence through change.",
            ]}
            onCta={() => openDialog("Corporate Girlies — 5-week program")}
          />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Retainer */}
      <section
        className="relative z-10 mx-[15px] md:mx-[25px] mt-6"
        style={sectionBg}
      >
        <div className="px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Retainer Private Coaching
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Think of retainer private coaching as a personal trainer for your
              career and life goals — navigating obstacles and driving steady
              progress.
            </p>
            <p className="text-sm text-muted-foreground italic mt-3">
              Sessions are twice a month.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-2xl border border-border shadow-md p-6 text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose your preferred retainer format in the next step and then
                continue to the same contact capture flow.
              </p>
              <Button
                onClick={() => setRetainerOpen(true)}
                size="lg"
                className="rounded-full font-semibold"
              >
                Start now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stand-alone Power Hour */}
      <section
        className="relative z-10 mx-[15px] md:mx-[25px] mt-6 mb-[25px]"
        style={sectionBg}
      >
        <div className="px-6 py-12 md:py-14 max-w-4xl mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold">
            Stand-alone Power Hour
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            Didn't think 60 minutes could make a significant difference in your
            life? Think again.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-[20px] lg:px-[50px]">
            It's like the old saying: if sixty seconds are too short, try a
            plank.
          </p>
          <p className="text-muted-foreground text-base px-[20px] lg:px-[50px]">
            If you're not ready for deep work right now, but need a quick fix
            for scenarios such as:
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {[
              { icon: "🎯", label: "Interview prep" },
              { icon: "🤝", label: "Negotiation" },
              { icon: "💬", label: "Tough client/employer conversation" },
              { icon: "📅", label: "Time management" },
            ].map((t) => (
              <div
                key={t.label}
                className="bg-white/90 rounded-xl p-4 text-center space-y-2 transition-transform hover:scale-105"
              >
                <span className="text-3xl">{t.icon}</span>
                <p className="text-sm font-medium text-foreground">{t.label}</p>
              </div>
            ))}
          </div>
          <p className="text-foreground font-semibold text-base px-[20px] lg:px-[50px]">
            Book a stand-alone hour with me to gain back more control over your
            situation.
          </p>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md mx-auto shadow-md">
            <p className="text-xs text-muted-foreground italic mt-2">
              60-minute focused session · next-step details sent after you book
            </p>
              <Button
              onClick={() => openDialog("Stand-alone Power Hour")}
                size="lg"
                className="mt-4 rounded-full font-semibold"
            >
              Book My Power Hour →
              </Button>
          </div>
        </div>
      </section>

      <RetainerSelectorDialog
        open={retainerOpen}
        onOpenChange={setRetainerOpen}
        onContinue={(packageName) => {
          setRetainerOpen(false);
          openDialog(packageName);
        }}
      />

      <PrePaymentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        packageName={activePackage}
        submitLabel="Continue"
      />
    </PageShell>
  );
};

export default PrivateCoaching;
