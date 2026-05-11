import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import pccBadge from "@/assets/pcc-badge.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/private-coaching", label: "Private Coaching" },
  { to: "/diy-coaching", label: "DIY Coaching" },
  { to: "/corporate", label: "Corporate" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <nav className="sticky top-0 z-50 bg-primary-foreground/95 backdrop-blur-sm border-b border-border">
      <div className="flex flex-row items-center justify-between px-4 md:px-6 py-0">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Butterfly Effect Coach"
            className="h-28 md:h-36 "
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "px-4 py-2 rounded-full text-sm lg:text-base font-semibold transition-colors",
                isActive(l.to)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <img
            src={pccBadge}
            alt="ICF Associate Certified Coach"
            className="h-16 md:h-20 "
          />

          {/* Mobile trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden p-2 rounded-md hover:bg-secondary text-foreground"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-2 mt-8">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-lg text-base font-semibold transition-colors",
                      isActive(l.to)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary",
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
