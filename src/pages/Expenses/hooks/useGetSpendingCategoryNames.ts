import { useMemo } from 'react';
import useFirestoreReadQuery from '../../../hooks/Firestore/useFirestoreReadQuery';
import { ISpendingCategory } from '../../../models/SpendingCategory';

export const useGetSpendingCategoryNames = () => {
  const { data: spendingCategoryNamesData } = useFirestoreReadQuery<
    ISpendingCategory
  >({
    collection: 'spending-categories'
  });

  const spendingCategoryNameDropdownOptions: Array<string> = useMemo(() => {
    if (spendingCategoryNamesData && spendingCategoryNamesData.length > 0) {
      return spendingCategoryNamesData.map(({ name }) => name);
    }
    return [];
  }, [spendingCategoryNamesData]);

  return spendingCategoryNameDropdownOptions;
};
