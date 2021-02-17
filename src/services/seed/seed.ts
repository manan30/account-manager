import faker from 'faker';
import { ISpending } from 'models/Spending';
import { ICreditor } from '../../models/Creditor';
import { ITransaction } from '../../models/Transaction';
import FirebaseService from '../firebase';

const { firestore, firestoreTimestamp } = FirebaseService();

const generateFakeCreditor = (): ICreditor => {
  const name = faker.name.findName();
  const amount = Number(faker.finance.amount(0, 3000));
  const currency = faker.finance.currencyCode();
  const createdAt = firestoreTimestamp.now();
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
  } as ICreditor;
};

const generateFakeTransaction = (
  types: string[],
  entities: string[]
): ITransaction => {
  const type = types[Math.floor(Math.random() * (types.length - 1))];
  const entity = entities[Math.floor(Math.random() * (entities.length - 1))];
  const amount = Number(faker.finance.amount(0, 3000));
  const date = firestoreTimestamp.fromDate(faker.date.past(2, '12/31/2020'));

  return {
    transactionType: type,
    transactionEntity: entity,
    amount,
    transactionDate: date,
    createdAt: firestoreTimestamp.now()
  } as ITransaction;
};

const generateFakeSpending = (categories: string[]): ISpending => {
  const storeName = faker.company.companyName();
  const category =
    categories[Math.floor(Math.random() * (categories.length - 1))];
  const amount = Number(faker.commerce.price());
  const date = firestoreTimestamp.fromDate(faker.date.past(2, '12/31/2021'));
  const createdAt = firestoreTimestamp.now();

  return {
    storeName,
    category,
    amount,
    date,
    createdAt,
    updatedAt: createdAt
  } as ISpending;
};

export const seedCreditors = async (documentCount = 10) => {
  const batch = firestore.batch();

  for (let i = 0; i < documentCount; i += 1) {
    const creditor = generateFakeCreditor();
    const id = firestore.collection('creditor').doc().id;
    const docRef = firestore.collection('creditor').doc(id);
    batch.set(docRef, creditor);
  }

  await batch.commit();
};

export const seedTransactions = async (documentCount = 10) => {
  const creditors: string[] = (
    await firestore.collection('creditor').orderBy('createdAt', 'desc').get()
  ).docs.map((doc) => doc.id);
  const types = ['Credit', 'Debit'];

  const batch = firestore.batch();

  for (let i = 0; i < documentCount; i += 1) {
    const transaction = generateFakeTransaction(types, creditors);
    const id = firestore.collection('transaction').doc().id;
    const docRef = firestore.collection('transaction').doc(id);
    batch.set(docRef, transaction);
  }

  await batch.commit();
};

export const seedSpending = async (documentCount = 10) => {
  const categories = ['Dining', 'Rent', 'Groceries', 'Other', 'Shopping'];

  const batch = firestore.batch();

  for (let i = 0; i < documentCount; i += 1) {
    const spending = generateFakeSpending(categories);
    const id = firestore.collection('spending').doc().id;
    const docRef = firestore.collection('spending').doc(id);
    batch.set(docRef, spending);
  }

  await batch.commit();
};

export const seedEverything = async (
  creditorsCount?: number,
  transactionsCount?: number,
  spendingCount?: number
) => {
  await seedCreditors(creditorsCount);
  await seedTransactions(transactionsCount);
  await seedSpending(spendingCount);
};
