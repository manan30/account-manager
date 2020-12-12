import { useReducer } from 'react';
import {
  ISeedAction,
  ISeedState,
  CLEAR_EVERYTHING,
  CLEAR_CREDITORS
} from './seedReducer.interface';

const seedDefaultState: ISeedState = {
  delete: {
    everything: false,
    creditors: false
  },
  insert: {
    everything: false,
    creditors: false
  }
};

const seedReducer = (state: ISeedState, action: ISeedAction) => {
  switch (action.type) {
    case CLEAR_EVERYTHING:
      return {
        ...state,
        delete: { ...state.delete, everything: true }
      } as ISeedState;
    case CLEAR_CREDITORS:
      return {
        ...state,
        delete: { ...state.delete, creditors: true, everything: false }
      } as ISeedState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(seedReducer, seedDefaultState);
