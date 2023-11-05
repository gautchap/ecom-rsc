const currency = new Intl.NumberFormat(undefined, {
  currency: "EUR",
  style: "currency",
});

export const formatCurrency = (value: number) => currency.format(value);
