import { useCallback, useState } from 'react';
import { CollectionName } from '../../models/models';
import { useFirebaseContext } from '../../providers/FirebaseProvider';

type DeleteQueryArgs = {
  id: string;
  collectionName: CollectionName;
  onSuccess?: () => void;
  onError?: () => void;
  onComplete?: () => void;
};

const useFirestoreDeleteQuery = ({
  id,
  collectionName,
  onSuccess,
  onError,
  onComplete
}: DeleteQueryArgs) => {
  const { firestore } = useFirebaseContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const mutation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      await firestore.collection(collectionName).doc(id).delete();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError(true);
      if (onError) onError();
    } finally {
      setIsLoading(false);
      if (onComplete) onComplete();
    }
  }, [firestore, id, collectionName, onSuccess, onError, onComplete]);

  return { mutation, error, isLoading };
};

export default useFirestoreDeleteQuery;
