import { CollectionName } from '../../models/models';
import { useCallback, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { DocumentData, DocumentReference } from '@firebase/firestore-types';

type UpdateQueryArgs = {
  collectionName: CollectionName;
  onComplete?: () => void;
};

const useFirestoreUpdateQuery = <T>({
  collectionName,
  onComplete
}: UpdateQueryArgs): [
  (id: string, document: Partial<T>) => Promise<void>,
  {
    updated: boolean;
    error: boolean;
    isLoading: boolean;
  }
] => {
  const { firestore } = useFirebaseContext();
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // TODO: Show notification directly from here on error (CRUD)
  const [error, setError] = useState(false);

  const mutation = useCallback(
    async (id: string, document: Partial<T>) => {
      try {
        setIsLoading(true);
        setError(false);
        await firestore.collection(collectionName).doc(id).update(document);
        setUpdated(true);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
        if (onComplete) onComplete();
      }
    },
    [firestore, collectionName, onComplete]
  );

  return [mutation, { updated, error, isLoading }];
};

export default useFirestoreUpdateQuery;
