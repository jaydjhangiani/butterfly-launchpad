import { useState } from "react";
import PageShell from "@/components/PageShell";
import SEO from "@/components/SEO";
import OwnYourNextQuiz from "@/components/OwnYourNextQuiz";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CoachingButton, CoachingCopy } from "@/components/CoachingContent";
import content from "@/content/diy-coaching.json";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import heroBg from "../assets/hero-bg.png";

const sectionBg = {
  backgroundImage: `url("${heroBg}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const DiyCoaching = () => {
  const [emailDialog, setEmailDialog] = useState<{
    open: boolean;
    product: string;
  }>({ open: false, product: "" });
  const [emailValue, setEmailValue] = useState("");

  const openEmailCapture = (product: string) => {
    setEmailValue("");
    setEmailDialog({ open: true, product });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim())) return;

    toast.success("You're in!", {
      description: `We've noted your interest in ${emailDialog.product}. Payment & delivery flow coming soon — you'll hear from us at ${emailValue}.`,
      duration: 6000,
    });
    setEmailDialog({ open: false, product: "" });
  };

  return (
    <PageShell>
      <SEO
        title="DIY Coaching for Women | Self Growth & Career Clarity"
        description="Explore DIY coaching programs for women focused on self-growth, mindset, confidence, and career clarity at your own pace."
        path="/diy-coaching"
      />
      <section className="mx-[15px] md:mx-[40px] lg:mx-[100px] mt-4 overflow-hidden rounded-3xl bg-[#F2D2D7]" style={sectionBg}>
        <div className="max-w-5xl mx-auto px-6 py-12 md:px-10 md:py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground text-center mb-8">{content.intro.title}</h1>
          <div className="rounded-2xl border border-white/70 bg-white/75 p-6 md:p-8">
            <CoachingCopy className="md:columns-2 md:gap-10">{content.intro.copy}</CoachingCopy>
          </div>
          <div className="mt-8 text-center">
            <CoachingButton asChild><a href="#diy-quiz">Start with the free quiz</a></CoachingButton>
          </div>
        </div>
      </section>

      <div className="mx-[15px] md:mx-[40px] lg:mx-[100px] my-10 md:my-16 space-y-6 md:space-y-8">
        {content.sections.slice(0, -1).map((section, index) => (
          <section key={section.title} aria-labelledby={`diy-section-${index}`} className={cn("rounded-3xl border border-border/60 p-6 md:p-10 lg:p-12", index % 2 === 0 ? "bg-[#FFFAFA]" : "bg-secondary/25")}>
            <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-6 lg:gap-14">
              <div>
                <span aria-hidden="true" className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white/70 text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h2 id={`diy-section-${index}`} className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-foreground">{section.title}</h2>
              </div>
              <div className="rounded-2xl border border-border/50 bg-white/80 p-6 md:p-8">
                <CoachingCopy>{section.copy}</CoachingCopy>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Quiz */}
      <section id="diy-quiz" className="scroll-mt-28 px-4 md:px-8 py-10 md:py-14 bg-[#FFFAFA] mx-[15px] md:mx-[40px] lg:mx-[100px] my-8 md:my-16 rounded-3xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Start with the free quiz
          </h2>
          <p className="text-muted-foreground">
            Find out which path fits where you actually are right now — Pivot,
            Launch, or Ascent.
          </p>
        </div>
        <OwnYourNextQuiz
          coachingButtonStyle
          onPurchaseClick={() => openEmailCapture("OwnYourNext")}
        />
      </section>

      <section className="mx-[15px] md:mx-[40px] lg:mx-[100px] my-10 md:my-16 rounded-3xl bg-secondary/30 p-6 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-foreground mb-6">{content.sections[content.sections.length - 1].title}</h2>
          <CoachingCopy>{content.sections[content.sections.length - 1].copy}</CoachingCopy>
          <CoachingButton asChild className="mt-8 w-full sm:w-auto"><a href="#diy-quiz">Start with the free quiz</a></CoachingButton>
        </div>
      </section>

      <section className="mx-[15px] md:mx-[40px] lg:mx-[100px] my-10 md:my-16 rounded-3xl border border-border/60 bg-[#FFFAFA] p-6 md:p-10 lg:p-12">
        <div className="grid lg:grid-cols-[0.65fr_1.35fr] gap-8 lg:gap-14">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{content.faqTitle}</h2>
          <div className="space-y-3">
            {content.faqs.map((faq) => (
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

      {/* Email capture dialog */}
      <Dialog
        open={emailDialog.open}
        onOpenChange={(o) => setEmailDialog((s) => ({ ...s, open: o }))}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{emailDialog.product}</DialogTitle>
            <DialogDescription>
              Pop your email below — we'll send delivery details and calendar
              invites here once payment is set up.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="diy-email"
                className="text-foreground font-medium"
              >
                Email
              </Label>
              <Input
                id="diy-email"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5"
                required
              />
            </div>
            <CoachingButton type="submit" className="w-full">
              Continue
            </CoachingButton>
            <p className="text-xs text-muted-foreground text-center">
              Payment integration is coming soon. Submitting saves your
              interest.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
};

export default DiyCoaching;
