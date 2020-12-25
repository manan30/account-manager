import useGetCreditorById from '../../hooks/Creditors/useGetCreditorById';
import { RouteParamsInterface } from 'interfaces/route-interface';
import React from 'react';
import { useParams } from 'react-router-dom';

const CreditorDetails = () => {
  const { id } = useParams<RouteParamsInterface>();
  const { data, error, isLoading } = useGetCreditorById(id);
  console.log({ data, error, isLoading });
  return <div></div>;
};

export default CreditorDetails;
