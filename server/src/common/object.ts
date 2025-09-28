type NonUndefined<T> = T extends undefined ? never : T;

type OmitUndefined<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]: NonUndefined<T[K]>;
};

export function omitUndefined<T extends Record<string, unknown>>(
  obj: T
): OmitUndefined<T> {
  const result = {} as any;

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}
