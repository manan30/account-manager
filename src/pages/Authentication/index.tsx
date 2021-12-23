import React, { useState } from 'react';
import AuthenticationModal from './AuthenticationModal';
import { usePhoneAuth } from '../../services/firebase/hooks/usePhoneAuth';
import VerificationCodeModal from './VerificationCodeModal';

const Authentication = () => {
  const [accountProcessing, setAccountProcessing] = useState(false);
  const {
    reCaptchaVerifierRef,
    awaitingVerificationCode,
    setAwaitingVerificationCode,
    handlePhoneNumberStep,
    handleVerificationCodeStep
  } = usePhoneAuth();

  // const handleGoogleAuthProviderClick = async () => {
  //   if (authProviders) {
  //     try {
  //       await auth?.signInWithPopup(authProviders.googleAuthProvider);
  //     } catch (err) {
  //       console.error({ err });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   auth?.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       const currentUserEmail = authUser?.email ?? '';
  //       const authUsers = JSON.parse(
  //         import.meta.env.VITE_FIREBASE_AUTH_USER_EMAIL as string
  //       ) as Array<string>;

  //       if (import.meta.env.PROD && !authUsers.includes(currentUserEmail)) {
  //         dispatch({
  //           type: 'SET_UNAUTHORIZED_USER'
  //         });
  //         history.replace('/unauthorized');
  //         return;
  //       }

  //       if (!user) {
  //         dispatch({
  //           type: 'ADD_APP_USER',
  //           payload: { user: authUser }
  //         });
  //         history.replace(state?.from || '/');
  //       }
  //     }
  //   });
  // }, [user, auth, dispatch, state, history]);

  return (
    <>
      <AuthenticationModal
        accountProcessing={accountProcessing}
        reCaptchaVerifierRef={reCaptchaVerifierRef}
        // onGoogleAuthClicked={handleGoogleAuthProviderClick}
        handlePhoneNumberStep={handlePhoneNumberStep}
      />
      {awaitingVerificationCode ? (
        <VerificationCodeModal
          handleVerificationCodeStep={handleVerificationCodeStep}
          hideModal={(status) => setAwaitingVerificationCode(status)}
        />
      ) : null}
    </>
  );
};

export default Authentication;
