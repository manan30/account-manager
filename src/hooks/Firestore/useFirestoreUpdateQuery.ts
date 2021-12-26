import { CollectionName } from '../../models/models';
import { useCallback, useEffect, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';

type UpdateQueryArgs = {
  collectionName: CollectionName;
  onSuccess?: () => void;
};

const useFirestoreUpdateQuery = <T>({
  collectionName,
  onSuccess
}: UpdateQueryArgs): [
  (id: string, document: Partial<T>) => Promise<void>,
  {
    updated: boolean;
    error: boolean;
    isLoading: boolean;
  }
] => {
  const notificationDispatch = useNotificationDispatch();
  const { firestore } = useFirebaseContext();
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const mutation = useCallback(
    async (id: string, document: Partial<T>) => {
      try {
        setIsLoading(true);
        setError(false);
        await firestore.collection(collectionName).doc(id).update(document);
        setUpdated(true);
        if (onSuccess) onSuccess();
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [firestore, collectionName, onSuccess]
  );

  useEffect(() => {
    if (error) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content:
            'Failed to perform update action. Please try again after some time',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [error, notificationDispatch]);

  return [mutation, { updated, error, isLoading }];
};

export default useFirestoreUpdateQuery;
