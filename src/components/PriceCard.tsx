import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface PriceCardProps {
  emoji?: string;
  title: string;
  subtitle?: string;
  priceInr: string;
  priceUsd: string;
  pricePeriod?: string;
  features: ReactNode[];
  ctaLabel?: string;
  onCta?: () => void;
  highlight?: boolean;
}

const PriceCard = ({
  emoji,
  title,
  subtitle,
  priceInr,
  priceUsd,
  pricePeriod,
  features,
  ctaLabel = "Buy Now",
  onCta,
  highlight = false,
}: PriceCardProps) => {
  return (
    <div
      className={`bg-card rounded-2xl p-6 md:p-7 shadow-md border ${
        highlight ? "border-primary ring-2 ring-primary/20" : "border-border"
      } flex flex-col h-full`}
    >
      <div className="text-center mb-4">
        {emoji && <span className="text-4xl">{emoji}</span>}
        <h3 className="text-lg font-bold text-foreground mt-2">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground italic mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="text-center mb-5 pb-4 border-b border-border">
        <p className="text-2xl font-bold text-primary">{priceInr}</p>
        <p className="text-sm text-muted-foreground">{priceUsd}</p>
        {pricePeriod && (
          <p className="text-xs text-muted-foreground mt-1">{pricePeriod}</p>
        )}
      </div>

      <ul className="space-y-2 text-sm text-muted-foreground flex-1 mb-5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-primary mt-0.5 shrink-0">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onCta}
        className="w-full font-semibold rounded-full"
        size="lg"
      >
        {ctaLabel}
      </Button>
    </div>
  );
};

export default PriceCard;
