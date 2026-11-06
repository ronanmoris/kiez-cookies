import type { Product } from '@/features/products/types';
import { addItem } from './cart';
import { findCatalogProblem, lineSchema, MAX_LINE_QUANTITY, serializeCart } from './parse-cart';
import type { AddToCartError, Cart } from './types';

// Browsers drop a cookie over 4096 bytes (name, value and attributes together), and the cart
// would silently vanish. Next.js URL-encodes the value (" becomes %22), so measure the encoded form.
const MAX_CART_COOKIE_LENGTH = 3500;

type AddToCartOutcome = { ok: true; cart: Cart } | { ok: false; error: AddToCartError };

// The rules of the addToCart action, without cookies or Next.js, so they can be unit tested.
// `request` is unknown on purpose: the action receives whatever the POST contains.
function applyAddToCart(
  cart: Cart,
  request: unknown,
  catalog: readonly Product[],
): AddToCartOutcome {
  const parsed = lineSchema.safeParse(request);
  if (!parsed.success) {
    const quantityIsWrong = parsed.error.issues.some((issue) => issue.path[0] === 'quantity');
    return { ok: false, error: quantityIsWrong ? 'INVALID_QUANTITY' : 'INVALID_REQUEST' };
  }

  const line = parsed.data;
  const catalogProblem = findCatalogProblem(line, catalog);
  if (catalogProblem) {
    return { ok: false, error: catalogProblem };
  }

  const next = addItem(cart, line);
  if (next.some((l) => l.quantity > MAX_LINE_QUANTITY)) {
    return { ok: false, error: 'INVALID_QUANTITY' };
  }

  if (encodeURIComponent(serializeCart(next)).length > MAX_CART_COOKIE_LENGTH) {
    return { ok: false, error: 'CART_FULL' };
  }

  return { ok: true, cart: next };
}

export type { AddToCartOutcome };
export { MAX_CART_COOKIE_LENGTH, applyAddToCart };
