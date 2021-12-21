import { FormFields } from '../utils/constants';

export type Fields = typeof FormFields[number]['name'];
export type FormState = Record<Fields, string>;
export type FormErrors = Record<Fields, boolean>;
