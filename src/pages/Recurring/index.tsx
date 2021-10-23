import React, { Suspense, useMemo, useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import FloatingActionButton from '../../components/Button/FloatingActionButton';
import RecurringEntryModal from './RecurringEntryModal';
import ModalFallback from '../../components/ModalFallback';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import { Recurring as RecurringModel } from './interfaces/Recurring';
import RecurringItem from './RecurringItem';
import Card from '../../components/Card';

const Recurring = () => {
  const [openRecurringEntryModal, setOpenRecurringEntryModal] = useState(false);
  // TODO: Update query to fetch only correct transactions for that month
  const { data: recurringTransactions } = useFirestoreReadQuery<RecurringModel>(
    {
      collection: 'recurring',
      orderByClauses: [['recurringDate', 'asc']],
      whereClauses: [['completed', '==', false]]
    }
  );

  const {
    upcomingTransactions,
    completedTransactions,
    monthlyExpenditure
  } = useMemo(() => {
    const currentDate = new Date().getUTCDate();
    const upcomingTransactions: Array<RecurringModel> = [];
    const completedTransactions: Array<RecurringModel> = [];
    let monthlyExpenditure = 0;

    recurringTransactions?.forEach((transaction) => {
      const recurringDate = transaction.recurringDate.toDate().getUTCDate();
      if (recurringDate >= currentDate) upcomingTransactions.push(transaction);
      else completedTransactions.push(transaction);
      monthlyExpenditure += transaction.amount;
    });

    return { upcomingTransactions, completedTransactions, monthlyExpenditure };
  }, [recurringTransactions]);

  return (
    <>
      <div className='mt-6'>
        <Card>
          <div className='text-xl font-semibold text-indigo-600'>
            Total Monthly Expenditure: ${monthlyExpenditure}
          </div>
        </Card>
      </div>
      <section className='mt-6 mb-12'>
        {/* TODO: Show by category and dim completed transactions  */}
        <h2 className='mb-6 text-lg font-semibold tracking-wide text-indigo-600'>
          Upcoming
        </h2>
        <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {upcomingTransactions.map((transaction) => (
            <RecurringItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </section>
      <section className='my-6'>
        <h2 className='mb-6 text-lg font-semibold tracking-wide text-indigo-600'>
          Completed
        </h2>
        <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {completedTransactions.map((transaction) => (
            <RecurringItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
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
