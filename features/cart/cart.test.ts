import { describe, expect, it } from 'vitest';
import { addItem, cartTotal, isSameLine, removeItem, setQuantity } from './cart';
import { testBoxOptions, testCatalog } from './test-fixtures';
import type { Cart, CartItem } from './types';

describe('isSameLine', () => {
  it('should return true if the productId is the same', () => {
    const lineA: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const lineB: CartItem = { type: 'cookie', productId: '1', quantity: 2 };

    const result = isSameLine(lineA, lineB);

    expect(result).toBe(true);
  });

  it('should return false if the products are different', () => {
    const lineA: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const lineB: CartItem = { type: 'cookie', productId: '2', quantity: 1 };

    const result = isSameLine(lineA, lineB);

    expect(result).toBe(false);
  });

  it('should return true for the same sized box but flavors are picked in a different order', () => {
    const lineA: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['1', '2'] },
      quantity: 1,
    };
    const lineB: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['2', '1'] },
      quantity: 1,
    };

    const result = isSameLine(lineA, lineB);

    expect(result).toBe(true);
  });

  it('should return false for the same sized box with different flavors', () => {
    const lineA: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['1', '2'] },
      quantity: 1,
    };
    const lineB: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['1', '3'] },
      quantity: 1,
    };

    const result = isSameLine(lineA, lineB);

    expect(result).toBe(false);
  });

  it('should return false for different box sizes', () => {
    const lineA: CartItem = {
      type: 'box',
      box: { size: 'large', flavors: ['1', '2'] },
      quantity: 1,
    };
    const lineB: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['1', '2'] },
      quantity: 1,
    };

    const result = isSameLine(lineA, lineB);

    expect(result).toBe(false);
  });

  it('should return false if one line is a cookie and the other is a box', () => {
    const lineA: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const lineB: CartItem = { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 2 };

    const result = isSameLine(lineA, lineB);

    expect(result).toBe(false);
  });

  it('should return false for different box sizes with different flavors', () => {
    const lineA: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['1', '2'] },
      quantity: 2,
    };
    const lineB: CartItem = {
      type: 'box',
      box: { size: 'large', flavors: ['3', '4'] },
      quantity: 2,
    };

    const result = isSameLine(lineA, lineB);

    expect(result).toBe(false);
  });
});

describe('addItem', () => {
  it('should add one item to the cart', () => {
    const cart: Cart = [];
    const item: CartItem = { type: 'cookie', productId: '1', quantity: 1 };

    const result = addItem(cart, item);

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }]);
  });

  it('should add to the same row if it is the exact same item', () => {
    const item1: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const cart: Cart = [item1];

    const item2: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const result = addItem(cart, item2);

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 2 }]);
  });

  it('should append to the existing row if called with an item not yet in the cart', () => {
    const item1: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const cart: Cart = [item1];

    const item2: CartItem = { type: 'cookie', productId: '2', quantity: 1 };
    const result = addItem(cart, item2);

    expect(result).toEqual([
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 1 },
    ]);
  });

  it('should add x items based on count', () => {
    const item: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const cart: Cart = [item];

    const item1: CartItem = { type: 'cookie', productId: '1', quantity: 9 };
    const result = addItem(cart, item1);

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 10 }]);
  });

  it('merges box lines with the same size and flavors', () => {
    const lineA: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['1', '2'] },
      quantity: 1,
    };
    const cart: Cart = [lineA];
    const lineB: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['1', '2'] },
      quantity: 3,
    };

    const result = addItem(cart, lineB);
    expect(result).toEqual([
      { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 4 },
    ]);
  });

  it('should merge box lines whose flavors are in a different order, keeping the order already in the cart', () => {
    const lineA: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['1', '2'] },
      quantity: 1,
    };
    const cart: Cart = [lineA];
    const lineB: CartItem = {
      type: 'box',
      box: { size: 'medium', flavors: ['2', '1'] },
      quantity: 1,
    };

    const result = addItem(cart, lineB);

    expect(result).toEqual([
      { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 2 },
    ]);
  });

  it('should keep a cookie and a box with the same flavor as separate lines', () => {
    const cookie: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const cart: Cart = [cookie];
    const box: CartItem = { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 1 };

    const result = addItem(cart, box);

    expect(result).toEqual([
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 1 },
    ]);
  });

  it('should keep the merged line in its position and leave the other lines untouched', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 1 },
      { type: 'cookie', productId: '3', quantity: 1 },
    ];
    const item: CartItem = { type: 'cookie', productId: '2', quantity: 2 };

    const result = addItem(cart, item);

    expect(result).toEqual([
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 3 },
      { type: 'cookie', productId: '3', quantity: 1 },
    ]);
  });

  it('should return a new array instead of the original cart', () => {
    const cart: Cart = [{ type: 'cookie', productId: '1', quantity: 1 }];
    const item: CartItem = { type: 'cookie', productId: '2', quantity: 1 };

    const result = addItem(cart, item);

    expect(result).toHaveLength(2);
    expect(result).not.toBe(cart);
    expect(cart).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }]);
  });

  it('should not change the quantity of the line objects in the original cart', () => {
    const line: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const cart: Cart = [line];
    const item: CartItem = { type: 'cookie', productId: '1', quantity: 2 };

    const result = addItem(cart, item);

    expect(result[0].quantity).toBe(3);
    expect(line.quantity).toBe(1);
  });
});

describe('removeItem', () => {
  it('should remove a matching cookie line', () => {
    const lineA: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const lineB: CartItem = { type: 'cookie', productId: '2', quantity: 2 };
    const cart: Cart = [lineA, lineB];

    const result = removeItem(cart, lineB);

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }]);
  });

  it('should remove a box line when the flavors are given in a different order', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '3', quantity: 1 },
      { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 1 },
    ];

    const result = removeItem(cart, { type: 'box', box: { size: 'medium', flavors: ['2', '1'] } });

    expect(result).toEqual([{ type: 'cookie', productId: '3', quantity: 1 }]);
  });

  it('should keep a box with the same flavor when removing a cookie', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 1 },
    ];

    const result = removeItem(cart, { type: 'cookie', productId: '1' });

    expect(result).toEqual([{ type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 1 }]);
  });

  it('should keep a cookie with the same flavor when removing a box', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 1 },
    ];

    const result = removeItem(cart, { type: 'box', box: { size: 'small', flavors: ['1'] } });

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }]);
  });

  it('should keep the order of the remaining lines', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 1 },
      { type: 'cookie', productId: '3', quantity: 1 },
    ];

    const result = removeItem(cart, { type: 'cookie', productId: '2' });

    expect(result).toEqual([
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '3', quantity: 1 },
    ]);
  });

  // filter always returns a new array, so "not found" gives an equal copy, not the same array.
  it('should return an equal copy when the line is not in the cart', () => {
    const cart: Cart = [{ type: 'cookie', productId: '1', quantity: 1 }];

    const result = removeItem(cart, { type: 'cookie', productId: '2' });

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }]);
    expect(result).not.toBe(cart);
  });

  it('should not mutate the original cart', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 1 },
    ];

    const result = removeItem(cart, { type: 'cookie', productId: '1' });

    expect(result).toHaveLength(1);
    expect(cart).toEqual([
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 1 },
    ]);
  });

  it('should remove the whole line whatever quantity the key carries', () => {
    const cart: Cart = [{ type: 'cookie', productId: '1', quantity: 3 }];
    const lineWithOtherQuantity: CartItem = { type: 'cookie', productId: '1', quantity: 1 };

    const result = removeItem(cart, lineWithOtherQuantity);

    expect(result).toEqual([]);
  });
});

describe('setQuantity', () => {
  it('should set the quantity of the matching cookie line', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 1 },
    ];

    const result = setQuantity(cart, { type: 'cookie', productId: '2' }, 5);

    expect(result).toEqual([
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 5 },
    ]);
  });

  it('should set, not add: 3 set to 2 gives 2', () => {
    const cart: Cart = [{ type: 'cookie', productId: '1', quantity: 3 }];

    const result = setQuantity(cart, { type: 'cookie', productId: '1' }, 2);

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 2 }]);
  });

  it('should set the quantity of a box line given with its flavors in a different order', () => {
    const cart: Cart = [{ type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 1 }];

    const result = setQuantity(
      cart,
      { type: 'box', box: { size: 'medium', flavors: ['2', '1'] } },
      4,
    );

    expect(result).toEqual([
      { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 4 },
    ]);
  });

  it('should leave a box with the same flavor alone when setting a cookie line', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 1 },
    ];

    const result = setQuantity(cart, { type: 'cookie', productId: '1' }, 3);

    expect(result).toEqual([
      { type: 'cookie', productId: '1', quantity: 3 },
      { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 1 },
    ]);
  });

  it('should remove the line when the quantity is 0', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 2 },
    ];

    const result = setQuantity(cart, { type: 'cookie', productId: '2' }, 0);

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }]);
  });

  it('should not add a line that is not in the cart', () => {
    const cart: Cart = [{ type: 'cookie', productId: '1', quantity: 1 }];

    const result = setQuantity(cart, { type: 'cookie', productId: '2' }, 3);

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }]);
  });

  it('should not mutate the original cart or its lines', () => {
    const line: CartItem = { type: 'cookie', productId: '1', quantity: 1 };
    const cart: Cart = [line];

    const result = setQuantity(cart, { type: 'cookie', productId: '1' }, 3);

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 3 }]);
    expect(result).not.toBe(cart);
    expect(line.quantity).toBe(1);
  });
});

describe('cartTotal', () => {
  it('should return 0 for an empty cart', () => {
    expect(cartTotal([], testCatalog, testBoxOptions)).toBe(0);
  });

  it('should multiply a cookie price by its quantity', () => {
    const cart: Cart = [{ type: 'cookie', productId: 'classic-b', quantity: 3 }];

    expect(cartTotal(cart, testCatalog, testBoxOptions)).toBe(750);
  });

  it('should add up several cookie lines', () => {
    const cart: Cart = [
      { type: 'cookie', productId: 'classic-a', quantity: 2 },
      { type: 'cookie', productId: 'jumbo-a', quantity: 1 },
    ];

    expect(cartTotal(cart, testCatalog, testBoxOptions)).toBe(700);
  });

  it('should price a box from the box options, not from its flavors', () => {
    const cart: Cart = [
      { type: 'box', box: { size: 'medium', flavors: ['classic-a', 'classic-b'] }, quantity: 1 },
    ];

    expect(cartTotal(cart, testCatalog, testBoxOptions)).toBe(2000);
  });

  it('should use the jumbo box price when the flavors are jumbo cookies', () => {
    const cart: Cart = [
      { type: 'box', box: { size: 'medium', flavors: ['jumbo-a', 'jumbo-b'] }, quantity: 1 },
    ];

    expect(cartTotal(cart, testCatalog, testBoxOptions)).toBe(2500);
  });

  it('should multiply a box price by its quantity', () => {
    const cart: Cart = [{ type: 'box', box: { size: 'small', flavors: ['jumbo-a'] }, quantity: 2 }];

    expect(cartTotal(cart, testCatalog, testBoxOptions)).toBe(3000);
  });

  it('should add up cookie and box lines together', () => {
    const cart: Cart = [
      { type: 'cookie', productId: 'classic-a', quantity: 1 },
      { type: 'box', box: { size: 'large', flavors: ['classic-a', 'classic-b'] }, quantity: 1 },
    ];

    expect(cartTotal(cart, testCatalog, testBoxOptions)).toBe(3100);
  });

  // parseCart drops unknown ids, so reaching cartTotal with one is a bug, not a customer error.
  it('should throw when a cookie line has a product id that is not in the catalog', () => {
    const cart: Cart = [{ type: 'cookie', productId: 'gone', quantity: 1 }];

    expect(() => cartTotal(cart, testCatalog, testBoxOptions)).toThrow('gone');
  });

  it('should throw when the second flavor of a box is not in the catalog', () => {
    const cart: Cart = [
      { type: 'box', box: { size: 'medium', flavors: ['classic-a', 'gone'] }, quantity: 1 },
    ];

    expect(() => cartTotal(cart, testCatalog, testBoxOptions)).toThrow('gone');
  });

  it('should throw when a box flavor is not in the catalog', () => {
    const cart: Cart = [{ type: 'box', box: { size: 'small', flavors: ['gone'] }, quantity: 1 }];

    expect(() => cartTotal(cart, testCatalog, testBoxOptions)).toThrow('gone');
  });
});
