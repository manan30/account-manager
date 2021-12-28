import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useGlobalDispatch } from '../../../providers/GlobalStateProvider';

export const useHandleAuthStateChange = () => {
  const history = useHistory();
  const { state } = useLocation<{ from: string }>();
  const { auth } = useFirebaseContext();
  const globalDispatch = useGlobalDispatch();

  useEffect(() => {
    auth?.onAuthStateChanged((authUser) => {
      if (authUser) {
        globalDispatch({ type: 'ADD_APP_USER', payload: { user: authUser } });
        history.replace(state?.from || '/');
      }
    });
  }, [auth, history, state, globalDispatch]);
};
