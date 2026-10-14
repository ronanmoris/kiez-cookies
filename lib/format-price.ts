import { intlLocale, type Locale } from '@/features/i18n/locales';
import type { Integer } from './utils';

// en: €3.20, de: 3,20 €
function formatPrice(cents: Integer, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}

export { formatPrice };
