export const FormFields = [
  {
    name: 'storeName',
    label: 'Store Name',
    placeholder: 'Aldi, Target, etc',
    type: 'select',
    inputType: 'text'
  },
  {
    name: 'category',
    label: 'Category',
    placeholder: 'Select Category',
    type: 'select',
    inputType: 'text'
  },
  {
    name: 'amount',
    label: 'Amount',
    placeholder: '$ 0.00',
    type: 'input',
    inputType: 'tel'
  },
  {
    name: 'date',
    label: 'Date',
    placeholder: 'Enter Date',
    inputType: 'date',
    type: 'input'
  }
] as const;
