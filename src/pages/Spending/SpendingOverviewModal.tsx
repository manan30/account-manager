import React from 'react';
import Modal from '../../components/Modal';
import { ISpending } from '../../models/Spending';
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
    <Modal isOpen onCloseClickHandler={handleModalClose}>
      <div className='flex flex-col justify-center items-center mb-8'>
        <h2 className='tracking-wider uppercase text-xl mb-4'>Transaction</h2>
        <h3 className='mb-4'>
          {new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'short',
            year: 'numeric',
            day: 'numeric'
          }).format(currentTransaction?.date.toDate())}
        </h3>
        <h1 className='text-2xl tracking-wide font-semibold mb-4'>
          {currentTransaction?.storeName}
        </h1>
        <h2 className='tracking-wider uppercase text-xl mb-4'>
          ${currentTransaction?.amount}
        </h2>
        <div className='font-medium text-xl'>
          All {currentTransaction?.category} transactions
        </div>
        <div className='w-full px-3'>
          {allTransactions?.map((transaction) => {
            return (
              <div
                className='mt-4 flex items-center justify-between'
                key={generateRandomKey()}
              >
                <div className='w-1/5'>
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric'
                  }).format(transaction?.date.toDate())}
                </div>
                <div className='flex-auto mr-4'>{transaction.storeName}</div>
                <div className='w-1/5 text-right'>${transaction.amount}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default SpendingOverviewModal;
