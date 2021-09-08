// TODO: Find out how to use a type for the array
export const formFields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter Name',
    type: 'input',
    inputType: 'text'
  },
  {
    name: 'amount',
    label: 'Amount',
    placeholder: 'Enter Amount',
    type: 'input',
    inputType: 'tel'
  },
  {
    name: 'date',
    label: 'Recurring Date',
    placeholder: 'Enter Recurring Date',
    inputType: 'date',
    type: 'input'
  },
  {
    name: 'type',
    label: 'Transaction Type',
    placeholder: 'Select Transaction Type',
    type: 'select',
    inputType: 'text'
  },
  {
    name: 'endingDate',
    label: 'Ending Date',
    placeholder: 'Enter Ending Date',
    inputType: 'date',
    type: 'input'
  }
] as const;
