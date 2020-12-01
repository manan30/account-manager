import { isEmptyString } from '../Functions';

// eslint-disable-next-line import/prefer-default-export
export const AmountFormatter = {
  format: (value = '') => {
    // if (isEmptyString(value)) return '';
    return `$${new Intl.NumberFormat().format(Number(value))}`;
  },
  unFormat: (value = '') => {
    // if (isEmptyString(value)) return '';
    return value.slice(1).split(',').join('');
  }
};
