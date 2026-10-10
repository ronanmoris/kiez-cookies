type Integer = number & { readonly __brand: "Integer" };

function toInteger(value: number): Integer {
  if (!Number.isInteger(value)) {
    throw new Error("Value must be an integer");
  }

  return value as Integer;
}


export type { Integer };
export { toInteger };