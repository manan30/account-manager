export enum SeedOptions {
  everything = 'everything',
  creditors = 'creditors',
  transactions = 'transactions'
}

export interface ISeedState {
  seedOptions: { [key in SeedOptions]?: boolean };
}

export type SeedActionType =
  | 'ADD_EVERYTHING'
  | 'ADD_CREDITORS'
  | 'ADD_TRANSACTIONS';

export interface ISeedAction {
  type: SeedActionType;
  payload: { status: boolean };
}
