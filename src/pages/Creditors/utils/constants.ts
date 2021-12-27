const currencyDropdownOptions = ['USD', 'CAD', 'INR'];
const transactionTypeDropdownOptions = ['Credit', 'Debit'];

export const NewCreditorFormFields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Name of person or entity',
    type: 'input',
    inputType: 'text'
  },
  {
    name: 'amount',
    label: 'Amount',
    placeholder: '$0.00',
    type: 'input',
    inputType: 'tel'
  },
  {
    name: 'currency',
    label: 'Currency',
    placeholder: 'USD, INR, etc',
    type: 'select',
    inputType: 'text',
    options: currencyDropdownOptions
  }
] as const;

export const NewTransactionFormFields = [
  {
    name: 'type',
    label: 'Transaction Type',
    placeholder: 'Eg. Credit, Debit',
    type: 'select',
    inputType: 'text',
    options: transactionTypeDropdownOptions
  },
  {
    name: 'entity',
    label: 'Creditor Name',
    placeholder: 'Creditor Name',
    type: 'input',
    inputType: 'text'
  },
  {
    name: 'amount',
    label: 'Amount',
    placeholder: '$0.00',
    type: 'input',
    inputType: 'tel'
  },
  {
    name: 'date',
    label: 'Transaction Date',
    placeholder: 'Enter Transaction Date',
    inputType: 'date',
    type: 'input'
  }
] as const;
