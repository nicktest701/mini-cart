export const CurrencyFormatter = (currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 2,
  }).format(isNaN(currency) ? 0 : currency);
};
