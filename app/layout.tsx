import type { Metadata } from "next";
import "./globals.css";
import { ShoppingProvider } from "./storefront";

const basePath = import.meta.env.BASE_URL;
const fontStyles = `
@font-face{font-family:'Caveat';font-style:normal;font-weight:500;font-display:swap;src:url(${basePath}fonts/brand-0.ttf) format('truetype')}
@font-face{font-family:'DM Sans';font-style:normal;font-weight:400;font-display:swap;src:url(${basePath}fonts/brand-1.ttf) format('truetype')}
@font-face{font-family:'DM Sans';font-style:normal;font-weight:600;font-display:swap;src:url(${basePath}fonts/brand-2.ttf) format('truetype')}
@font-face{font-family:'DM Serif Display';font-style:normal;font-weight:400;font-display:swap;src:url(${basePath}fonts/brand-3.ttf) format('truetype')}
`;

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
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      </head>
      <body className="antialiased">
        <ShoppingProvider>{children}</ShoppingProvider>
      </body>
    </html>
  );
}