import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

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

const LeadCaptureForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    referralSource: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{6,15}$/.test(formData.phone.trim()))
      newErrors.phone = "Please enter a valid phone number";
    if (!formData.referralSource)
      newErrors.referralSource = "Please select how you found me";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/.netlify/functions/submit", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      toast({
        title: "Thank you!",
        description:
          "I'll be in touch soon to schedule our chat. Looking forward to it!",
      });

      setFormData({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        referralSource: "",
      });
      setErrors({});
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="name" className="text-foreground font-medium">
          Name
        </Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Your name"
          className={`mt-1.5 bg-card border-border ${errors.name ? "border-destructive" : ""}`}
        />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="text-foreground font-medium">
          Email ID
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="you@example.com"
          className={`mt-1.5 bg-card border-border ${errors.email ? "border-destructive" : ""}`}
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
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
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="Phone number"
            className={`flex-1 bg-card border-border ${errors.phone ? "border-destructive" : ""}`}
          />
        </div>
        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
      </div>

      <div>
        <Label className="text-foreground font-medium">
          How did you find me?
        </Label>
        <Select
          value={formData.referralSource}
          onValueChange={(val) =>
            setFormData((prev) => ({ ...prev, referralSource: val }))
          }
        >
          <SelectTrigger className="mt-1.5 bg-card border-border">
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
        {errors.referralSource && <p className="text-sm text-destructive mt-1">{errors.referralSource}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-base py-4 font-semibold tracking-wide"
        style={{ backgroundColor: "#7bb4b5ff" }}
        size="lg"
      >
        {isSubmitting ? "Sending..." : "Let's Chat!"}
      </Button>
    </form>
  );
};

export default LeadCaptureForm;
