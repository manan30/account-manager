import { useReducer } from 'react';
import {
  IGlobalState,
  IGlobalStateAction
} from './globalStateReducer.interface';

const defaultGlobalState: IGlobalState = {
  user: null,
  unauthorizedUser: false
};

const globalStateReducer = (
  state: IGlobalState,
  action: IGlobalStateAction
) => {
  switch (action.type) {
    case 'ADD_APP_USER':
      return {
        ...state,
        ...action.payload,
        unauthorizedUser: false
      } as IGlobalState;
    case 'SET_UNAUTHORIZED_USER':
      return { ...state, unauthorizedUser: true } as IGlobalState;
    case 'LOGOUT_USER':
      return { ...defaultGlobalState } as IGlobalState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(globalStateReducer, defaultGlobalState);
