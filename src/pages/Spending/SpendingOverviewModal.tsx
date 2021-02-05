import { ISpending } from 'models/Spending';
import React from 'react';
import Modal from '../../components/Modal';

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
      </div>
    </Modal>
  );
};

export default SpendingOverviewModal;
