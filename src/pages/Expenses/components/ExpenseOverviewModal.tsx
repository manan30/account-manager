import React from 'react';
import Modal from '../../../components/Modal/Modal';
import { IExpense } from '../../../models/Expense';
import { NumberWithCommasFormatter } from '../../../utils/Formatters';
import { generateRandomKey } from '../../../utils/Functions';

type ExpenseOverviewModalProps = {
  currentExpense?: IExpense;
  allExpenses?: IExpense[];
  handleModalClose: () => void;
};

const ExpenseOverviewModal: React.FC<ExpenseOverviewModalProps> = ({
  currentExpense,
  allExpenses,
  handleModalClose
}) => {
  return (
    <Modal
      title={`${currentExpense?.category || ''} Expenses`}
      onCloseIconClick={handleModalClose}
    >
      <div className='flex flex-col justify-center items-center mb-3'>
        <h2 className='tracking-wider uppercase text-xl mb-4 text-gray-500'>
          Transaction
        </h2>
        <h3 className='mb-4 text-gray-600'>
          {new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'short',
            year: 'numeric',
            day: 'numeric'
          }).format(currentExpense?.date.toDate())}
        </h3>
        <h1 className='text-2xl tracking-wide font-semibold mb-4 text-indigo-600'>
          {currentExpense?.storeName}
        </h1>
        <h2 className='tracking-wider uppercase text-xl mb-4 text-indigo-500'>
          ${NumberWithCommasFormatter.format(`${currentExpense?.amount}`)}
        </h2>
        <div className='font-medium text-xl w-full text-center mb-2 text-gray-600 capitalize'>
          Other {currentExpense?.category || ''} expenses
        </div>
        <div className='w-full px-3'>
          {allExpenses?.map((transaction) => {
            return (
              <div
                className='mt-4 flex items-center justify-between'
                key={generateRandomKey()}
              >
                <div className='w-1/5 text-gray-600'>
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric'
                  }).format(transaction?.date.toDate())}
                </div>
                <div className='flex-auto mr-4 font-semibold text-indigo-600'>
                  {transaction.storeName}
                </div>
                <div className='w-1/5 text-right text-gray-700'>
                  ${NumberWithCommasFormatter.format(`${transaction.amount}`)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ExpenseOverviewModal;
