// No Next.js imports here: proxy.ts, the catalog and the pages all import this file.
const locales = ['de', 'en'] as const;

type Locale = (typeof locales)[number];

const defaultLocale: Locale = 'en';

const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);

// Intl needs a region to pick the market's formats (EUR, 3,20 € vs €3.20).
const intlLocale: Record<Locale, string> = {
  de: 'de-DE',
  en: 'en-DE',
};

export type { Locale };
export { locales, defaultLocale, hasLocale, intlLocale };
