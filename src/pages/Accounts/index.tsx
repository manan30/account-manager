import React, { useEffect, useRef } from 'react';

const Accounts = () => {
  const tellerConnectRef = useRef();

  useEffect(() => {
    if (!tellerConnectRef.current) {
      tellerConnectRef.current = TellerConnect.setup({
        applicationId: 'app_ne22ctjh06r2t6156a000',
        onInit: function () {
          console.log('Teller Connect has initialized');
        },
        // Part 3. Handle a successful enrollment's accessToken
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
        tellerConnectRef.current.open();
      }}
    >
      Accounts Page
    </button>
  );
};

export default Accounts;
