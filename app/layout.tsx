import type { Metadata } from "next";
import "./globals.css";
import { teluguFontFaces } from "../src/i18n/fonts";
import { ShoppingProvider } from "./storefront";
import { LanguageProvider } from "../src/i18n";

const basePath = import.meta.env.BASE_URL;
const fontStyles = `
@font-face{font-family:'Caveat';font-style:normal;font-weight:500;font-display:swap;src:url(${basePath}fonts/brand-0.ttf) format('truetype')}
@font-face{font-family:'DM Sans';font-style:normal;font-weight:400;font-display:swap;src:url(${basePath}fonts/brand-1.ttf) format('truetype')}
@font-face{font-family:'DM Sans';font-style:normal;font-weight:600;font-display:swap;src:url(${basePath}fonts/brand-2.ttf) format('truetype')}
@font-face{font-family:'DM Serif Display';font-style:normal;font-weight:400;font-display:swap;src:url(${basePath}fonts/brand-3.ttf) format('truetype')}
${teluguFontFaces(basePath)}`;

export const metadata: Metadata = {
  title: "Ghaatu Mitai | Traditional Sweets & Snacks",
  description:
    "Authentic Telugu sweets and snacks, made with the warmth of home. Explore Ghaatu Mitai favourites, celebration gifts and wholesale partnerships.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${basePath}favicon.svg`,
    shortcut: `${basePath}favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // LanguageProvider updates `lang` after mount for Telugu visitors.
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <ShoppingProvider>{children}</ShoppingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}