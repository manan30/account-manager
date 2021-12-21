import {
  emailSignInFormFields,
  phoneSignInFormFields
} from '../utils/constants';

export type PhoneSignInFields = typeof phoneSignInFormFields[number]['name'];
export type EmailSignInFields = typeof emailSignInFormFields[number]['name'];

export type Fields = PhoneSignInFields | EmailSignInFields;
export type FormState = Record<Fields, string>;
export type FormErrors = Record<Fields, boolean>;
