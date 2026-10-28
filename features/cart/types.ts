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

export type { Box, Cart, CartItem, ProductId };
