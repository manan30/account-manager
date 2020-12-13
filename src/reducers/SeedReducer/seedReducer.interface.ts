export enum SeedOptions {
  everything = 'everything',
  creditors = 'creditors',
  transactions = 'transactions'
}

export interface ISeedState {
  deleteOptions: {
    [key in SeedOptions]: boolean;
  };
  insertOptions: { [key in SeedOptions]: boolean };
}

export type SeedActionType =
  | 'CLEAR_EVERYTHING'
  | 'CLEAR_CREDITORS'
  | 'CLEAR_TRANSACTIONS'
  | 'ADD_EVERYTHING'
  | 'ADD_CREDITORS'
  | 'ADD_TRANSACTIONS';

export interface ISeedAction {
  type: SeedActionType;
  payload: { status: boolean };
}
