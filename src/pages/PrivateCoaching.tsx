import { useState } from "react";
import { CoachingButton, CoachingCopy, ctaClassName } from "@/components/CoachingContent";
import DiscoveryCallDialog from "@/components/DiscoveryCallDialog";
import coachingContent from "@/content/private-coaching.json";
import PageShell from "@/components/PageShell";
import ProgramCard from "@/components/ProgramCard";
import PrePaymentDialog from "@/components/PrePaymentDialog";
import RetainerSelectorDialog from "@/components/RetainerSelectorDialog";
import heroBg from "@/assets/hero-bg.png";
import secondaryHeroBg from "@/assets/secondary-hero-bg.png";
import SEO from "@/components/SEO";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const contentSections = coachingContent.body.split(/^## /m).filter(Boolean).map((section) => {
  const end = section.indexOf("\n");
  return { title: section.slice(0, end), copy: section.slice(end).trim() };
});
const topics = contentSections.slice(0, 4);
const process = contentSections[4];
const audience = contentSections[5];
const closing = contentSections[6];
const processParts = process.copy.split(/^### /m);
const processSteps = processParts.slice(1).map((step) => {
  const [title, ...paragraphs] = step.trim().split("\n\n");
  return { title, copy: paragraphs[0], after: paragraphs.slice(1).join("\n\n") };
});

const PrivateCoaching = () => {
  const [discoveryOpen, setDiscoveryOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [retainerOpen, setRetainerOpen] = useState(false);
  const [activePackage, setActivePackage] = useState("");

  const openDialog = (pkg: string) => {
    setActivePackage(pkg);
    setDialogOpen(true);
  };

  const secondarySectionBg = {
    backgroundImage: `url("${secondaryHeroBg}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const sectionBg = {
    backgroundImage: `url("${heroBg}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <PageShell>
      <SEO
        title="Private Coaching for Women | Career & Life Coaching"
        description="Get personalized private coaching for career clarity, mindset growth, confidence, and life transformation with expert coaching for women."
        path="/private-coaching"
      />
      {/* Hero */}
      <section
        className="relative mx-[15px] md:mx-[40px] lg:mx-[100px] mt-4 overflow-hidden rounded-3xl bg-[#F2D2D7]"
        style={sectionBg}
      >
        <div className="px-6 pt-12 pb-10 md:pt-16 md:pb-14 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6">
            {coachingContent.title}
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-foreground mb-6">{coachingContent.subtitle}</p>
          <div className="mt-8 rounded-2xl border border-white/70 bg-white/75 p-6 text-left md:p-8">
            <CoachingCopy className="md:columns-2 md:gap-10">{coachingContent.intro}</CoachingCopy>
          </div>
        </div>
      </section>

      <div className="mx-[15px] md:mx-[40px] lg:mx-[100px] my-10 md:my-16 space-y-6 md:space-y-8">
        {topics.map((section, index) => {
          const listStart = section.copy.indexOf("\n* ");
          const listEnd = section.copy.indexOf("\n\n", listStart);
          return (
            <section key={section.title} aria-labelledby={`coaching-topic-${index}`} className={cn("rounded-3xl border border-border/60 p-6 md:p-10 lg:p-12", index % 2 === 0 ? "bg-[#FFFAFA]" : "bg-secondary/25")}>
              <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14">
                <div>
                  <span aria-hidden="true" className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white/70 text-sm font-semibold text-primary">0{index + 1}</span>
                  <h2 id={`coaching-topic-${index}`} className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-foreground mb-5">{section.title}</h2>
                  <CoachingCopy>{section.copy.slice(0, listStart)}</CoachingCopy>
                </div>
                <div className="self-center rounded-2xl border border-border/50 bg-white/80 p-6 md:p-8">
                  <CoachingCopy>{section.copy.slice(listStart, listEnd)}</CoachingCopy>
                  <div className="mt-6 border-t border-primary/15 pt-6">
                    <CoachingCopy>{section.copy.slice(listEnd).trim()}</CoachingCopy>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section className="rounded-3xl bg-[#9BD7D8]/35 p-6 md:p-10 lg:p-12">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{process.title}</h2>
            <CoachingCopy>{processParts[0].trim()}</CoachingCopy>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {processSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-white bg-white/80 p-6">
                <CoachingCopy>{`### ${step.title}\n\n${step.copy}`}</CoachingCopy>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-2xl"><CoachingCopy>{processSteps.map((step) => step.after).filter(Boolean).join("\n\n")}</CoachingCopy></div>
        </section>

        <section className="rounded-3xl border border-border/60 bg-[#FFFAFA] p-6 md:p-10 lg:p-12">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-14">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight text-foreground">{audience.title}</h2>
            <CoachingCopy className="sm:prose-ul:columns-2 prose-li:break-inside-avoid">{audience.copy}</CoachingCopy>
          </div>
        </section>
      </div>

      {/* 3 program cards */}
      <section className="px-4 md:px-8 py-10 md:py-14 max-w-7xl bg-[#FFFAFA] mx-[15px] md:mx-[40px] lg:mx-[100px] my-8 md:my-16 rounded-3xl">
        <div className="grid md:grid-cols-3 gap-6">
          <ProgramCard
            ctaClassName={ctaClassName}
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
            ctaClassName={ctaClassName}
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
            ctaClassName={ctaClassName}
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

      {/* Retainer */}
      <section
        className="relative z-10 mx-[15px] md:mx-[40px] lg:mx-[100px] my-8 md:my-16 overflow-hidden rounded-3xl bg-[#9BD7D8]"
        style={secondarySectionBg}
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
              <CoachingButton
                onClick={() => setRetainerOpen(true)}
                className="w-full"
              >
                Start now
              </CoachingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Stand-alone Power Hour */}
      <section
        className="relative z-10 mx-[15px] md:mx-[40px] lg:mx-[100px] mt-6 mb-[25px] md:mb-[50px] overflow-hidden rounded-3xl bg-[#F2D2D7]"
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
            <CoachingButton
              onClick={() => openDialog("Stand-alone Power Hour")}
              className="mt-4 w-full"
            >
              Book My Power Hour
            </CoachingButton>
          </div>
        </div>
      </section>

      <section className="mx-[15px] md:mx-[40px] lg:mx-[100px] my-10 md:my-16 rounded-3xl bg-secondary/30 p-6 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-foreground mb-6">{closing.title}</h2>
          <CoachingCopy>{closing.copy}</CoachingCopy>
          <CoachingButton onClick={() => setDiscoveryOpen(true)} className="mt-8 w-full sm:w-auto">
            {coachingContent.cta}
          </CoachingButton>
        </div>
      </section>

      <section className="mx-[15px] md:mx-[40px] lg:mx-[100px] my-10 md:my-16 rounded-3xl border border-border/60 bg-[#FFFAFA] p-6 md:p-10 lg:p-12">
        <div className="grid lg:grid-cols-[0.65fr_1.35fr] gap-8 lg:gap-14">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{coachingContent.faqTitle}</h2>
          <div className="space-y-3">
            {coachingContent.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-border bg-white open:border-primary/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-base font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5"><CoachingCopy>{faq.answer}</CoachingCopy></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <DiscoveryCallDialog open={discoveryOpen} onOpenChange={setDiscoveryOpen} />

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
