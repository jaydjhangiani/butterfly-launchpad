import ReactMarkdown from "react-markdown";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ctaClassName = "h-auto min-h-12 max-w-full whitespace-normal rounded-full px-7 py-3 text-sm font-semibold leading-snug";

export const CoachingButton = ({ className, ...props }: ButtonProps) => (
  <Button {...props} size="lg" className={cn(ctaClassName, className)} />
);

export const CoachingCopy = ({ children, className }: { children: string; className?: string }) => (
  <div className={cn("prose max-w-none text-muted-foreground prose-p:leading-relaxed prose-p:my-4 prose-headings:text-foreground prose-h3:text-xl prose-strong:text-foreground prose-li:my-1 prose-ul:pl-5 prose-li:marker:text-primary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}>
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
);

