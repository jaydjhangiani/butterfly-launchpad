import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ProgramCardProps {
  emoji: string;
  title: string;
  duration: string;
  priceInr: string;
  priceUsd: string;
  format: string;
  features: ReactNode[];
  onCta: () => void;
  highlight?: boolean;
}

const ProgramCard = ({
  emoji,
  title,
  duration,
  priceInr,
  priceUsd,
  format,
  features,
  onCta,
  highlight = false,
}: ProgramCardProps) => {
  return (
    <div
      className={`bg-card rounded-2xl p-6 md:p-8 shadow-md border ${
        highlight ? "border-primary ring-2 ring-primary/20" : "border-border"
      } flex flex-col h-full`}
    >
      <div className="text-center mb-4">
        <span className="text-5xl">{emoji}</span>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mt-2">
          {title}
        </h3>
        <p className="text-sm text-primary font-semibold mt-1">{duration}</p>
      </div>

      <div className="text-center mb-5 pb-4 border-b border-border">
        <p className="text-2xl font-bold text-foreground">{priceInr}</p>
        <p className="text-sm text-muted-foreground">{priceUsd}</p>
      </div>

      <p className="text-sm text-muted-foreground italic text-center mb-4">
        {format}
      </p>

      <div className="mb-5 flex-1">
        <p className="text-foreground font-semibold text-sm mb-3">
          What we work on:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={onCta}
        className="w-full font-semibold rounded-full"
        size="lg"
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProgramCard;
