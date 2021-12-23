import React from 'react';
import { useHandleAuthStateChange } from '../../services/firebase/hooks/useHandleAuthStateChange';
import AuthenticationModal from './AuthenticationModal';

const Authentication = () => {
  useHandleAuthStateChange();
  return <AuthenticationModal />;
};

export default Authentication;
