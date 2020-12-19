export const isEmptyString = (value = '') => {
  return value === '' && value.trim() === '';
};

export const generateRandomKey = () => {
  return Math.floor(Math.random() * 9999);
};
