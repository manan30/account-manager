import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../../utils/Constants/ThemeConstants';

export const usePasswordAuth = () => {
  const notificationDispatch = useNotificationDispatch();
  const { auth } = useFirebaseContext();
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePasswordAuth = async (email: string, password: string) => {
    try {
      setProcessing(true);
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (error) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'Unable to create user. Please try again in some time',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [error, notificationDispatch]);

  return { processing, handlePasswordAuth };
};
