import { useEffect, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

interface LeadCaptureFormProps {
  compact?: boolean;
}

const countryCodes = [
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+44", label: "🇬🇧 +44" },
  { value: "+91", label: "🇮🇳 +91" },
  { value: "+61", label: "🇦🇺 +61" },
  { value: "+971", label: "🇦🇪 +971" },
  { value: "+65", label: "🇸🇬 +65" },
  { value: "+49", label: "🇩🇪 +49" },
  { value: "+33", label: "🇫🇷 +33" },
  { value: "+81", label: "🇯🇵 +81" },
  { value: "+86", label: "🇨🇳 +86" },
  { value: "+55", label: "🇧🇷 +55" },
  { value: "+27", label: "🇿🇦 +27" },
  { value: "+234", label: "🇳🇬 +234" },
  { value: "+254", label: "🇰🇪 +254" },
  { value: "+62", label: "🇮🇩 +62" },
];

const referralSources = [
  "Instagram",
  "LinkedIn",
  "Facebook",
  "Google Search",
  "Friend / Referral",
  "Other",
];

const LeadCaptureForm = ({ compact = false }: LeadCaptureFormProps) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (compact) {
      setFormData((prev) => ({ ...prev, referralSource: "Website" }));
    }
  }, [compact]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    referralSource: "",
  });

  const getErrors = (data: typeof formData) => {
    const e: Record<string, string> = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      e.email = "Please enter a valid email";
    if (!data.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{6,15}$/.test(data.phone.trim()))
      e.phone = "Please enter a valid phone number";
    if (!data.referralSource)
      e.referralSource = "Please select how you found me";
    return e;
  };

  const errors = getErrors(formData);
  const isFormValid = Object.keys(errors).length === 0;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, referralSource: true });

    if (!isFormValid || !captchaToken) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/.netlify/functions/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      track("lead_form_submitted", { referral_source: formData.referralSource });

      toast.success("Thank you!", {
        description: "I'll be in touch soon!",
      });

      setFormData({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        referralSource: "",
      });

      setCaptchaToken(null);
      setTouched({});
    } catch (err) {
      toast.error("Something went wrong", {
        description: "Please try again in a moment.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-4" : "space-y-5"}
    >
      <div>
        <Label htmlFor="name" className="text-foreground font-medium">
          Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, name: true }))}
          placeholder="Your name"
          className={`mt-1.5 bg-card border-border ${touched.name && errors.name ? "border-destructive" : ""}`}
        />
        {touched.name && errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email" className="text-foreground font-medium">
          Email ID
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, email: true }))}
          placeholder="you@example.com"
          className={`mt-1.5 bg-card border-border ${touched.email && errors.email ? "border-destructive" : ""}`}
        />
        {touched.email && errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <Label className="text-foreground font-medium">Phone Number</Label>
        <div className="gap-2 mt-1.5 flex flex-col md:flex-row">
          <Select
            value={formData.countryCode}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, countryCode: val }))
            }
          >
            <SelectTrigger className="w-full md:w-[110px] bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
            placeholder="Phone number"
            className={`flex-1 bg-card border-border ${touched.phone && errors.phone ? "border-destructive" : ""}`}
          />
        </div>
        {touched.phone && errors.phone && (
          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
        )}
      </div>
      {!compact && (
        <div>
          <Label className="text-foreground font-medium">
            How did you find me?
          </Label>
          <Select
            value={formData.referralSource}
            onValueChange={(val) => {
              updateField("referralSource", val);
            }}
          >
            <SelectTrigger
              className={`mt-1.5 bg-card border-border ${touched.referralSource && errors.referralSource ? "border-destructive" : ""}`}
            >
              <SelectValue placeholder="Select one..." />
            </SelectTrigger>
            <SelectContent>
              {referralSources.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched.referralSource && errors.referralSource && (
            <p className="text-sm text-destructive mt-1">
              {errors.referralSource}
            </p>
          )}
        </div>
      )}
      <Turnstile
        siteKey="0x4AAAAAACyDlETAILUdoCE5"
        onSuccess={(token) => {
          setCaptchaToken(token);
        }}
        onError={() => {
          setCaptchaToken(null);
        }}
        onExpire={() => {
          setCaptchaToken(null);
        }}
      />

      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full text-base py-4 font-semibold tracking-wide"
        size="lg"
      >
        {isSubmitting ? "Sending..." : compact ? "Continue" : "Let's Chat!"}
      </Button>
    </form>
  );
};

export default LeadCaptureForm;
