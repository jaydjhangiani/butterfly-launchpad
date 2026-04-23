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

interface DiscoveryCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DiscoveryCallDialog = ({
  open,
  onOpenChange,
}: DiscoveryCallDialogProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const isValid =
    form.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    /^\+?[\d\s]{6,20}$/.test(form.phone.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    toast.success("Thanks — your discovery call request is in.", {
      description:
        "Calendly will be added in the next phase. For now, I'll reach out personally to schedule.",
      duration: 6000,
    });

    setForm({ name: "", email: "", phone: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book your discovery call</DialogTitle>
          <DialogDescription>
            Share your details and I'll reach out to coordinate the best next step.
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
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dc-phone">Phone</Label>
            <Input
              id="dc-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+91 9876543210"
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full font-semibold">
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscoveryCallDialog;