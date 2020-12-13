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
