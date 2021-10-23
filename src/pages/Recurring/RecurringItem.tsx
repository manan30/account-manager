import React from 'react';
import cn from 'classnames';
import Card from '../../components/Card';
import { Recurring } from './interfaces/Recurring';

type RecurringItemProps = {
  transaction: Recurring;
};

const RecurringItem: React.FC<RecurringItemProps> = ({ transaction }) => {
  return (
    <Card key={transaction.id}>
      <div className='flex items-center h-12'>
        <div
          className={cn(
            'w-12 h-12 rounded-full text-center text-gray-100 text-2xl flex items-center justify-center',
            transaction.type === 'Debit' ? 'bg-green-500' : 'bg-red-500'
          )}
        >
          {transaction.imageIcon ? null : transaction.name[0].toUpperCase()}
        </div>
      </div>
    </Card>
  );
};

export default RecurringItem;
