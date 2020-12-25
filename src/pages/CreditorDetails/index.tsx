import useGetCreditorById from '../../hooks/Creditors/useGetCreditorById';
import { RouteParamsInterface } from 'interfaces/route-interface';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CreditorDetails = () => {
  const { id } = useParams<RouteParamsInterface>();
  const {
    creditorData: creditor,
    transactionsData: transactions,
    error,
    isLoading
  } = useGetCreditorById(id);

  useEffect(() => {
    console.log({ creditor, transactions, error, isLoading });
  }, [creditor, transactions, error, isLoading]);

  return <div></div>;
};

export default CreditorDetails;
