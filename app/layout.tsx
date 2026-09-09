import type { Metadata } from "next";
import "./brand-fonts.css";
import "./globals.css";
import {ShoppingProvider} from "./storefront";

export const metadata: Metadata = {
  title: "Ghaatu Mitai | Traditional Sweets & Snacks",
  description: "Authentic Telugu sweets and snacks, made with the warmth of home. Explore Ghaatu Mitai favourites, celebration gifts and wholesale partnerships.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><ShoppingProvider>{children}</ShoppingProvider></body>
    </html>
  );
}
