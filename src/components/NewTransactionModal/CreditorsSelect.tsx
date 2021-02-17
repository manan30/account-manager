import React from 'react';
import Loader from '../Loader';
import Select, { SelectOption } from '../Select';
import useGetAllCreditors from '../../hooks/Creditors/useGetAllCreditors';
import { useNewTransactionDispatchContext } from '../../providers/NewTransactionProvider';
import { INPUT_THEME_ERROR } from '../../utils/Constants/ThemeConstants';

type CreditorsSelectProps = {
  resetFormError: (name: string) => void;
  formError: { error: boolean; content: string };
  resetForm: boolean;
};

const CreditorsSelect: React.FC<CreditorsSelectProps> = ({
  resetFormError,
  formError,
  resetForm
}) => {
  const { data: creditors, isLoading } = useGetAllCreditors();
  const dispatch = useNewTransactionDispatchContext();

  if (isLoading) return <Loader />;

  return creditors ? (
    <Select
      name='entity'
      label='Select a Creditor'
      placeHolder='Creditor Name'
      subContent={formError.error && formError.content}
      theme={formError.error ? INPUT_THEME_ERROR : ''}
      resetField={resetForm}
      resetFormErrors={resetFormError}
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
