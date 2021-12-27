const currencyDropdownOptions = ['USD', 'CAD', 'INR'];

export const FormFields = [
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
