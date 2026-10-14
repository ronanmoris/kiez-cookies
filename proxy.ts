import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/features/i18n/locales'

function getLocale(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') ?? '' }
  const languages = new Negotiator({ headers }).languages()
  // "*" means "any language" and is not a valid locale tag for match().
  const requested = languages.filter((language) => language !== '*')
  return match(requested, [...locales], defaultLocale)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip Next internals and any path with a file extension (/images/mitte.jpg, /favicon.ico).
    '/((?!_next|.*\\..*).*)',
  ],
}
