import { useCallback, useState } from 'react';
import { CollectionName } from '../../models/models';
import { useFirebaseContext } from '../../providers/FirebaseProvider';

type DeleteQueryArgs = {
  id: string;
  collectionName: CollectionName;
  onComplete?: () => void;
};

const useFirestoreDeleteQuery = ({
  id,
  collectionName,
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
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
      if (onComplete) onComplete();
    }
  }, [firestore, id, collectionName, onComplete]);

  return { mutation, error, isLoading };
};

export default useFirestoreDeleteQuery;
