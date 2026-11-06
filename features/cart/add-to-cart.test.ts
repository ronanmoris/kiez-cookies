import { describe, expect, it } from 'vitest';
import { catalog } from '@/features/products/catalog';
import { applyAddToCart } from './add-to-cart';
import { MAX_LINE_QUANTITY } from './parse-cart';
import { makeProduct, testCatalog } from './test-fixtures';
import type { Cart } from './types';

const cookieLine = { type: 'cookie', productId: 'classic-a', quantity: 2 } as const;
const boxLine = {
  type: 'box',
  box: { size: 'medium', flavors: ['classic-a', 'classic-b'] },
  quantity: 1,
} as const;

describe('applyAddToCart', () => {
  it('should add a valid cookie line to an empty cart', () => {
    expect(applyAddToCart([], cookieLine, testCatalog)).toEqual({ ok: true, cart: [cookieLine] });
  });

  it('should add a valid box line', () => {
    expect(applyAddToCart([], boxLine, testCatalog)).toEqual({ ok: true, cart: [boxLine] });
  });

  it('should merge with a line already in the cart', () => {
    const cart: Cart = [{ ...cookieLine, quantity: 1 }];

    expect(applyAddToCart(cart, cookieLine, testCatalog)).toEqual({
      ok: true,
      cart: [{ ...cookieLine, quantity: 3 }],
    });
  });

  it('should strip fields that are not part of a cart line, like a price', () => {
    expect(applyAddToCart([], { ...cookieLine, price: 1 }, testCatalog)).toEqual({
      ok: true,
      cart: [cookieLine],
    });
  });

  it('should not change the cart it receives', () => {
    const cart: Cart = [{ ...cookieLine, quantity: 1 }];

    applyAddToCart(cart, cookieLine, testCatalog);

    expect(cart).toEqual([{ ...cookieLine, quantity: 1 }]);
  });

  describe('INVALID_REQUEST', () => {
    it.each([
      ['nothing', undefined],
      ['null', null],
      ['a string', 'classic-a'],
      ['missing product id', { type: 'cookie', quantity: 1 }],
      ['unknown line type', { type: 'gift-card', productId: 'classic-a', quantity: 1 }],
      [
        'small box with two flavors',
        { ...boxLine, box: { size: 'small', flavors: ['classic-a', 'classic-b'] } },
      ],
      ['unknown box size', { ...boxLine, box: { size: 'huge', flavors: ['classic-a'] } }],
    ])('%s', (_, request) => {
      expect(applyAddToCart([], request, testCatalog)).toEqual({
        ok: false,
        error: 'INVALID_REQUEST',
      });
    });
  });

  describe('INVALID_QUANTITY', () => {
    it.each([
      ['0', 0],
      ['negative', -3],
      ['fractional', 1.5],
      ['a string', '2'],
      ['above the max', MAX_LINE_QUANTITY + 1],
      ['missing', undefined],
    ])('%s', (_, quantity) => {
      expect(applyAddToCart([], { ...cookieLine, quantity }, testCatalog)).toEqual({
        ok: false,
        error: 'INVALID_QUANTITY',
      });
    });

    it('should reject an add that pushes a line above the max', () => {
      const cart: Cart = [{ ...cookieLine, quantity: MAX_LINE_QUANTITY - 1 }];

      expect(applyAddToCart(cart, cookieLine, testCatalog)).toEqual({
        ok: false,
        error: 'INVALID_QUANTITY',
      });
    });
  });

  describe('UNKNOWN_PRODUCT', () => {
    it.each([
      ['cookie not in the catalog', { ...cookieLine, productId: 'gone' }],
      [
        'box flavor not in the catalog',
        { ...boxLine, box: { size: 'medium', flavors: ['classic-a', 'gone'] } },
      ],
    ])('%s', (_, request) => {
      expect(applyAddToCart([], request, testCatalog)).toEqual({
        ok: false,
        error: 'UNKNOWN_PRODUCT',
      });
    });
  });

  describe('INVALID_BOX', () => {
    it.each([
      [
        'classic and jumbo mixed',
        { ...boxLine, box: { size: 'medium', flavors: ['classic-a', 'jumbo-a'] } },
      ],
      [
        'flavor not available frozen',
        { ...boxLine, box: { size: 'small', flavors: ['classic-fresh-only'] } },
      ],
    ])('%s', (_, request) => {
      expect(applyAddToCart([], request, testCatalog)).toEqual({ ok: false, error: 'INVALID_BOX' });
    });
  });

  describe('CART_FULL', () => {
    // Ids as long as the real ones (UUIDs): each line takes about 119 bytes once URL-encoded.
    const products = Array.from({ length: 30 }, (_, i) =>
      makeProduct(`00000000-0000-4000-8000-${String(i).padStart(12, '0')}`, 'classic', 100),
    );
    const linesFor = (count: number): Cart =>
      products.slice(0, count).map((p) => ({ type: 'cookie', productId: p.id, quantity: 99 }));
    const lastProduct = { type: 'cookie', productId: products[29].id, quantity: 99 };

    it('should accept a line while the cart still fits in its cookie', () => {
      expect(applyAddToCart(linesFor(20), lastProduct, products)).toMatchObject({ ok: true });
    });

    it('should reject a line that makes the cart too big for its cookie', () => {
      expect(applyAddToCart(linesFor(29), lastProduct, products)).toEqual({
        ok: false,
        error: 'CART_FULL',
      });
    });

    it('should fit every real product plus three boxes', () => {
      const [a, b] = catalog.filter((p) => p.size === 'classic' && p.availableFrozen);
      const cart: Cart = [
        ...catalog.map((p) => ({ type: 'cookie' as const, productId: p.id, quantity: 99 })),
        { type: 'box', box: { size: 'small', flavors: [a.id] }, quantity: 99 },
        { type: 'box', box: { size: 'medium', flavors: [a.id, b.id] }, quantity: 99 },
      ];
      const largeBox = { type: 'box', box: { size: 'large', flavors: [a.id, b.id] }, quantity: 99 };

      expect(applyAddToCart(cart, largeBox, catalog)).toMatchObject({ ok: true });
    });
  });
});
