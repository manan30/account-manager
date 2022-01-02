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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      globalDispatch({ type: 'LOGOUT_USER' });
      history.push('/authentication');
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
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

  return { loading, logout };
};
