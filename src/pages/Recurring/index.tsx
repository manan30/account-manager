import React, { Suspense, useMemo, useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import FloatingActionButton from '../../components/Button/FloatingActionButton';
import RecurringEntryModal from './components/RecurringEntryModal';
import ModalFallback from '../../components/ModalFallback';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import { Recurring as RecurringModel } from './interfaces/recurring.model';
import Card from '../../components/Card';
import { RecurringTransactionCategory } from './utils/constants';
import RecurringTransactionGroup from './components/RecurringTransactionGroup';
import { useGlobalState } from '../../providers/GlobalStateProvider';

const Recurring = () => {
  const { user } = useGlobalState();
  // TODO: Update query to fetch only correct transactions for that month
  const { data: recurringTransactions } = useFirestoreReadQuery<RecurringModel>(
    {
      collection: 'recurring',
      orderByClauses: [['recurringDate', 'asc']],
      whereClauses: [
        ['completed', '==', false],
        ['uid', '==', user?.uid]
      ]
    }
  );

  const [openRecurringEntryModal, setOpenRecurringEntryModal] = useState(false);

  const { groupedTransactions, monthlyExpenditure } = useMemo(() => {
    let monthlyExpenditure = 0;
    const groupedTransactions: Record<
      typeof RecurringTransactionCategory[number],
      Array<RecurringModel>
    > = {} as Record<
      typeof RecurringTransactionCategory[number],
      Array<RecurringModel>
    >;

    recurringTransactions?.forEach((transaction) => {
      if (!groupedTransactions[transaction.category])
        groupedTransactions[transaction.category] = [transaction];
      else groupedTransactions[transaction.category].push(transaction);
      monthlyExpenditure += transaction.amount;
    });

    return { groupedTransactions, monthlyExpenditure };
  }, [recurringTransactions]);

  return (
    <>
      <div className='my-6'>
        <Card>
          <div className='text-xl font-semibold text-indigo-600'>
            Total Monthly Expenditure: ${monthlyExpenditure}
          </div>
        </Card>
      </div>
      <div className='flex flex-col space-y-6'>
        {Object.entries(groupedTransactions).map(([key, value]) => (
          <RecurringTransactionGroup
            key={key}
            category={key as typeof RecurringTransactionCategory[number]}
            transactions={value}
          />
        ))}
      </div>
      <div className='fixed bottom-0 right-0 mb-8 mr-8'>
        <FloatingActionButton
          icon={<PlusIcon className='w-6 h-6 text-gray-100' />}
          onClickHandler={() => setOpenRecurringEntryModal(true)}
        />
      </div>
      {openRecurringEntryModal ? (
        <Suspense fallback={<ModalFallback />}>
          <RecurringEntryModal
            uid={user?.uid ?? ''}
            handleClose={() => setOpenRecurringEntryModal(false)}
          />
        </Suspense>
      ) : null}
    </>
  );
};

export default Recurring;
