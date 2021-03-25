import React from 'react';
import { MdClose } from 'react-icons/md';
import { useQuery } from 'react-query';
import axios, { Response } from 'redaxios';
import Modal from '../../components/Modal';
import { Transaction } from '../../models/Account';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';

type TransactionModalProps = {
  accessToken: string;
  accountId: string;
  onModalCloseHandler: () => void;
};

const TransactionsModal: React.FC<TransactionModalProps> = ({
  accessToken,
  accountId,
  onModalCloseHandler
}) => {
  const { data: transactionsData, isLoading: loadingTransactions } = useQuery<
    Response<Transaction[]>,
    Response<Error>
  >(
    [accountId, accessToken, 'transactions'],
    async () =>
      await axios.get<Transaction[]>(
        `${ACCOUNT_FUNCTIONS}/transactions/${accessToken}/${accountId}`
      ),
    { staleTime: 600000 }
  );

  return (
    <div className='fixed z-10 inset-0 overflow-y-auto grid place-items-center'>
      <div
        className='fixed inset-0 bg-gray-500 opacity-50'
        aria-hidden='true'
      />
      <div
        className='w-2/3 p-4 rounded-md shadow-xl bg-gray-50 z-40'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <div className='flex items-center'>
          <div className='text-indigo-600 text-xl font-bold tracking-wide'>
            Transactions
          </div>
          <button
            className='ml-auto p-1 mr-1 rounded-full hover:bg-gray-200'
            onClick={onModalCloseHandler}
          >
            <MdClose className='text-gray-500' size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsModal;
