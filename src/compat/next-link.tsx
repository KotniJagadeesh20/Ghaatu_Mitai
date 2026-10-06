// Compatibility shim - NOT a real copy of next/link.
//
// app/storefront.tsx - and the components extracted from it under
// src/components/ - are still shared with the legacy Next/Vinext app (its
// page.tsx files import storefront.tsx directly), so it isn't safe to edit
// their `import Link from 'next/link'` lines in place: react-router-dom's <Link>
// throws outside a <Router> context, and the legacy app has no
// <BrowserRouter> (it has vinext's own Next-compatible router instead).
// Confirmed empirically - swapping that import broke the legacy static
// export (vinext prerendered 1 route instead of 7, the same failure mode
// as the earlier basePath prerender bug).
//
// Instead, vite.react.config.ts (the NEW app's Vite config only - the
// legacy vite.config.ts is untouched) aliases the specifier "next/link" to
// this file. Every existing `next/link` import (storefront.tsx and the
// extracted components) resolves here when bundled for the new app, and
// still resolves to the real next/link package when bundled for the legacy
// app. No call site needs to change.
//
// react-router-dom's <Link> is for in-app route navigation only. One call
// site (src/components/EnquiryDialog.tsx) uses `href` for a `data:` URI with a `download`
// attribute (the enquiry-form download link) - not a route. Letting
// react-router intercept that click would preventDefault() the native
// download. This wrapper keeps every existing `<Link href=... />` call
// site unchanged and picks the right element per href:
// anything not starting with "/" (data:, mailto:, http(s):, etc.) renders
// a plain <a>; in-app paths render react-router-dom's <Link to={href}>.
import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";
import { Link as RouterLink } from "react-router-dom";

type NextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

const Link = forwardRef<HTMLAnchorElement, NextLinkProps>(function Link(
  { href, ...props },
  ref
) {
  if (!href.startsWith("/")) {
    return <a ref={ref} href={href} {...props} />;
  }
  return <RouterLink ref={ref} to={href} {...props} />;
});

export default Link;
