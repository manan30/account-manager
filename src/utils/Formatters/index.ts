export const NumberWithCommasFormatter = {
  format: (value = '') => {
    return new Intl.NumberFormat().format(Number(value));
  },
  unFormat: (value = '') => {
    return value.split(',').join('');
  }
};
