import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import {
  useGlobalDispatch,
  useGlobalState
} from '../../providers/GlobalStateProvider';
import AuthenticationModal from './AuthenticationModal';

const Authentication = () => {
  const { authProviders, auth } = useFirebaseContext();
  const { user } = useGlobalState();
  const { state } = useLocation<{ from: string }>();
  const reCaptchaVerifierRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const dispatch = useGlobalDispatch();

  const handleGoogleAuthProviderClick = async () => {
    if (authProviders) {
      try {
        await auth?.signInWithPopup(authProviders.googleAuthProvider);
      } catch (err) {
        console.error({ err });
      }
    }
  };

  const handlePhoneAuthentication = (phoneNumber: string) => {
    if (reCaptchaVerifierRef.current && auth) {
      console.log({ phoneNumber });
      const reCaptchaVerifier = new authProviders.reCaptchaVerifier(
        reCaptchaVerifierRef.current.id,
        {
          size: 'invisible',
          callback: (...args: Array<Record<string, unknown>>) => {
            // console.log('callback');
            console.log({ args });
          }
        }
      );
      new authProviders.phoneAuthProvider()
        .verifyPhoneNumber(phoneNumber, reCaptchaVerifier)
        .then((res) =>
          authProviders.phoneAuthProvider.credential(res, '123456')
        )
        .then((fulfillment) => {
          auth.signInWithCredential(fulfillment).then((creds) => {
            console.log({ creds });
          });
        })
        .catch((err) => console.error({ err }));
      // console.log({ reCaptchaVerifier });
    }
  };

  useEffect(() => {
    auth?.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUserEmail = authUser?.email ?? '';
        const authUsers = JSON.parse(
          import.meta.env.VITE_FIREBASE_AUTH_USER_EMAIL as string
        ) as Array<string>;

        if (import.meta.env.PROD && !authUsers.includes(currentUserEmail)) {
          dispatch({
            type: 'SET_UNAUTHORIZED_USER'
          });
          history.replace('/unauthorized');
          return;
        }

        if (!user) {
          dispatch({
            type: 'ADD_APP_USER',
            payload: { user: authUser }
          });
          history.replace(state?.from || '/');
        }
      }
    });
  }, [user, auth, dispatch, state, history]);

  return (
    <AuthenticationModal
      onGoogleAuthClicked={handleGoogleAuthProviderClick}
      handlePhoneAuthentication={handlePhoneAuthentication}
      reCaptchaVerifierRef={reCaptchaVerifierRef}
    />
  );
};

export default Authentication;
