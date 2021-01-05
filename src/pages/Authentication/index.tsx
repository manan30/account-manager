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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // const googleAuthProvider = new authProviders!.GoogleAuthProvider();
  // googleAuthProvider.addScope('profile');
  // googleAuthProvider.addScope('email');

  // const handleGoogleAuthProviderClick = async () => {
  //   const result = await auth?.signInWithPopup(googleAuthProvider);
  //   // const user = result?.user;
  //   // const credential = result?.credential;
  // };

  useEffect(() => {
    auth?.onAuthStateChanged((authUser) => {
      if (authUser && !user) {
        dispatch({ type: 'ADD_APP_USER', payload: { user: authUser } });
        history.replace(state.from);
      }
    });
  }, [user, auth, dispatch, state, history]);

  return <AuthenticationModal />;
};

export default Authentication;
