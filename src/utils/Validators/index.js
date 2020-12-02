export const NumberValidator = (value = '') => {
  return {
    testFailed: /\D/g.test(value),
    errorMessage: 'Only digits are allowed'
  };
};

export const NameValidator = (value = '') => {};
