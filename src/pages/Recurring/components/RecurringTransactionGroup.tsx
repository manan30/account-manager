import React from 'react';
import { Recurring } from '../interfaces/recurring.model';
import { RecurringTransactionCategory } from '../utils/constants';
import RecurringItem from './RecurringItem';

type RecurringTransactionGroupProps = {
  category: typeof RecurringTransactionCategory[number];
  transactions: Array<Recurring>;
};

const RecurringTransactionGroup: React.FC<RecurringTransactionGroupProps> = ({
  category,
  transactions
}) => {
  return (
    <section>
      <h2 className='mb-6 text-lg font-semibold tracking-wide text-indigo-600'>
        {category}
      </h2>
      <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        {transactions.map((transaction) => (
          <RecurringItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </section>
  );
};

export default RecurringTransactionGroup;
