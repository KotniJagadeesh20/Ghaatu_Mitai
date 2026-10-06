import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Reuse the existing styling/fonts as-is - no redesign. app/brand-fonts.css
// is currently unused by the legacy app (its app/layout.tsx builds the same
// @font-face rules inline instead), but its font url()s are root-relative
// (see app/brand-fonts.css), so Vite's normal CSS asset pipeline resolves
// and rewrites them against the configured `base` automatically here.
import "../app/globals.css";
import "../app/brand-fonts.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

