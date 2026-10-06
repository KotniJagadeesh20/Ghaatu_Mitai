/* =========================================================
   Mobile navigation sheet

   Extracted from app/storefront.tsx (Phase 3, extraction #9.3a).
   Markup, classes, Sheet configuration, title/description text,
   nav link order, keys, icons and close behavior are unchanged.
   The only renames are `menu` -> `open` and `setMenu` ->
   `onOpenChange`; the open state itself stays owned by Storefront
   (the header's "Open navigation" button sets it).

   `Link` is deliberately imported from 'next/link' (not
   react-router-dom) so the same vite.react.config.ts alias /
   legacy next/link resolution that storefront.tsx relies on
   applies here too - see src/compat/next-link.tsx.

   Links intentionally do NOT close the sheet on click - that
   matches the pre-extraction behavior and is not changed here.
   ========================================================= */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import { nav } from '../data/nav';
import { useI18n } from '../i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

export function MobileNavSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useI18n();

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent>
        <SheetTitle>{t.mobileNav.title}</SheetTitle>

        <SheetDescription>{t.mobileNav.description}</SheetDescription>

        {/* Full names here: the sheet has room, and it is where
            mobile visitors look for settings. */}
        <LanguageSwitcher variant="full" className="mobile-lang" />

        <div className="mobile-nav">
          {nav.map(({ key, href }) => (
            <Link key={href} href={href}>
              {t.nav[key]}
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
