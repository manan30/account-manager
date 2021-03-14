import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';

const Accounts = () => {
  const fetchAccounts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${ACCOUNT_FUNCTIONS}/teller-account/${accessToken}`
      );
      console.log({ res });
    } catch (e) {
      console.log({ e });
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchAccounts();
    }
  }, [accessToken, fetchAccounts]);

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
