# Ghaatu Mitai — React Website

Latest reference-matched design (version 2).

## Run locally

Install Node.js 22.13.0 or newer, then open a terminal inside this folder:

```bash
npm ci
npm run dev
```

Open the local URL printed in the terminal (normally http://localhost:5173).
No ChatGPT account, API keys, or database are needed for the storefront.

## Production build

```bash
npm run build
npm start
```

The existing build produces a Cloudflare-compatible Worker. `npm start` previews
that build locally; it does not publish it. This is a React 19 + TypeScript app
using Vinext (Vite with Next.js App Router APIs), not a Create React App project.

## Main files

- `app/storefront.tsx`: React sections, product catalogue, cart, search,
  favourites, size selection, newsletter preview and enquiry forms.
- `app/globals.css`: responsive layout, colors, cards and reference styling.
- `app/brand-fonts.css`: locally bundled font definitions.
- `app/layout.tsx`: shared layout, metadata and shopping state provider.
- `app/page.tsx`: home route.
- `app/[page]/page.tsx`: shop, about, bulk-orders, wholesale and contact routes.
- `components/ui/`: reusable accessible interface components.
- `public/images/`: supplied reference images used by the Art component.
- `public/fonts/`: local DM Sans, DM Serif Display and Caveat fonts.
- `public/favicon.svg`: website icon.

## Customize

Edit the `products` array in `app/storefront.tsx` to change names, descriptions,
prices or categories. Pack prices are currently calculated from the 250g price.
Change the shared theme variables and style rules in `app/globals.css` for colors
and layout. The later reference-style rules override earlier base styles.

The `Art` component displays selected regions of the supplied images using CSS.
It does not recreate their artwork. Replace those regions with individual
production photographs when available. Original brand and handwritten lettering
are reused from the reference; remaining fonts are visual approximations.

## Current behavior and launch work

- Cart, favourites, search, filters and size selection work in the browser.
- Cart and favourites stay while navigating within the app and reset on refresh.
- Checkout displays an order summary; it does not accept payments or place orders.
- Enquiry forms prepare downloadable text; they do not send messages.
- Newsletter signup displays a preview notice and does not submit an email.
- Support links currently open enquiry forms, not final policy pages.
- Review quotes, ratings, contact information and commercial claims come from the
  supplied design references. Verify and replace them before public launch.
- Connect actual inventory, checkout, order storage, email delivery and policy
  content before accepting real customer orders.

## Included / excluded

All tracked source, dependencies lockfile, image assets and local fonts are
included. Dependencies (`node_modules`), build output, Git history, local runtime
state and credentials are excluded. The exported hosting manifest has no Site
project ID, so this copy is not bound to the existing hosted website.
