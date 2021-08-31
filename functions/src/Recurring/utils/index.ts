import * as faker from 'faker';
import * as admin from 'firebase-admin';
import { Recurring } from '../interfaces/recurring.model';

export const generateFakeRecurringRecord = (): Recurring => {
  const types = ['credit', 'debit'];
  const name = faker.company.companyName();
  const amount = Number(faker.commerce.price());
  const recurringDate = admin.firestore.Timestamp.fromDate(
    faker.date.past(2, '12/31/2021')
  );
  const type = types[Math.floor(Math.random() * (types.length - 1))];
  const createdAt = admin.firestore.Timestamp.now();

  return {
    name,
    amount,
    createdAt,
    updatedAt: createdAt,
    monthlyPayment: faker.datatype.boolean(),
    type,
    recurringDate
  } as Recurring;
};
