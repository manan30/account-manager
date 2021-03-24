import React from 'react';
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
    <Modal
      isOpen
      onCloseClickHandler={onModalCloseHandler}
      modalTitle='Transactions'
    >
      <div />
    </Modal>
  );
};

export default TransactionsModal;
