import posthog from "posthog-js";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props: Record<string, unknown> = {}) {
  const enriched = { ...props, page: window.location.pathname };

  if (typeof window.gtag === "function") {
    window.gtag("event", event, enriched);
  }

  posthog.capture(event, enriched);
}
