import { useEffect } from 'react';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';

export const useHandleAuthStateChange = () => {
  const { auth } = useFirebaseContext();

  useEffect(() => {
    auth?.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log({ authUser });
      }
    });
  }, [auth]);
};
