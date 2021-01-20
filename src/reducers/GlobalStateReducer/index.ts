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
      return { ...state, user: action.payload } as IGlobalState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(globalStateReducer, defaultGlobalState);
