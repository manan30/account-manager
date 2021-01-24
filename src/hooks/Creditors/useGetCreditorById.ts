import { useCallback, useEffect, useState } from 'react';
import { ICreditor } from '../../models/Creditor';
import { ITransaction } from '../../models/Transaction';
import { useFirebaseContext } from '../../providers/FirebaseProvider';

type ErrorType = {
  status: boolean;
  message: string;
};

const useGetCreditorById = (id: string, fetchData: boolean) => {
  const { firestore } = useFirebaseContext();
  const [creditorData, setCreditorData] = useState<ICreditor | undefined>();
  const [transactionsData, setTransactionsData] = useState<
    ITransaction[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>({ status: false, message: '' });

  const fetchCreditorById = useCallback(async () => {
    try {
      setIsLoading(true);
      setError({ status: false, message: '' });
      const creditorDBRef = firestore?.collection('creditor').doc(id);
      const creditorQueryDoc = await creditorDBRef?.get();
      if (creditorQueryDoc?.exists) {
        const creditor = {
          id: creditorQueryDoc?.id,
          ...creditorQueryDoc.data()
        } as ICreditor;
        setCreditorData(creditor);
        const transactionDBRef = firestore?.collection('transaction');
        const transactionQueryDocs = await transactionDBRef
          ?.orderBy('createdAt', 'desc')
          ?.where('transactionEntity', '==', id)
          .get();
        const transactions = transactionQueryDocs?.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ITransaction)
        );
        setTransactionsData(transactions);
      } else {
        setError({ status: true, message: 'Creditor Not Found' });
      }
    } catch (err) {
      console.error(err);
      setError({ status: true, message: err });
    } finally {
      setIsLoading(false);
    }
  }, [firestore, id]);

  useEffect(() => {
    if (id && fetchData) fetchCreditorById();
  }, [fetchCreditorById, id, fetchData]);

  return { creditorData, transactionsData, error, isLoading };
};

export default useGetCreditorById;
