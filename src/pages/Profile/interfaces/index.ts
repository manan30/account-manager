import { formFields } from '../utils/constants';

export type FormFields = typeof formFields[number]['name'];

export type FormValues = Record<FormFields, string>;
export type FormErrors = Record<FormFields, boolean>;
