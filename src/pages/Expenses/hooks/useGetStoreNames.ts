import { useMemo } from 'react';
import useFirestoreReadQuery from '../../../hooks/Firestore/useFirestoreReadQuery';
import { IStore } from '../../../models/Store';

export const useGetStoreNames = () => {
  const { data: storeNamesData } = useFirestoreReadQuery<IStore>({
    collection: 'stores'
  });

  const storeNameDropdownOptions: Array<string> = useMemo(() => {
    if (storeNamesData && storeNamesData.length > 0)
      return storeNamesData.map(({ name }) => name);
    return [];
  }, [storeNamesData]);

  return storeNameDropdownOptions;
};
