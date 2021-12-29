import { CollectionName } from '../../models/models';
import { useCallback, useEffect, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { DocumentData, DocumentReference } from '@firebase/firestore-types';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';

type CreateQueryArgs = {
  collectionName: CollectionName;
  onSuccess?: () => void;
  onError?: () => void;
  onComplete?: () => void;
};

const useFirestoreCreateQuery = <T>({
  collectionName,
  onSuccess,
  onError,
  onComplete
}: CreateQueryArgs): [
  (document: T) => Promise<void>,
  {
    data: DocumentReference<DocumentData> | undefined;
    error: boolean;
    isLoading: boolean;
  }
] => {
  const notificationDispatch = useNotificationDispatch();
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<
    DocumentReference<DocumentData> | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const mutation = useCallback(
    async (document: T) => {
      try {
        setIsLoading(true);
        setError(false);
        const createdDoc = await firestore
          .collection(collectionName)
          .add(document);
        setData(createdDoc);
        if (onSuccess) onSuccess();
      } catch (err) {
        console.error(err);
        setError(true);
        if (onError) onError();
      } finally {
        setIsLoading(false);
        if (onComplete) onComplete();
      }
    },
    [firestore, collectionName, onSuccess, onError, onComplete]
  );

  useEffect(() => {
    if (error) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content:
            'Failed to perform create action. Please try again after some time',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [error, notificationDispatch]);

  return [mutation, { data, error, isLoading }];
};

export default useFirestoreCreateQuery;
