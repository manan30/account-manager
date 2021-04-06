import * as faker from 'faker';
import * as admin from 'firebase-admin';
import { Creditor } from '../../Creditor/interfaces/creditor.model';

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
