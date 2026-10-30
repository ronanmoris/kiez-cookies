type Integer = number & { readonly __brand: 'Integer' };

function toInteger(value: number): Integer {
  if (!Number.isInteger(value)) {
    throw new Error('Value must be an integer');
  }

  return value as Integer;
}
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

export type { Integer, DistributiveOmit };
export { toInteger };
