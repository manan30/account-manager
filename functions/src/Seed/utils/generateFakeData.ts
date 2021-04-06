import * as faker from 'faker';
import * as admin from 'firebase-admin';
import { Creditor } from '../../Creditor/interfaces/creditor.model';
import { Spending } from '../../Spending/interfaces/spending.model';

export const generateFakeCreditor = (): Creditor => {
  const name = faker.name.findName();
  const amount = Number(faker.finance.amount(0, 3000));
  const currency = faker.finance.currencyCode();
  const createdAt = admin.firestore.Timestamp.now();
  const accountSettledOn = null;

  return {
    name,
    amount,
    currency,
    createdAt,
    remainingAmount: amount,
    accountSettledOn,
    accountSettled: false,
    updatedAt: createdAt
  } as Creditor;
};

const categories = [
  'accommodation',
  'advertising',
  'bar',
  'charity',
  'clothing',
  'dining',
  'education',
  'electronics',
  'entertainment',
  'fuel',
  'groceries',
  'health',
  'home',
  'income',
  'insurance',
  'investment',
  'loan',
  'office',
  'phone',
  'service',
  'shopping',
  'software',
  'sport',
  'tax',
  'transport',
  'transportation',
  'utilities'
];

export const generateFakeSpending = (): Spending => {
  const storeName = faker.company.companyName();
  const category =
    categories[Math.floor(Math.random() * (categories.length - 1))];
  const amount = Number(faker.commerce.price());
  const date = admin.firestore.Timestamp.fromDate(
    faker.date.past(2, '12/31/2021')
  );
  const createdAt = admin.firestore.Timestamp.now();

  return {
    storeName,
    category,
    amount,
    date,
    createdAt,
    updatedAt: createdAt
  } as Spending;
};
