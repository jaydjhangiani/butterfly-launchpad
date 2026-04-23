import { forwardRef } from "react";

const SiteFooter = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer
      ref={ref}
      className="relative z-10 border-t border-border py-8 px-6 text-center text-sm text-muted-foreground bg-primary-foreground"
    >
      <p className="font-semibold text-foreground mb-1">
        Butterfly Effect Coaching
      </p>
      <p className="mb-1">
        © {new Date().getFullYear()} Krusha Sahjwani. Proudly created by JXOS
      </p>
    </footer>
  );
});

SiteFooter.displayName = "SiteFooter";

export default SiteFooter;
