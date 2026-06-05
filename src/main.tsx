import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import App from "./App.tsx";
import "./index.css";

const PH_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const PH_HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://us.i.posthog.com";

if (PH_KEY) {
  posthog.init(PH_KEY, {
    api_host: "/ingest",
    ui_host: PH_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
    disable_session_recording: true,
  });
}

createRoot(document.getElementById("root")!).render(<App />);
