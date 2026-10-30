import type { BoxOptions, Product } from '@/features/products/types';
import { toInteger, type Integer } from '@/lib/utils';
import type { Box, Cart, CartItem, LineKey, ProductId } from './types';

// Order doesn't matter: ['mitte', 'wedding'] and ['wedding', 'mitte'] are the same flavors.
function hasSameFlavors(a: readonly string[], b: readonly string[]) {
  if (a.length !== b.length) return false;

  const sortedB = b.toSorted();
  return a.toSorted().every((value, i) => value === sortedB[i]);
}

function hasSameSize(a: Box, b: Box) {
  return a.size === b.size;
}

// Quantity is not part of a line's identity: 3 × Mitte and 1 × Mitte are the same line.
function isSameLine(a: LineKey, b: LineKey): boolean {
  if (a.type === 'cookie') {
    return b.type === 'cookie' && a.productId === b.productId;
  }

  // a is a box here
  return (
    b.type === 'box' && hasSameSize(a.box, b.box) && hasSameFlavors(a.box.flavors, b.box.flavors)
  );
}

function addItem(cart: Cart, item: CartItem): Cart {
  const lineExists = cart.some((line) => isSameLine(line, item));
  if (lineExists) {
    return cart.map((line) =>
      isSameLine(line, item) ? { ...line, quantity: line.quantity + item.quantity } : line,
    );
  }

  return [...cart, { ...item }];
}

function removeItem(cart: Cart, key: LineKey): Cart {
  return cart.filter((line) => !isSameLine(line, key));
}

// Throws: the cart is validated against the catalog first (parseCart), so an unknown id here is a bug.
function findProduct(catalog: readonly Product[], id: ProductId): Product {
  const product = catalog.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Unknown product id: ${id}`);
  }

  return product;
}

function linePrice(line: CartItem, catalog: readonly Product[], boxOptions: BoxOptions): number {
  if (line.type === 'cookie') {
    return findProduct(catalog, line.productId).price;
  }

  // The box price depends on the cookie size, which follows from the flavors (all the same size,
  // checked by parseCart). Individual flavor prices don't count.
  const [first] = line.box.flavors.map((id) => findProduct(catalog, id));
  return boxOptions[first.size][line.box.size].price;
}

// Total in cents. Prices always come from the catalog, never from the cart, so the customer can't set them.
function cartTotal(cart: Cart, catalog: readonly Product[], boxOptions: BoxOptions): Integer {
  const total = cart.reduce(
    (sum, line) => sum + linePrice(line, catalog, boxOptions) * line.quantity,
    0,
  );

  return toInteger(total);
}

export { addItem, cartTotal, isSameLine, removeItem };
