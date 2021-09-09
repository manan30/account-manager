import { SpendingCategories } from '../Constants/AppConstants';

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

export const spendingCategoryColorMapping = (category: string) => {
  switch (category) {
    case SpendingCategories.OTHER:
      return '#4a5568';
    case SpendingCategories.DINING:
      return '#38a169';
    case SpendingCategories.GROCERIES:
      return '#6b46c1';
    case SpendingCategories.RENT:
      return '#dd6b20';
    case SpendingCategories.SHOPPING:
      return '#2b6cb0';
    default:
      return '#4fd1c5';
  }
};

export const monthDiffBetweenTwoDates = (dateFrom: string, dateTo: string) => {
  const date1 = new Date(dateTo);
  const date2 = new Date(dateFrom);
  return (
    date1.getMonth() -
    date2.getMonth() +
    12 * (date1.getFullYear() - date2.getFullYear())
  );
};
