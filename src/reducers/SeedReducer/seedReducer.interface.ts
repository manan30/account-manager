// type SeedStateItem = {
//   everything: boolean;
//   creditor: boolean;
// };

enum SeedTypes {
  everything = 'everything',
  creditors = 'creditors'
}

export interface ISeedState {
  delete: {
    [key in SeedTypes]: boolean;
  };
  insert: { [key in SeedTypes]: boolean };
}

export const CLEAR_EVERYTHING = 'CLEAR_EVERYTHING';
export const CLEAR_CREDITORS = 'CLEAR_CREDITORS';

export const ADD_EVERYTHING = 'ADD_EVERYTHING';
export const ADD_CREDITORS = 'ADD_CREDITORS';

export interface ISeedAction {
  type:
    | typeof CLEAR_EVERYTHING
    | typeof ADD_EVERYTHING
    | typeof CLEAR_CREDITORS
    | typeof ADD_CREDITORS;
  payload: { status: boolean };
}
