export const parseCurrencyValue = (value: string | number): number => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) return 0;

  return parseFloat(numericValue.toFixed(2));
};