import * as TransactionFunctions from './Transaction';
import * as CreditorFunctions from './Creditor';
import * as SpendingFunctions from './Spending';
import { addNewStore } from './HttpFunctions/addNewStore';
import { addNewSpendingCategory } from './HttpFunctions/addNewSpendingCategory';

export {
  TransactionFunctions,
  CreditorFunctions,
  SpendingFunctions,
  addNewStore,
  addNewSpendingCategory
};
