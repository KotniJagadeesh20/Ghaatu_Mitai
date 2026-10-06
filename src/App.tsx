import { BrowserRouter, Routes, Route } from "react-router-dom";
import Storefront, { ShoppingProvider } from "@/app/storefront";
import { LanguageProvider } from "./i18n";

// Same single source of truth as the legacy config
// (vite.config.ts / next.config.ts): "/" locally and on Cloudflare,
// "/Ghaatu_Mitai/" for the GitHub Pages build, driven entirely by
// vite.react.config.ts's `base` - never hardcoded here.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

// Storefront's existing `Storefront({ page })` pattern (see
// app/storefront.tsx) is preserved as-is: each route just renders it with
// the matching page name, exactly like the legacy app/*/page.tsx files do.
export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <ShoppingProvider>
          <Routes>
            <Route path="/" element={<Storefront page="home" />} />
            <Route path="/shop" element={<Storefront page="shop" />} />
            <Route path="/about" element={<Storefront page="about" />} />
            <Route path="/bulk-orders" element={<Storefront page="bulk-orders" />} />
            <Route path="/wholesale" element={<Storefront page="wholesale" />} />
            <Route path="/contact" element={<Storefront page="contact" />} />
          </Routes>
        </ShoppingProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

