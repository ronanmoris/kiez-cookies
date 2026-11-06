import { cookies } from 'next/headers';
import { catalog } from '@/features/products/catalog';
import { parseCart, serializeCart } from './parse-cart';
import type { Cart } from './types';

// No brand in the name (see conventions in CLAUDE.md).
const CART_COOKIE = 'cart';

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;

// Reading cookies makes the page that calls this render per request: wrap that UI in <Suspense>.
async function readCart(): Promise<Cart> {
  const cookieStore = await cookies();
  return parseCart(cookieStore.get(CART_COOKIE)?.value, catalog);
}

// Only callable from a Server Action or Route Handler: pages can't set cookies.
async function writeCart(cart: Cart): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, serializeCart(cart), {
    httpOnly: true, // only the server reads the cart; page scripts can't
    secure: process.env.NODE_ENV === 'production', // HTTPS only, except on localhost
    sameSite: 'lax', // sent when arriving from a link, not on cross-site POSTs
    path: '/',
    maxAge: THIRTY_DAYS_IN_SECONDS,
  });
}

export { readCart, writeCart };
