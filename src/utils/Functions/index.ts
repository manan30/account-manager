export const isEmptyString = (value = '') => {
  return value === '' && value.trim() === '';
};

export const generateRandomKey = () => {
  return Math.floor(Math.random() * 9999);
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const numberToMonthMapping = (monthString: string) => {
  const [month, year] = monthString.split('/');
  return `${months[Number(month) - 1]} '${year}`;
};
