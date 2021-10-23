import React, { useMemo } from 'react';
import cn from 'classnames';
import Card from '../../../components/Card';
import { Recurring } from '../interfaces/Recurring';

type RecurringItemProps = {
  transaction: Recurring;
};

const RecurringItem: React.FC<RecurringItemProps> = ({ transaction }) => {
  const recurringDatePassed = useMemo(() => {
    const currentDate = new Date().getUTCDate();
    const recurringDate = transaction.recurringDate.toDate().getUTCDate();
    return recurringDate < currentDate;
  }, [transaction]);

  return (
    <Card
      key={transaction.id}
      className={cn(recurringDatePassed && 'opacity-50 bg-gray-200')}
    >
      <div className='flex h-16'>
        <div
          className={cn(
            'w-16 h-16 rounded-full text-center text-gray-100 text-2xl grid place-items-center',
            transaction.type === 'Debit' ? 'bg-green-500' : 'bg-red-500'
          )}
        >
          {transaction.imageIcon ? null : transaction.name[0].toUpperCase()}
        </div>
        <div className='flex flex-col flex-1 ml-6 space-y-1'>
          <div className='text-sm font-medium text-gray-700 '>
            {transaction.name}
          </div>
          <div className='text-xs text-gray-600'>
            {Intl.DateTimeFormat('en-US', { month: 'long' }).format(Date.now())}{' '}
            {transaction.recurringDate.toDate().getUTCDate()}
          </div>
          <div className='text-sm font-semibold text-gray-700'>
            ${transaction.amount}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecurringItem;
