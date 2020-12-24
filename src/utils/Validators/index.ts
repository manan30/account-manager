export const AmountValidator = (value = '') => {
  // TODO: Get 1000.55 format to work
  return {
    testFailed: /\D/g.test(value),
    errorMessage: 'Only digits are allowed'
  };
};

export const NameValidator = (value = '') => {
  return {
    testFailed: !/^[a-zA-Z ]+$/g.test(value),
    errorMessage: 'Only alphabets are allowed'
  };
};
