export const NumberValidator = (value = '') => {
  return {
    testFailed: /^\D{0,4}(\.\D{0,2})?$/g.test(value),
    errorMessage: 'Only digits are allowed'
  };
};

export const NameValidator = (value = '') => {
  return {
    testFailed: !/^[a-zA-Z ]+$/g.test(value),
    errorMessage: 'Only alphabets are allowed'
  };
};
