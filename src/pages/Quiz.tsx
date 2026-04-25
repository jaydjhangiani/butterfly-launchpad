import { useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
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

const heroBg = "/lovable-uploads/c0608300-b10b-4964-8008-2a3e109dd5c8.jpg";

const sectionBg = {
  backgroundImage: `url("${heroBg}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

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
      {/* Hero */}
      <section
        className="relative z-10 mx-[15px] md:mx-[25px] mt-4"
        style={sectionBg}
      >
        <div className="px-6 pt-12 pb-10 md:pt-16 md:pb-14 max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
            Free Career Clarity Quiz
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-3">
            Which path fits where you are now?
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Answer a few quick questions to find out whether your next step is
            Pivot, Launch, or Ascent — and what to do about it.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="px-4 md:px-8 py-10 md:py-14">
        <OwnYourNextQuiz
          onPurchaseClick={() => openEmailCapture("OwnYourNext")}
        />

        <div className="text-center mt-10">
          <Link
            to="/diy-coaching"
            className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
          >
            ← Back to DIY Coaching
          </Link>
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
              <Label htmlFor="quiz-email" className="text-foreground font-medium">
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
              Continue →
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Payment integration is coming soon. Submitting saves your interest.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
};

export default Quiz;
