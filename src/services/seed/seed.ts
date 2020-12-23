import FirebaseService from '../firebase';
import faker from 'faker';
import { ICreditor } from 'models/Creditor';

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

export const seedEverything = async (creditorsCount?: number) => {
  await seedCreditors(creditorsCount);
};
