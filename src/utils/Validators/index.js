import { isEmptyString } from '../Functions';

export const NumberValidator = (value = '') => {
  if (!isEmptyString(value))
    return {
      testFailed: /\D/g.test(value),
      errorMessage: 'Only digits number are allowed'
    };
  return {};
};

export const NameValidator = (value = '') => {};
