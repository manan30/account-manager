import app from 'firebase';

export interface IGlobalState {
  user?: app.User | null;
  unauthorizedUser: boolean;
}

export type GlobalStateActionType =
  | 'ADD_APP_USER'
  | 'SET_UNAUTHORIZED_USER'
  | 'LOGOUT_USER';

export interface IGlobalStateAction {
  type: GlobalStateActionType;
  payload?: Partial<IGlobalState>;
}
