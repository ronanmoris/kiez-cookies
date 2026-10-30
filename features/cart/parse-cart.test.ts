import { describe, expect, it } from 'vitest';
import { MAX_LINE_QUANTITY, parseCart } from './parse-cart';
import { testCatalog } from './test-fixtures';
import type { Cart } from './types';

const cookieLine = { type: 'cookie', productId: 'classic-a', quantity: 2 };
const boxLine = {
  type: 'box',
  box: { size: 'medium', flavors: ['classic-a', 'classic-b'] },
  quantity: 1,
};

function parse(value: unknown): Cart {
  return parseCart(JSON.stringify(value), testCatalog);
}

describe('parseCart', () => {
  describe('returns an empty cart when the cookie is not a list', () => {
    it.each([
      ['missing', undefined],
      ['empty string', ''],
      ['not JSON', 'not json'],
      ['cut-off JSON', '[{"type":"cookie"'],
      ['an object', '{"type":"cookie","productId":"classic-a","quantity":1}'],
      ['null', 'null'],
      ['a number', '42'],
    ])('%s', (_, raw) => {
      expect(parseCart(raw, testCatalog)).toEqual([]);
    });
  });

  it('should keep a valid cookie line', () => {
    expect(parse([cookieLine])).toEqual([cookieLine]);
  });

  it('should keep a valid box line', () => {
    expect(parse([boxLine])).toEqual([boxLine]);
  });

  it('should keep the valid lines when one line is invalid', () => {
    expect(
      parse([cookieLine, { type: 'cookie', productId: 'gone', quantity: 1 }, boxLine]),
    ).toEqual([cookieLine, boxLine]);
  });

  it('should strip fields that are not part of a cart line', () => {
    expect(parse([{ ...cookieLine, price: 1, isAdmin: true }])).toEqual([cookieLine]);
  });

  describe('drops a line with a bad shape', () => {
    it.each([
      ['null', null],
      ['a string', 'classic-a'],
      ['unknown type', { type: 'gift-card', productId: 'classic-a', quantity: 1 }],
      ['missing quantity', { type: 'cookie', productId: 'classic-a' }],
      ['quantity 0', { ...cookieLine, quantity: 0 }],
      ['negative quantity', { ...cookieLine, quantity: -3 }],
      ['fractional quantity', { ...cookieLine, quantity: 1.5 }],
      ['quantity as a string', { ...cookieLine, quantity: '2' }],
      ['quantity above the max', { ...cookieLine, quantity: MAX_LINE_QUANTITY + 1 }],
      ['empty product id', { ...cookieLine, productId: '' }],
      ['unknown box size', { ...boxLine, box: { size: 'huge', flavors: ['classic-a'] } }],
      [
        'small box with two flavors',
        { ...boxLine, box: { size: 'small', flavors: ['classic-a', 'classic-b'] } },
      ],
      [
        'medium box with one flavor',
        { ...boxLine, box: { size: 'medium', flavors: ['classic-a'] } },
      ],
      ['box without flavors', { ...boxLine, box: { size: 'small' } }],
    ])('%s', (_, line) => {
      expect(parse([line])).toEqual([]);
    });
  });

  describe('drops a line that does not match the catalog', () => {
    it.each([
      ['unknown cookie id', { type: 'cookie', productId: 'gone', quantity: 1 }],
      [
        'unknown box flavor',
        { ...boxLine, box: { size: 'medium', flavors: ['classic-a', 'gone'] } },
      ],
      [
        'box mixing classic and jumbo',
        { ...boxLine, box: { size: 'medium', flavors: ['classic-a', 'jumbo-a'] } },
      ],
      [
        'box flavor not available frozen',
        { ...boxLine, box: { size: 'small', flavors: ['classic-fresh-only'] } },
      ],
    ])('%s', (_, line) => {
      expect(parse([line])).toEqual([]);
    });
  });

  it('should merge duplicate lines, including boxes with flavors in a different order', () => {
    const swapped = { ...boxLine, box: { size: 'medium', flavors: ['classic-b', 'classic-a'] } };

    expect(parse([cookieLine, boxLine, cookieLine, swapped])).toEqual([
      { ...cookieLine, quantity: 4 },
      { ...boxLine, quantity: 2 },
    ]);
  });

  it('should cap merged duplicates at the max quantity', () => {
    const big = { ...cookieLine, quantity: MAX_LINE_QUANTITY };

    expect(parse([big, big])).toEqual([{ ...cookieLine, quantity: MAX_LINE_QUANTITY }]);
  });

  // Open question for Michèle: is [Mitte, Mitte] a valid box? Allowed until she decides.
  it('should allow the same flavor twice in a box for now', () => {
    const doubled = { ...boxLine, box: { size: 'medium', flavors: ['classic-a', 'classic-a'] } };

    expect(parse([doubled])).toEqual([doubled]);
  });
});
