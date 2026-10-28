import { describe, expect, it } from "vitest"
import { addItem, isSameLine } from "./cart"
import type { Cart, CartItem } from "./types"

describe('isSameLine', () => {
	it('should return true if the productId is the same', () => {
		const lineA: CartItem = { type: 'cookie', productId: '1', quantity: 1 }
		const lineB: CartItem = { type: 'cookie', productId: '1', quantity: 2 }

		const result = isSameLine(lineA, lineB)

		expect(result).toBe(true)
	})

	it('should return false if the products are different', () => {
		const lineA: CartItem = { type: 'cookie', productId: '1', quantity: 1 }
		const lineB: CartItem = { type: 'cookie', productId: '2', quantity: 1 }

		const result = isSameLine(lineA, lineB)

		expect(result).toBe(false)
	})

	it('should return true for the same sized box but flavors are picked in a different order', () => {
		const lineA: CartItem = { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 1 }
		const lineB: CartItem = { type: 'box', box: { size: 'medium', flavors: ['2', '1'] }, quantity: 1 }

		const result = isSameLine(lineA, lineB)

		expect(result).toBe(true)
	})

	it('should return false for the same sized box with different flavors', () => {
		const lineA: CartItem = { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 1 }
		const lineB: CartItem = { type: 'box', box: { size: 'medium', flavors: ['1', '3'] }, quantity: 1 }

		const result = isSameLine(lineA, lineB)

		expect(result).toBe(false)
	})

	it('should return false for different box sizes', () => {
		const lineA: CartItem = { type: 'box', box: { size: 'large', flavors: ['1', '2'] }, quantity: 1 }
		const lineB: CartItem = { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 1 }

		const result = isSameLine(lineA, lineB)

		expect(result).toBe(false)
	})

	it('should return false if one line is a cookie and the other is a box', () => {
		const lineA: CartItem = { type: 'cookie', productId: '1', quantity: 1 }
		const lineB: CartItem = { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 2 }

		const result = isSameLine(lineA, lineB)

		expect(result).toBe(false)
	})

	it('should return false for different box sizes with different flavors', () => {
		const lineA: CartItem = { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 2 }
		const lineB: CartItem = { type: 'box', box: { size: 'large', flavors: ['3', '4'] }, quantity: 2 }

		const result = isSameLine(lineA, lineB)

		expect(result).toBe(false)
	})
})

describe('addItem', () => {
	it('should add one item to the cart', () => {
    const cart: Cart = []
    const item: CartItem = { type: 'cookie', productId: '1', quantity: 1 }

    const result = addItem(cart, item)

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }])
	})

	it('should add to the same row if it is the exact same item', () => {
    const item1: CartItem = { type: 'cookie', productId: '1', quantity: 1 }
    const cart: Cart = [item1]

    const item2: CartItem = { type: 'cookie', productId: '1', quantity: 1 }
    const result = addItem(cart, item2)

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 2 }])
	})

  it('should append to the existing row if called with an item not yet in the cart', () => {
    const item1: CartItem = { type: 'cookie', productId: '1', quantity: 1 }
    const cart: Cart = [item1]

    const item2: CartItem = { type: 'cookie', productId: '2', quantity: 1 }
    const result = addItem(cart, item2)

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }, { type: 'cookie', productId: '2', quantity: 1 }])
	})

  it('should add x items based on count', () => {
    const item: CartItem = { type: 'cookie', productId: '1', quantity: 1 }
    const cart: Cart = [item]

    const item1: CartItem = { type: 'cookie', productId: '1', quantity: 9 }
    const result = addItem(cart, item1)

    expect(result).toEqual([{ type: 'cookie', productId: '1', quantity: 10 }])
	})

  it('merges box lines with the same size and flavors', () => {
    const lineA: CartItem = { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 1 }
    const cart: Cart = [lineA]
		const lineB: CartItem = { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 3 }

    const result = addItem(cart, lineB)
    expect(result).toEqual([{ type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 4 }])

	})

  it('should merge box lines whose flavors are in a different order, keeping the order already in the cart', () => {
    const lineA: CartItem = { type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 1 }
    const cart: Cart = [lineA]
    const lineB: CartItem = { type: 'box', box: { size: 'medium', flavors: ['2', '1'] }, quantity: 1 }

    const result = addItem(cart, lineB)

    expect(result).toEqual([{ type: 'box', box: { size: 'medium', flavors: ['1', '2'] }, quantity: 2 }])
  })

  it('should keep a cookie and a box with the same flavor as separate lines', () => {
    const cookie: CartItem = { type: 'cookie', productId: '1', quantity: 1 }
    const cart: Cart = [cookie]
    const box: CartItem = { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 1 }

    const result = addItem(cart, box)

    expect(result).toEqual([
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'box', box: { size: 'small', flavors: ['1'] }, quantity: 1 },
    ])
  })

  it('should keep the merged line in its position and leave the other lines untouched', () => {
    const cart: Cart = [
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 1 },
      { type: 'cookie', productId: '3', quantity: 1 },
    ]
    const item: CartItem = { type: 'cookie', productId: '2', quantity: 2 }

    const result = addItem(cart, item)

    expect(result).toEqual([
      { type: 'cookie', productId: '1', quantity: 1 },
      { type: 'cookie', productId: '2', quantity: 3 },
      { type: 'cookie', productId: '3', quantity: 1 },
    ])
  })

  it('should return a new array instead of the original cart', () => {
    const cart: Cart = [{ type: 'cookie', productId: '1', quantity: 1 }]
    const item: CartItem = { type: 'cookie', productId: '2', quantity: 1 }

    const result = addItem(cart, item)

    expect(result).toHaveLength(2)
    expect(result).not.toBe(cart)
    expect(cart).toEqual([{ type: 'cookie', productId: '1', quantity: 1 }])
  })

  it('should not change the quantity of the line objects in the original cart', () => {
    const line: CartItem = { type: 'cookie', productId: '1', quantity: 1 }
    const cart: Cart = [line]
    const item: CartItem = { type: 'cookie', productId: '1', quantity: 2 }

    const result = addItem(cart, item)

    expect(result[0].quantity).toBe(3)
    expect(line.quantity).toBe(1)
  })
})