import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import posthog from "posthog-js";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    posthog.capture("$pageview", { $current_url: window.location.href });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
