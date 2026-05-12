import { useState } from "react";
import { toast } from "sonner";
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

const CALENDLY_URL = "https://calendly.com/coachkrusha/chemistry-session";

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

interface DiscoveryCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DiscoveryCallDialog = ({
  open,
  onOpenChange,
}: DiscoveryCallDialogProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", countryCode: "+91" });
  const [loading, setLoading] = useState(false);

  const isValid =
    form.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.phone.trim().length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;

    const dialCode = COUNTRY_CODES.find((c) => c.code === form.countryCode)?.dialCode ?? form.countryCode;
    const fullPhone = `${dialCode}${form.phone.trim()}`;

    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/discovery-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: fullPhone }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Something went wrong");
      }

      setForm({ name: "", email: "", phone: "", countryCode: "+91" });
      onOpenChange(false);
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book your discovery call</DialogTitle>
          <DialogDescription>
            Share your details and you'll be taken to our scheduling page to pick a time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="dc-name">Name</Label>
            <Input
              id="dc-name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Your name"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dc-email">Email</Label>
            <Input
              id="dc-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dc-phone">Phone</Label>
            <div className="flex gap-2">
              <select
                value={form.countryCode}
                onChange={(e) => setForm((prev) => ({ ...prev, countryCode: e.target.value }))}
                disabled={loading}
                className="flex h-10 w-36 shrink-0 rounded-md border border-input bg-[fefefe] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Input
                id="dc-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="9876543210"
                required
                disabled={loading}
                className="flex-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
            disabled={!isValid || loading}
          >
            {loading ? "Saving..." : "Book my call"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscoveryCallDialog;
