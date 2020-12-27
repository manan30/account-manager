import faker from 'faker';
import { ICreditor } from '../../models/Creditor';
import { ITransaction } from '../../models/Transaction';
import FirebaseService from '../firebase';

const { firestore, firebaseApp } = FirebaseService();

const generateFakeCreditor = (): ICreditor => {
  const name = faker.name.findName();
  const amount = Number(faker.finance.amount(0, 3000));
  const currency = faker.finance.currencyCode();
  const createdAt = firebaseApp?.firestore.Timestamp.now();
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
  };
};

const generateFakeTransaction = (
  types: string[],
  entities: string[]
): ITransaction => {
  const type = types[Math.floor(Math.random() * (types.length - 1))];
  const entity = entities[Math.floor(Math.random() * (entities.length - 1))];
  const amount = Number(faker.finance.amount(0, 3000));
  const date = firebaseApp?.firestore.Timestamp.fromDate(
    faker.date.past(2, '12/31/2020')
  );

  return {
    transactionType: type,
    transactionEntity: entity,
    amount,
    transactionDate: date,
    createdAt: firebaseApp.firestore.Timestamp.now()
  };
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
  const types = ['Credit', ' Debit'];

  const batch = firestore.batch();

  for (let i = 0; i < documentCount; i += 1) {
    const transaction = generateFakeTransaction(types, creditors);
    const id = firestore.collection('transaction').doc().id;
    const docRef = firestore.collection('transaction').doc(id);
    batch.set(docRef, transaction);
  }

  await batch.commit();
};

export const seedEverything = async (
  creditorsCount?: number,
  transactionsCount?: number
) => {
  await seedCreditors(creditorsCount);
  await seedTransactions(transactionsCount);
};
