import React, { useMemo } from 'react';
import cn from 'classnames';
import Card from '../../../components/Card';
import { Recurring } from '../interfaces/recurring.model';

type RecurringItemProps = {
  transaction: Recurring;
};

const RecurringItem: React.FC<RecurringItemProps> = ({ transaction }) => {
  const { recurringDatePassed, daysRemainingPercent } = useMemo(() => {
    const currentDate = new Date().getUTCDate();
    const recurringDate = transaction.recurringDate.toDate().getUTCDate();
    return {
      recurringDatePassed: recurringDate < currentDate,
      daysRemainingPercent: (currentDate * 100) / recurringDate
    };
  }, [transaction]);

  return (
    <Card
      key={transaction.id}
      className={cn(
        'relative',
        recurringDatePassed && 'opacity-50 bg-gray-200'
      )}
    >
      {!recurringDatePassed ? (
        <>
          <div
            style={{ height: '3px' }}
            className={cn(
              'absolute bottom-0 left-0 w-full opacity-20',
              transaction.type === 'Debit' ? 'bg-green-500' : 'bg-red-500'
            )}
          ></div>
          <div
            style={{ height: '3px', width: `${daysRemainingPercent}%` }}
            className={cn(
              'absolute bottom-0 left-0',
              transaction.type === 'Debit' ? 'bg-green-500' : 'bg-red-500'
            )}
          ></div>
        </>
      ) : null}
      <div className='flex h-12 md:h-16'>
        <div
          className={cn(
            'w-12 h-12 md:w-16 md:h-16 rounded-full text-center text-gray-100 text-2xl grid place-items-center',
            transaction.type === 'Debit' ? 'bg-green-500' : 'bg-red-500'
          )}
        >
          {transaction.imageIcon ? null : transaction.name[0].toUpperCase()}
        </div>
        <div className='flex flex-col flex-1 ml-6 space-y-1'>
          <div className='text-xs font-medium text-gray-700 md:text-sm '>
            {transaction.name}
          </div>
          <div className='text-xs text-gray-600'>
            {Intl.DateTimeFormat('en-US', { month: 'long' }).format(Date.now())}{' '}
            {transaction.recurringDate.toDate().getUTCDate()}
          </div>
          <div className='text-xs font-semibold text-gray-700 md:text-sm'>
            ${transaction.amount}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecurringItem;
