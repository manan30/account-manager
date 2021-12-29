import { useEffect, useState } from 'react';
import { AuthError } from '@firebase/auth-types';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../../utils/Constants/ThemeConstants';
import { AUTH_ERROR_CODES } from '../constants';

export const usePasswordAuth = () => {
  const notificationDispatch = useNotificationDispatch();
  const { auth } = useFirebaseContext();
  const [error, setError] = useState<AuthError | null>(null);
  const [processing, setProcessing] = useState(false);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setProcessing(true);
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      setError(err as AuthError);
    } finally {
      setProcessing(false);
    }
  };

  const handlePasswordAuth = async (email: string, password: string) => {
    try {
      setProcessing(true);
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      if ((err as AuthError).code === AUTH_ERROR_CODES.EMAIL_IN_USE) {
        await signInWithEmail(email, password);
        return;
      }
      console.error(err);
      setError(err as AuthError);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (error) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: error.message,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [error, notificationDispatch]);

  return { processing, handlePasswordAuth };
};
