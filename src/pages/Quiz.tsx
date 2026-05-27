import { useState } from "react";
import { Link } from "react-router-dom";
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
import { ArrowLeft, Clock, Compass, Sparkles } from "lucide-react";

const Quiz = () => {
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
        title="Find Your Coaching Program | Butterfly Effect Coach"
        description="Not sure where to start? Take this short quiz to find the coaching program that fits your season of life and career goals."
        path="/quiz"
      />
      {/* Soft gradient hero — distinct from DIY page */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 via-background to-background">
        {/* decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative px-6 pt-10 pb-6 md:pt-14 md:pb-8 max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/diy-coaching"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to DIY Coaching
          </Link>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/60 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-semibold mb-5">
              <Compass className="h-3.5 w-3.5" />
              The Clarity Compass
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Find your path in{" "}
              <span className="relative inline-block">
                <span className="relative z-10">3 minutes</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 h-2 bg-primary/25 rounded-full -z-0"
                />
              </span>
              .
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Six honest questions. One personalised result. Discover whether
              your next move is{" "}
              <strong className="text-foreground">Pivot</strong>,{" "}
              <strong className="text-foreground">Launch</strong>, or{" "}
              <strong className="text-foreground">Ascent</strong>.
            </p>

            {/* Mini meta-row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />3 minute read
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Personalised roadmap
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                100% free
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz body — clean, no extra background image */}
      <section className="px-4 md:px-8 pt-4 pb-16 md:pb-20 bg-background">
        <OwnYourNextQuiz
          onPurchaseClick={() => openEmailCapture("OwnYourNext")}
        />
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
                htmlFor="quiz-email"
                className="text-foreground font-medium"
              >
                Email
              </Label>
              <Input
                id="quiz-email"
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

export default Quiz;
