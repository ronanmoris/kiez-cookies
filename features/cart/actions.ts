'use server';

// Every export of this file is a public endpoint: anyone can POST to it with any payload.
// Export only actions; keep the logic in plain modules (add-to-cart.ts, cart.ts).

import { catalog } from '@/features/products/catalog';
import { applyAddToCart } from './add-to-cart';
import { readCart, writeCart } from './cart-cookie';
import type { AddToCartRequest, AddToCartResult } from './types';

// The parameter type helps callers in the UI; it isn't a guarantee, so applyAddToCart validates it.
export async function addToCart(request: AddToCartRequest): Promise<AddToCartResult> {
  const outcome = applyAddToCart(await readCart(), request, catalog);
  if (!outcome.ok) {
    // Build the result field by field: returning `outcome` would send any extra field to the browser.
    return { ok: false, error: outcome.error };
  }

  // Setting the cookie re-renders the current page in the same response, so the cart UI updates.
  await writeCart(outcome.cart);
  return { ok: true };
}
