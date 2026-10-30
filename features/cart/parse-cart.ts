import { z } from 'zod';
import type { Product } from '@/features/products/types';
import { addItem } from './cart';
import type { Box, Cart, CartItem } from './types';

// Placeholder until Michèle sets a real limit. Stops a hand-edited cookie from ordering 1e9 cookies.
const MAX_LINE_QUANTITY = 99;

const productIdSchema = z.string().min(1);
const quantitySchema = z.number().int().min(1).max(MAX_LINE_QUANTITY);

// One variant per box size, like the Box type: the tuple length is the flavor rule.
const boxSchema = z.discriminatedUnion('size', [
  z.object({ size: z.literal('small'), flavors: z.tuple([productIdSchema]) }),
  z.object({ size: z.literal('medium'), flavors: z.tuple([productIdSchema, productIdSchema]) }),
  z.object({ size: z.literal('large'), flavors: z.tuple([productIdSchema, productIdSchema]) }),
]);

// `satisfies` makes the compiler check that what the schema outputs is a CartItem.
// Unknown keys are stripped, so extra fields in the cookie never reach the cart.
const lineSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('cookie'), productId: productIdSchema, quantity: quantitySchema }),
  z.object({ type: z.literal('box'), box: boxSchema, quantity: quantitySchema }),
]) satisfies z.ZodType<CartItem>;

// The rules the shape can't express: ids must exist, and a box needs frozen flavors of one cookie size.
// Two identical flavors in a box are allowed for now (open question for Michèle).
function isBoxAvailable(box: Box, catalog: readonly Product[]): boolean {
  const products = box.flavors.map((id) => catalog.find((p) => p.id === id));
  const sizes = new Set(products.map((p) => p?.size));

  return products.every((p) => p?.availableFrozen === true) && sizes.size === 1;
}

function isInCatalog(line: CartItem, catalog: readonly Product[]): boolean {
  if (line.type === 'cookie') {
    return catalog.some((p) => p.id === line.productId);
  }

  return isBoxAvailable(line.box, catalog);
}

function readJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

// The cart cookie is untrusted input: anyone can edit it. Never throws.
// - missing, unparsable or not an array: empty cart
// - an invalid line is dropped, the valid ones are kept (a flavor removed from the catalog
//   shouldn't empty the whole cart)
// - duplicate lines are merged, capped at MAX_LINE_QUANTITY
function parseCart(raw: string | undefined, catalog: readonly Product[]): Cart {
  if (raw === undefined) return [];

  const lines = z.array(z.unknown()).safeParse(readJson(raw));
  if (!lines.success) return [];

  const validLines = lines.data.flatMap((value) => {
    const line = lineSchema.safeParse(value);
    return line.success && isInCatalog(line.data, catalog) ? [line.data] : [];
  });

  return validLines
    .reduce<Cart>((cart, line) => addItem(cart, line), [])
    .map((line) => ({ ...line, quantity: Math.min(line.quantity, MAX_LINE_QUANTITY) }));
}

export { MAX_LINE_QUANTITY, parseCart };
