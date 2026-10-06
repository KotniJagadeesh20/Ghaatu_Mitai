import type { Locale } from '../config';
import { en, type Messages } from './en';
import { te } from './te';

export type { Messages };

/**
 * Both dictionaries are bundled: together they are a few KB
 * gzipped, so lazy-loading per locale would add a loading
 * state for no real gain. Revisit if a language gets large.
 */
export const MESSAGES: Record<Locale, Messages> = { en, te };
