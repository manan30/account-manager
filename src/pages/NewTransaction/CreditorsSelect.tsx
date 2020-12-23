import React from 'react';
import Loader from '../../components/Loader';
import Select, { SelectOption } from '../../components/Select';
import useGetAllCreditors from '../../hooks/useGetAllCreditors';
import { useNewTransactionDispatchContext } from '../../providers/NewTransactionProvider';

const CreditorsSelect = () => {
  const { data: creditors, isLoading } = useGetAllCreditors();
  const dispatch = useNewTransactionDispatchContext();

  if (isLoading) return <Loader />;

  return creditors ? (
    <Select
      name='transaction-entity'
      label='Select a Creditor'
      placeHolder='Creditor Name'
      selectOptions={
        creditors.map(({ id, name }) => ({
          label: id,
          value: name
        })) as SelectOption[]
      }
      onSelectValueChange={(_, option) =>
        dispatch({
          type: 'ADD_TRANSACTION_ENTITY',
          payload: { entity: option.label }
        })
      }
    />
  ) : null;
};

export default CreditorsSelect;
