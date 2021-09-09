import React, { Suspense, useState } from 'react';
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

  return (
    <>
      <pre>{JSON.stringify(recurringTransactions, null, 2)}</pre>
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
