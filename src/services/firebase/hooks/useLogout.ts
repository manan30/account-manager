import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useGlobalDispatch } from '../../../providers/GlobalStateProvider';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../../utils/Constants/ThemeConstants';

export const useLogout = () => {
  const history = useHistory();
  const { auth } = useFirebaseContext();
  const globalDispatch = useGlobalDispatch();
  const notificationDispatch = useNotificationDispatch();

  const [error, setError] = useState(false);

  const logout = async () => {
    try {
      await auth.signOut();
      globalDispatch({ type: 'LOGOUT_USER' });
      history.push('/authentication');
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  useEffect(() => {
    if (error) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'Phone authentication failed. Please try again in some time',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [error, notificationDispatch]);

  return { logout };
};
