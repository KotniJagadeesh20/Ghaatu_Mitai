import { Art } from './Art';
import { BULK_ART } from '../data/bulk';

/* Brand glyph cropped from the reference art (lucide has no
   brand icons). Decorative: the button text says "WhatsApp". */
export function WhatsAppIcon() {
  return <Art className="wa-icon" source="bulk-page" box={BULK_ART.whatsapp} alt="" />;
}
