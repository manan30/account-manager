export const phoneSignInFormFields = [
  {
    name: 'countryCode',
    label: 'Country Code',
    placeholder: 'Country Code',
    type: 'text'
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    placeholder: 'Phone Number',
    type: 'tel'
  }
] as const;

export const emailSignInFormFields = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password'
  }
] as const;
