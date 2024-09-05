export const hasProperty = <T>(
  obj: T,
  key: keyof any
): obj is T & Record<typeof key, unknown> => {
  if (Array.isArray(obj)) {
    return key in obj[0];
  }

  return key in obj;
};
