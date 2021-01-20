import React, { useEffect } from 'react';
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

  useEffect(() => {
    auth?.onAuthStateChanged((authUser) => {
      const currentUserEmail = authUser?.email;
      if (currentUserEmail !== process.env.PROD_AUTH_USER_EMAIL) {
        setUnAuthorizedUser(true);
      }
      if (authUser && !user) {
        dispatch({ type: 'ADD_APP_USER', payload: { user: authUser } });
        history.replace(state?.from || '/');
      }
    });
  }, [user, auth, dispatch, state, history]);

  return (
    <AuthenticationModal
      onGoogleAuthClicked={() => handleGoogleAuthProviderClick()}
    />
  );
};

export default Authentication;
