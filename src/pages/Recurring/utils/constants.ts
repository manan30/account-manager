export const RecurringTransactionType = ['Debit', 'Credit'] as const;

export const RecurringTransactionCategory = [
  'Bills',
  'Rent',
  'Payment',
  'Income',
  'Subscriptions',
  'Other'
] as const;

export const RecurringTransactionFrequency = [
  'Bi-Weekly',
  'Bi-Monthly',
  'Monthly',
  'Custom'
] as const;

// TODO: Find out how to use a type for the array
export const FormFields = [
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
    name: 'endingDate',
    label: 'Ending Date',
    placeholder: 'Enter Ending Date',
    inputType: 'date',
    type: 'input'
  },
  {
    name: 'frequency',
    label: 'Frequency',
    placeholder: 'Select frequency',
    type: 'select',
    inputType: 'text',
    options: RecurringTransactionFrequency
  },
  {
    name: 'customFrequency',
    label: 'Custom Frequency',
    placeholder: '2d, 1m',
    inputType: 'text',
    type: 'input'
  },
  {
    name: 'category',
    label: 'Category',
    placeholder: 'Select Category',
    type: 'select',
    inputType: 'text',
    options: RecurringTransactionCategory
  },
  {
    name: 'type',
    label: 'Transaction Type',
    placeholder: 'Select Transaction Type',
    type: 'select',
    inputType: 'text',
    options: RecurringTransactionType
  }
] as const;
