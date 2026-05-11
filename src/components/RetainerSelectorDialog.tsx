import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RETAINER_OPTIONS = [
  { value: "Monthly", label: "Monthly", price: "INR 10,500 / USD 125" },
  { value: "Quarterly", label: "Quarterly", price: "INR 28,500 / USD 320" },
  { value: "Half-year", label: "Half-year", price: "INR 55,500 / USD 600" },
  { value: "Annual", label: "Annual", price: "INR 1,08,000 / USD 1170" },
] as const;

interface RetainerSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (packageName: string) => void;
}

const RetainerSelectorDialog = ({
  open,
  onOpenChange,
  onContinue,
}: RetainerSelectorDialogProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(
    RETAINER_OPTIONS[0].value,
  );

  const activeOption = useMemo(
    () =>
      RETAINER_OPTIONS.find((option) => option.value === selectedPlan) ??
      RETAINER_OPTIONS[0],
    [selectedPlan],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md ">
        <DialogHeader>
          <DialogTitle>Select your retainer format</DialogTitle>
          <DialogDescription>
            Choose the support window that feels right for your season.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Select value={selectedPlan} onValueChange={setSelectedPlan}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a plan" />
            </SelectTrigger>
            <SelectContent>
              {RETAINER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="rounded-lg border border-border bg-secondary/40 p-4 text-center">
            <p className="text-sm text-muted-foreground">Selected investment</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {activeOption.price}
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            className="w-full font-semibold"
            onClick={() => onContinue(`Retainer — ${activeOption.label} plan`)}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RetainerSelectorDialog;
