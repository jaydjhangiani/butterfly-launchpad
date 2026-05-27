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
import { Button } from "@/components/ui/button";
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
      {/* Hero */}
      <section
        className="relative z-10 mx-[15px] md:mx-[40px] lg:mx-[100px] mt-4 bg-[#F2D2D7]"
        style={sectionBg}
      >
        <div className="px-6 pt-12 pb-10 md:pt-16 md:pb-14 max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
            DIY Coaching Support
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-3">
            OwnYourNext
          </h1>
          <p className="text-lg md:text-xl text-foreground italic mb-6">
            For the woman who feels unsure of her next career move.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            <strong className="text-foreground">OwnYourNext</strong> empowers
            women who aren't sure whether to grow where they are, pivot to
            something new, or launch something of their own. It provides a
            personalised clarity framework, a structured way forward, and
            built-in community accountability to help you move with intention.
          </p>
          <p className="mt-6 inline-flex items-center gap-3 bg-card border border-border rounded-full px-5 py-2 shadow-sm text-sm text-muted-foreground">
            This is currently under construction. Coming soon!
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="px-4 md:px-8 py-10 md:py-14 bg-[#FFFAFA] mx-[15px] md:mx-[40px] lg:mx-[100px] my-8 md:my-16 rounded-2xl">
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
          onPurchaseClick={() => openEmailCapture("OwnYourNext")}
        />
      </section>

      {/* Sunday Accountability */}
      {/* <section
        className="relative z-10 mx-[15px] md:mx-[40px] lg:mx-[100px] mt-6 mb-[25px]"
        style={sectionBg}
      >
        <div className="px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">
              Sunday Accountability
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              Want to keep the momentum going?
            </h2>
            <p className="text-muted-foreground">
              Already made progress with the digital planner but want to
              continue our Sunday accountability calls after your 8 weeks have
              lapsed?
            </p>
            <p className="text-foreground italic">— or —</p>
            <p className="text-muted-foreground">
              Don't need the planner but would like to be part of our
              accountability group of incredible women to retain the momentum in
              your life?
            </p>
            <p className="text-foreground font-semibold text-lg">
              We've got you!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <PriceCard
              emoji="🌅"
              title="1 Month"
              priceInr="INR 3,000"
              priceUsd="USD 35"
              features={[
                "Weekly Sunday Reset group calls",
                "Private community access",
                "Calendar invites for all sessions",
              ]}
              onCta={() => openEmailCapture("Sunday Accountability — 1 Month")}
            />
            <PriceCard
              emoji="🌻"
              title="3 Months"
              priceInr="INR 8,250"
              priceUsd="USD 90"
              features={[
                "Everything in 1 Month",
                "Build a sustained habit",
                "Quarterly progress check-in",
              ]}
              onCta={() => openEmailCapture("Sunday Accountability — 3 Months")}
              highlight
            />
            <PriceCard
              emoji="🌳"
              title="6 Months"
              priceInr="INR 15,000"
              priceUsd="USD 165"
              features={[
                "Everything in 3 Months",
                "Best value for long-term momentum",
                "Half-year of community support",
              ]}
              onCta={() => openEmailCapture("Sunday Accountability — 6 Months")}
            />
          </div>
        </div>
      </section> */}

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
            <Button type="submit" className="w-full font-semibold" size="lg">
              Continue
            </Button>
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
