import type { DistributiveOmit } from '@/lib/utils';
import type { BoxSize, Product } from '../products/types';

type ProductId = Product['id'];

// Flavors per box size, as cookie product ids. The tuple length encodes Michèle's rule:
// small = 1 flavor, medium and large = 2 flavors.
// Keyed by BoxSize, so adding a box size without its flavor rule is a compile error.
type FlavorsByBoxSize = {
  [S in BoxSize]: S extends 'small' ? [ProductId] : [ProductId, ProductId];
};

// One variant per box size: { size: 'small', flavors: [id] } | { size: 'medium', flavors: [id, id] } | ...
// The cookie size (classic/jumbo) is not stored: it follows from the flavors, so it can't contradict them.
// Not expressible in the type, checked when the cookie is validated:
// - both flavors have the same cookie size and are availableFrozen
// - two different flavors (open question for Michèle: is [Mitte, Mitte] allowed?)
// - flavor order doesn't matter: [Mitte, Wedding] and [Wedding, Mitte] are the same line
type Box = {
  [S in BoxSize]: { size: S; flavors: FlavorsByBoxSize[S] };
}[BoxSize];

// quantity: a positive whole number, enforced when the cookie is validated (the cookie is untrusted input).
type CartItemBase = { quantity: number };

type CartItem =
  | ({ type: 'cookie'; productId: ProductId } & CartItemBase)
  | ({ type: 'box'; box: Box } & CartItemBase);

type Cart = CartItem[];
type LineKey = DistributiveOmit<CartItem, 'quantity'>;

// Contract of the addToCart Server Action. The request is a cart line, as the UI builds it.
type AddToCartRequest = CartItem;

type AddToCartError =
  | 'INVALID_REQUEST' // wrong shape: missing fields, unknown type or box size, wrong flavor count
  | 'INVALID_QUANTITY' // not a whole number from 1 to MAX_LINE_QUANTITY, also after merging
  | 'UNKNOWN_PRODUCT' // a product id that is not in the catalog
  | 'INVALID_BOX' // flavors not available frozen, or classic and jumbo mixed
  | 'CART_FULL'; // the cart would no longer fit in its cookie

// A discriminated union: `error` exists only when ok is false, so `if (!result.ok)` narrows it.
type AddToCartResult = { ok: true } | { ok: false; error: AddToCartError };

export type {
  AddToCartError,
  AddToCartRequest,
  AddToCartResult,
  Box,
  Cart,
  CartItem,
  LineKey,
  ProductId,
};
