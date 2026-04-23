import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CorporateEnquiryForm = () => {
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
    /^\+?[\d\s]{6,20}$/.test(form.phone.trim());

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
          <Input
            id="ce-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 9876543210"
            className="mt-1.5"
            required
          />
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
