import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Deliberately separate from vite.config.ts, which still drives the
// existing Next/Vinext app (kept as-is as the rollback reference per the
// migration plan). This config builds ONLY the new plain React + Vite app
// (index.html / src/main.tsx / src/App.tsx).
//
// Same single deployment signal as the legacy config
// (vite.config.ts / next.config.ts): GITHUB_PAGES=true selects the GitHub
// Pages base path, everything else (local dev, Cloudflare) uses "/". This
// value is intentionally duplicated for now since the two configs are
// independent scaffolds during the migration; Phase 6 should collapse
// them into one source of truth once the legacy config is removed.
const isGithubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isGithubPages ? "/Ghaatu_Mitai/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      // Matches tsconfig.json's "@/*": ["./*"] so app/storefront.tsx's
      // existing `@/components/ui/...` imports resolve unchanged here too.
      "@": dirname,
      // See src/compat/next-link.tsx for why this alias exists: it lets
      // storefront.tsx's existing `import Link from 'next/link'` resolve
      // to a react-router-dom-backed implementation in this app only,
      // without editing the file shared with the legacy app.
      "next/link": path.resolve(dirname, "src/compat/next-link.tsx"),
    },
  },
  build: {
    // Kept separate from dist/client (the legacy build's output, which
    // package.json's existing "deploy" script pushes to GitHub Pages) so
    // this scaffold can never clobber the working legacy deployment while
    // both stacks coexist.
    outDir: "dist-vite/client",
    emptyOutDir: true,
  },
});
