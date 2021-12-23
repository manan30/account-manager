import {
  emailSignInFormFields,
  phoneSignInFormFields
} from '../utils/constants';

export type PhoneSignInFields = typeof phoneSignInFormFields[number]['name'];
export type EmailSignInFields = typeof emailSignInFormFields[number]['name'];

export type FormState<FormType extends string> = Record<FormType, string>;
export type FormErrors<FormType extends string> = Record<FormType, boolean>;
