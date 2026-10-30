import type { BoxOptions, CookieSize, Product } from '@/features/products/types';
import { toInteger } from '@/lib/utils';

// Test fixtures, not the real catalog: real prices are placeholders and will change.
function makeProduct(id: string, size: CookieSize, price: number, availableFrozen = true): Product {
  const text = { name: id, tagline: '', flavor: '', altText: '' };
  return {
    id,
    size,
    allergenInfo: 'unknown',
    price: toInteger(price),
    image: { url: '' },
    availableFrozen,
    text: { de: text, en: text },
  };
}

const testCatalog: Product[] = [
  makeProduct('classic-a', 'classic', 100),
  makeProduct('classic-b', 'classic', 250),
  makeProduct('jumbo-a', 'jumbo', 500),
  makeProduct('jumbo-b', 'jumbo', 600),
  makeProduct('classic-fresh-only', 'classic', 300, false),
];

// Box prices differ per cookie size so a test fails if the wrong size is looked up.
const testBoxOptions: BoxOptions = {
  classic: {
    small: { flavorCount: 1, price: toInteger(1000), count: 6 },
    medium: { flavorCount: 2, price: toInteger(2000), count: 12 },
    large: { flavorCount: 2, price: toInteger(3000), count: 24 },
  },
  jumbo: {
    small: { flavorCount: 1, price: toInteger(1500), count: 3 },
    medium: { flavorCount: 2, price: toInteger(2500), count: 6 },
    large: { flavorCount: 2, price: toInteger(3500), count: 12 },
  },
};

export { testBoxOptions, testCatalog };
