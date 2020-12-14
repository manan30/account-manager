import FirebaseService from '../firebase';
import faker from 'faker';

const { firestore, firebaseApp } = FirebaseService();

export const seedCreditors = async () => {
  const amount = faker.finance.amount(0, 3000);
  await firestore?.collection('creditors').add({
    name: faker.name.findName(),
    amount: amount,
    currency: faker.finance.currencyCode(),
    remainingAmount: amount,
    createdAt: firebaseApp?.firestore.Timestamp.now(),
    accountSettledOn: null
  });
};

export const seedEverything = async () => {
  await seedCreditors();
};
