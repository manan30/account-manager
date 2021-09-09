import React, { Suspense, useMemo, useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import FloatingActionButton from '../../components/Button/FloatingActionButton';
import RecurringEntryModal from './RecurringEntryModal';
import ModalFallback from '../../components/ModalFallback';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import { Recurring as RecurringModel } from '../../models/Recurring';

const Recurring = () => {
  const [openRecurringEntryModal, setOpenRecurringEntryModal] = useState(false);
  const { data: recurringTransactions } = useFirestoreReadQuery<RecurringModel>(
    {
      collection: 'recurring'
    }
  );

  const { upcomingTransactions, completedTransactions } = useMemo(() => {
    const currentDate = Number(
      Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(new Date())
    );
    const upcomingTransactions: Array<RecurringModel> = [];
    const completedTransactions: Array<RecurringModel> = [];

    recurringTransactions?.forEach((transaction) => {
      const recurringDate = Number(
        Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
          transaction.recurringDate.toDate()
        )
      );
      if (recurringDate >= currentDate) upcomingTransactions.push(transaction);
      else completedTransactions.push(transaction);
    });
    return { upcomingTransactions, completedTransactions };
  }, [recurringTransactions]);

  return (
    <>
      <section className='my-6'>
        <h2 className='mb-6 text-xl font-semibold tracking-wide text-indigo-600'>
          Upcoming
        </h2>
        <pre>{JSON.stringify(upcomingTransactions.length, null, 2)}</pre>
        {/* <div>{recurringTransactions?.map((transaction) => )}</div> */}
      </section>
      <section className='my-6'>
        <h2 className='mb-6 text-xl font-semibold tracking-wide text-indigo-600'>
          Completed
        </h2>
        {JSON.stringify(completedTransactions.length, null, 2)}
      </section>
      <div className='fixed bottom-0 right-0 mb-8 mr-8'>
        <FloatingActionButton
          icon={<PlusIcon className='w-6 h-6 text-gray-100' />}
          onClickHandler={() => setOpenRecurringEntryModal(true)}
        />
      </div>
      {openRecurringEntryModal ? (
        <Suspense fallback={<ModalFallback />}>
          <RecurringEntryModal
            handleClose={() => setOpenRecurringEntryModal(false)}
          />
        </Suspense>
      ) : null}
    </>
  );
};

export default Recurring;
