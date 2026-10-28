import { describe, expect, it } from 'vitest';
import { formatPrice } from '@/lib/format-price';
import { toInteger } from '@/lib/utils';

describe('formatPrice', () => {
  it('formats German prices with comma and trailing euro sign', () => {
    expect(formatPrice(toInteger(320), 'de')).toBe('3,20 €');
  });

  it('formats English prices with leading euro sign', () => {
    expect(formatPrice(toInteger(320), 'en')).toBe('€3.20');
  });
});
