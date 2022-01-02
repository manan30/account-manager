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
      <h2 className='mb-4 text-base font-semibold text-indigo-600 md:mb-6 sm:text-lg md:text-xl'>
        {category}
      </h2>
      <div className='grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {transactions.map((transaction) => (
          <RecurringItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </section>
  );
};

export default RecurringTransactionGroup;
