import React, { useEffect, useRef } from 'react';

const Accounts = () => {
  const tellerConnectRef = useRef<{ open: () => void | undefined }>();

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
        },
        onExit: function () {
          console.log('User closed Teller Connect');
        }
      });
    }
  }, []);

  return (
    <button
      onClick={() => {
        tellerConnectRef.current?.open();
      }}
    >
      Accounts Page
    </button>
  );
};

export default Accounts;
