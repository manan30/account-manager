import React from 'react';
import Modal from '../../../components/Modal/Modal';
import { IExpense } from '../../../models/Expense';
import { CurrencyFormatter } from '../../../utils/Formatters';
import { generateRandomKey } from '../../../utils/Functions';

type ExpenseOverviewModalProps = {
  currentExpense?: IExpense;
  expenseData?: IExpense[];
  handleModalClose: () => void;
};

const ExpenseOverviewModal: React.FC<ExpenseOverviewModalProps> = ({
  currentExpense,
  expenseData,
  handleModalClose
}) => {
  const allExpenses = expenseData
    ?.filter(
      (d) =>
        d.category === currentExpense?.category && d.id !== currentExpense.id
    )
    .sort((a, b) => {
      return (
        new Date(b.date.toDate()).valueOf() -
        new Date(a.date.toDate()).valueOf()
      );
    });
  return (
    <Modal
      title={`${currentExpense?.category || ''} Expenses`}
      onCloseIconClick={handleModalClose}
    >
      <div className='flex flex-col items-center justify-center space-y-3'>
        <h2 className='text-base tracking-wider text-gray-500 uppercase md:text-xl'>
          Transaction
        </h2>
        <h3 className='text-sm text-gray-600 md:text-lg'>
          {new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'short',
            year: 'numeric',
            day: 'numeric'
          }).format(currentExpense?.date.toDate())}
        </h3>
        <h1 className='text-xl font-semibold tracking-wide text-indigo-600 md:text-2xl'>
          {currentExpense?.storeName}
        </h1>
        <h2 className='text-base tracking-wider text-indigo-500 uppercase md:text-xl'>
          ${CurrencyFormatter.format(`${currentExpense?.amount}`)}
        </h2>
        <div className='w-full px-3'>
          <div className='w-full mb-2 text-base font-medium text-center text-gray-600 capitalize md:text-lg'>
            Other {currentExpense?.category || ''} expenses
          </div>
          {allExpenses?.map((transaction) => {
            return (
              <div
                className='grid gap-2 mt-2 grid-cols-expenses'
                key={generateRandomKey()}
              >
                <div className='text-sm text-gray-600 md:text-base'>
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric'
                  }).format(transaction?.date.toDate())}
                </div>
                <div className='text-sm font-semibold text-indigo-600 md:text-base'>
                  {transaction.storeName}
                </div>
                <div className='text-sm text-right text-gray-700 md:text-base'>
                  ${CurrencyFormatter.format(`${transaction.amount}`)}
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
