import React from 'react';
import Modal from '../../components/Modal';
import { ISpending } from '../../models/Spending';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { generateRandomKey } from '../../utils/Functions';

type SpendingOverviewModalProps = {
  handleModalClose: () => void;
  currentTransaction?: ISpending;
  allTransactions?: ISpending[];
};

const SpendingOverviewModal: React.FC<SpendingOverviewModalProps> = ({
  currentTransaction,
  allTransactions,
  handleModalClose
}) => {
  return (
    <Modal isOpen shouldCloseOnEscape onCloseClickHandler={handleModalClose}>
      <div className='flex flex-col justify-center items-center mb-4'>
        <h2 className='tracking-wider uppercase text-xl mb-4 text-gray-500'>
          Transaction
        </h2>
        <h3 className='mb-4 text-gray-600'>
          {new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'short',
            year: 'numeric',
            day: 'numeric'
          }).format(currentTransaction?.date.toDate())}
        </h3>
        <h1 className='text-2xl tracking-wide font-semibold mb-4 text-indigo-600'>
          {currentTransaction?.storeName}
        </h1>
        <h2 className='tracking-wider uppercase text-xl mb-4 text-indigo-500'>
          ${NumberWithCommasFormatter.format(`${currentTransaction?.amount}`)}
        </h2>
        <div className='font-medium text-xl w-full text-center mb-4 text-gray-600'>
          All {currentTransaction?.category || ''} transactions
        </div>
        <div className='w-full px-3' style={{ height: 'calc(100% - 10rem)' }}>
          {allTransactions?.map((transaction) => {
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

export default SpendingOverviewModal;
