import { RouteParamsInterface } from 'interfaces/route-interface';
import React from 'react';
import { useParams } from 'react-router-dom';

const CreditorDetails = () => {
  const { id } = useParams<RouteParamsInterface>();
  return <div></div>;
};

export default CreditorDetails;
