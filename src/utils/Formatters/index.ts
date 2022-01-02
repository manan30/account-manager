export const CurrencyFormatter = {
  format: (value = '') => {
    return new Intl.NumberFormat('en-US', {}).format(Number(value));
  }
};
