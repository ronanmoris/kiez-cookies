import { lang } from 'next/root-params'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '../locales'
import type en from './en.json'

// English is the reference shape: a key missing in another language is a compile error.
type Dictionary = typeof en

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  de: () => import('./de.json').then((module): Dictionary => module.default),
  en: () => import('./en.json').then((module): Dictionary => module.default),
}

export type { Dictionary }

export const getDictionary = async () => {
  const locale = await lang()
  if (!hasLocale(locale)) notFound()
  return dictionaries[locale]()
}
