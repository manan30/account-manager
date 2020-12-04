export const AmountFormatter = {
  format: (value = '') => {
    if (Number.isNaN(Number(value))) {
      let str = '';
      for (let i = 0; i < value.length; i += 1) {
        if (!/\D/g.test(value[i])) {
          str += value[i];
        }
      }
      return `$${new Intl.NumberFormat().format(Number(str))}`;
    }
    return `$${new Intl.NumberFormat().format(Number(value))}`;
  },
  unFormat: (value = '') => {
    if (value.length === 1) return value;
    return value.slice(1).split(',').join('');
  }
};
