export enum SeedTypes {
  everything = 'everything',
  creditors = 'creditors',
  transactions = 'transactions'
}

export interface ISeedState {
  deleteOptions: {
    [key in SeedTypes]: boolean;
  };
  insertOptions: { [key in SeedTypes]: boolean };
}

// export const CLEAR_EVERYTHING = 'CLEAR_EVERYTHING';
// export const CLEAR_CREDITORS = 'CLEAR_CREDITORS';
// export const CLEAR_TRANSACTIONS = 'CLEAR_TRANSACTIONS';

// export const ADD_EVERYTHING = 'ADD_EVERYTHING';
// export const ADD_CREDITORS = 'ADD_CREDITORS';
// export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';

export type SeedActionType =
  | 'CLEAR_EVERYTHING'
  | 'CLEAR_CREDITORS'
  | 'CLEAR_TRANSACTIONS'
  | 'ADD_EVERYTHING'
  | 'ADD_CREDITORS'
  | 'ADD_TRANSACTIONS';

export interface ISeedAction {
  // type:
  //   | typeof CLEAR_EVERYTHING
  //   | typeof ADD_EVERYTHING
  //   | typeof CLEAR_CREDITORS
  //   | typeof ADD_CREDITORS
  //   | typeof CLEAR_TRANSACTIONS
  //   | typeof ADD_TRANSACTIONS;
  type: SeedActionType;
  payload: { status: boolean };
}
