import React from 'react';
import { Helmet } from 'react-helmet';
import useGetSpendingData from '../../hooks/Spending/useGetSpendingData';

const Spending = () => {
  const { data: spendingData, isLoading, error } = useGetSpendingData();

  return (
    <>
      <Helmet>
        <title>{`Account Manager - Spending`}</title>
        <meta name='title' content={`Account Manager - Spending`} />
        <meta property='og:title' content={`Account Manager - Spending`} />
        <meta property='twitter:title' content={`Account Manager - Spending`} />
      </Helmet>
    </>
  );
};

export default Spending;
