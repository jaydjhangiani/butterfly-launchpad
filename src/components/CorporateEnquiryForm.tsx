import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

const CorporateEnquiryForm = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [form, setForm] = useState({
    nameRole: "",
    organisation: "",
    requirement: "",
    email: "",
    phone: "",
  });

  const isValid =
    form.nameRole.trim() &&
    form.organisation.trim() &&
    form.requirement.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    /^\d{6,15}$/.test(form.phone.replace(/\s/g, ""));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    toast.success("Thank you for thinking of me!", {
      description:
        "After you submit: thank you for thinking of me — I'm excited to support you and your teams. Please expect a call and email from me within 24 hours of your form submission.",
      duration: 7000,
    });

    setForm({
      nameRole: "",
      organisation: "",
      requirement: "",
      email: "",
      phone: "",
    });
    setCountryCode("+91");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="ce-name" className="text-foreground font-medium">
          Name and role
        </Label>
        <Input
          id="ce-name"
          value={form.nameRole}
          onChange={(e) => setForm({ ...form, nameRole: e.target.value })}
          placeholder="e.g. Priya Sharma, Head of People"
          className="mt-1.5"
          required
        />
      </div>

      <div>
        <Label htmlFor="ce-org" className="text-foreground font-medium">
          Organisation name
        </Label>
        <Input
          id="ce-org"
          value={form.organisation}
          onChange={(e) => setForm({ ...form, organisation: e.target.value })}
          placeholder="Your company"
          className="mt-1.5"
          required
        />
      </div>

      <div>
        <Label htmlFor="ce-req" className="text-foreground font-medium">
          Requirement
        </Label>
        <Textarea
          id="ce-req"
          value={form.requirement}
          onChange={(e) => setForm({ ...form, requirement: e.target.value })}
          placeholder="Tell me a little about who this is for, what you'd like to achieve, and any details you have on timing or location."
          className="mt-1.5 min-h-[120px]"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ce-email" className="text-foreground font-medium">
            Email
          </Label>
          <Input
            id="ce-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className="mt-1.5"
            required
          />
        </div>
        <div>
          <Label htmlFor="ce-phone" className="text-foreground font-medium">
            Phone
          </Label>
          <div className="flex gap-2 mt-1.5">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="flex h-10 w-32 shrink-0 rounded-md border border-input bg-[fefefe] px-2 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
            <Input
              id="ce-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="9876543210"
              className="flex-1"
              required
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className="w-full font-semibold"
        size="lg"
      >
        Submit Enquiry
      </Button>
    </form>
  );
};

export default CorporateEnquiryForm;
