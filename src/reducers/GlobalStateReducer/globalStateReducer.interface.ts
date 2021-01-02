import app from 'firebase';

export interface IGlobalState {
  user?: app.User | null;
}

export type GlobalStateActionType = 'ADD_APP_USER';

export interface IGlobalStateAction {
  type: GlobalStateActionType;
  payload: { user?: app.User | null };
}