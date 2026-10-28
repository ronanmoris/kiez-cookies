import { Box, Cart, CartItem } from "./types";

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
function isSameLine(a: CartItem, b: CartItem): boolean {
  if (a.type === 'cookie') {
    return b.type === 'cookie' && a.productId === b.productId;
  }

  // a is a box here
  return b.type === 'box' && hasSameSize(a.box, b.box) && hasSameFlavors(a.box.flavors, b.box.flavors);
}

function addItem(cart: Cart, item: CartItem): Cart {
  const lineExists = cart.some(line => isSameLine(line, item))
  if (lineExists) {
    return cart.map(line => isSameLine(line, item) ? { ...line, quantity: line.quantity + item.quantity } : line)
  }

  return [...cart, {...item}]
}

export { addItem, isSameLine };
