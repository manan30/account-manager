import {
  NewCreditorFormFields,
  NewTransactionFormFields
} from '../utils/constants';

export type NewCreditorFormFields = typeof NewCreditorFormFields[number]['name'];

export type NewTransactionFormFields = typeof NewTransactionFormFields[number]['name'];
