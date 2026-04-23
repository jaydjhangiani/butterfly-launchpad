import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface PrePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
  submitLabel?: string;
}

const timeOptions = ["Morning", "Afternoon", "Evening"] as const;

const PrePaymentDialog = ({
  open,
  onOpenChange,
  packageName,
  submitLabel = "Continue to Payment",
}: PrePaymentDialogProps) => {
  const [dayPref, setDayPref] = useState("either");
  const [timePrefs, setTimePrefs] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const toggleTime = (t: string) => {
    setTimePrefs((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  const isValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    /^\+?\d{6,15}$/.test(phone.replace(/\s/g, "")) &&
    timePrefs.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    toast.success("Thank you for investing in yourself!", {
      description:
        "You'll receive an email/WhatsApp message within 24 hours with the next steps.",
      duration: 6000,
    });

    setDayPref("either");
    setTimePrefs([]);
    setEmail("");
    setPhone("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{packageName}</DialogTitle>
          <DialogDescription>
            A few quick questions so we can find a time that works for you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Do you prefer sessions on weekdays or weekends?
            </Label>
            <RadioGroup value={dayPref} onValueChange={setDayPref}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="weekdays" id="weekdays" />
                <Label htmlFor="weekdays" className="font-normal cursor-pointer">
                  Weekdays
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="weekends" id="weekends" />
                <Label htmlFor="weekends" className="font-normal cursor-pointer">
                  Weekends
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="either" id="either" />
                <Label htmlFor="either" className="font-normal cursor-pointer">
                  Either works
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Preferred time of day (select one or more)
            </Label>
            <div className="space-y-2">
              {timeOptions.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Checkbox
                    id={`time-${t}`}
                    checked={timePrefs.includes(t)}
                    onCheckedChange={() => toggleTime(t)}
                  />
                  <Label
                    htmlFor={`time-${t}`}
                    className="font-normal cursor-pointer"
                  >
                    {t}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pp-email" className="text-foreground font-medium">
              Email
            </Label>
            <Input
              id="pp-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pp-phone" className="text-foreground font-medium">
              Phone (with country code)
            </Label>
            <Input
              id="pp-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              required
            />
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 text-xs text-muted-foreground">
            Once you make payment, you will receive a pre-work handbook by email
            within 24 hours, to get started on your program. Your first session
            will take place within two weeks of payment. Final day/time options
            and scheduling will be discussed with you privately on the number
            you've shared within 48 hours of payment.
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full font-semibold"
            size="lg"
          >
            {submitLabel}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrePaymentDialog;
