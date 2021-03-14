import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';

const Accounts = () => {
  const tellerConnectRef = useRef<{ open: () => void | undefined }>();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (!tellerConnectRef.current) {
      tellerConnectRef.current = TellerConnect.setup({
        environment: 'development',
        applicationId: 'app_ne22ctjh06r2t6156a000',
        onInit: function () {
          console.log('Teller Connect has initialized');
        },
        onSuccess: function (enrollment) {
          console.log({ enrollment });
          console.log('User enrolled successfully', enrollment.accessToken);
          setAccessToken(enrollment.accessToken);
        },
        onExit: function () {
          console.log('User closed Teller Connect');
        }
      });
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    try {
      // const endpoint = 'https://api.teller.io/accounts';
      const res = await axios.get(
        `${ACCOUNT_FUNCTIONS}/teller-accounts/${accessToken}`
      );
      console.log({ res });
      // const data = await axios.get(endpoint, {
      //   withCredentials: true,
      //   auth: {
      //     username: accessToken,
      //     password: ''
      //   }
      // });
      // console.log({ data });
      // const { data } = await axios.get(endpoint, {
      //   headers: {
      //     Accept: 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Credentials': true
      //   },
      //   auth: {
      //     username: accessToken ?? '',
      //     password: ''
      //   },
      //   withCredentials: true
      // });
      // console.log({ data });
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
