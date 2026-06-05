import { useEffect, useState } from "react";
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
import { track } from "@/lib/analytics";

const COUNTRY_CODES = [
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+1-CA", dialCode: "+1", label: "🇨🇦 +1 (CA)" },
  { code: "+64", label: "🇳🇿 +64" },
  { code: "+27", label: "🇿🇦 +27" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+60", label: "🇲🇾 +60" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+31", label: "🇳🇱 +31" },
  { code: "+46", label: "🇸🇪 +46" },
  { code: "+47", label: "🇳🇴 +47" },
  { code: "+45", label: "🇩🇰 +45" },
  { code: "+55", label: "🇧🇷 +55" },
  { code: "+52", label: "🇲🇽 +52" },
  { code: "+81", label: "🇯🇵 +81" },
  { code: "+82", label: "🇰🇷 +82" },
  { code: "+86", label: "🇨🇳 +86" },
  { code: "+7", label: "🇷🇺 +7" },
  { code: "+92", label: "🇵🇰 +92" },
  { code: "+880", label: "🇧🇩 +880" },
  { code: "+94", label: "🇱🇰 +94" },
];

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open(): void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler(response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }): void;
  modal: { ondismiss(): void };
}

interface PrePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
  submitLabel?: string;
}

const timeOptions = ["Morning", "Afternoon", "Evening"] as const;

const loadRazorpay = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });

const PrePaymentDialog = ({
  open,
  onOpenChange,
  packageName,
  submitLabel = "Continue to Payment",
}: PrePaymentDialogProps) => {
  useEffect(() => {
    if (open) track("payment_dialog_opened", { package_name: packageName });
  }, [open, packageName]);

  const [name, setName] = useState("");
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [dayPref, setDayPref] = useState("either");
  const [timePrefs, setTimePrefs] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);

  const toggleTime = (t: string) => {
    setTimePrefs((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  const isValid =
    name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    /^\d{6,15}$/.test(phone.replace(/\s/g, "")) &&
    timePrefs.length > 0;

  const resetForm = () => {
    setName("");
    setCurrency("INR");
    setDayPref("either");
    setTimePrefs([]);
    setEmail("");
    setPhone("");
    setCountryCode("+91");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;
    setLoading(true);

    try {
      // 1. Create order server-side (amount is looked up server-side — never exposed here)
      const res = await fetch("/.netlify/functions/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: `${COUNTRY_CODES.find((c) => c.code === countryCode)?.dialCode ?? countryCode}${phone.trim()}`,
          packageName,
          dayPref,
          timePrefs,
          currency,
        }),
      });

      const orderData = await res.json();

      if (!res.ok) {
        toast.error(orderData.error || "Failed to initiate payment. Please try again.");
        setLoading(false);
        return;
      }

      // Foreign currency — no Razorpay, just notify
      if (orderData.foreignCurrency) {
        track("foreign_currency_requested", { package_name: packageName });
        toast.success("We've received your details!", {
          description:
            "For foreign currency payments, we will reach out to you with bank details.",
          duration: 8000,
        });
        resetForm();
        onOpenChange(false);
        setLoading(false);
        return;
      }

      // 2. Load Razorpay checkout script
      await loadRazorpay();

      track("payment_initiated", { package_name: packageName, currency });

      // 3. Open checkout
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Butterfly Coaching",
        description: packageName,
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        theme: { color: "#7c3aed" },
        handler: async (response) => {
          // 4. Verify payment signature server-side
          try {
            const verifyRes = await fetch("/.netlify/functions/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              track("payment_completed", { package_name: packageName, currency });
              toast.success("Payment confirmed!", {
                description:
                  "You'll receive your pre-work handbook by email within 24 hours.",
                duration: 7000,
              });
              resetForm();
              onOpenChange(false);
            } else {
              toast.error(
                "Payment received but verification failed. Please contact us with your payment ID: " +
                  response.razorpay_payment_id,
              );
            }
          } catch {
            toast.error(
              "Payment received but verification failed. Please contact us with your payment ID: " +
                response.razorpay_payment_id,
            );
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
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
            <Label className="text-foreground font-medium">Pay in</Label>
            <div className="flex rounded-lg border border-border overflow-hidden w-fit">
              {(["INR", "USD"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-5 py-2 text-sm font-semibold transition-colors ${
                    currency === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {c === "INR" ? "₹ INR" : "Foreign Currency"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pp-name" className="text-foreground font-medium">
              Full name
            </Label>
            <Input
              id="pp-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              required
            />
          </div>

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
              Phone
            </Label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={loading}
                className="flex h-10 w-36 shrink-0 rounded-md border border-input bg-[fefefe] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <Input
                id="pp-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                required
                className="flex-1"
              />
            </div>
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
            disabled={!isValid || loading}
            className="w-full font-semibold"
            size="lg"
          >
            {loading ? "Processing..." : submitLabel}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrePaymentDialog;
