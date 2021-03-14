import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';
import { useTellerConnect } from '../../hooks/useTellerConnect';

const Accounts = () => {
  const { enrollment, initializing, tellerConnectRef } = useTellerConnect();

  const fetchAccounts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${ACCOUNT_FUNCTIONS}/teller-account/${enrollment?.accessToken}`
      );
      console.log({ res });
    } catch (e) {
      console.log({ e });
    }
  }, [enrollment]);

  useEffect(() => {
    if (enrollment?.accessToken) {
      fetchAccounts();
    }
  }, [enrollment, fetchAccounts]);

  return (
    <button
      onClick={() => {
        console.log(tellerConnectRef.current);
        tellerConnectRef.current?.open();
      }}
    >
      Accounts Page
    </button>
  );
};

export default Accounts;
