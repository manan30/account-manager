import React, { useEffect, useState } from 'react';
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
      const result = await auth?.signInWithPopup(
        authProviders.googleAuthProvider
      );
      const user = result?.user;
      const credential = result?.credential;
      console.log({ user, credential });
    }
  };

  useEffect(() => {
    auth?.onAuthStateChanged((authUser) => {
      if (authUser && !user) {
        dispatch({ type: 'ADD_APP_USER', payload: { user: authUser } });
        history.replace(state.from);
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
