import { useReducer } from 'react';
import {
  ISeedAction,
  ISeedState,
  CLEAR_EVERYTHING,
  CLEAR_CREDITORS
} from './seedReducer.interface';

const seedDefaultState: ISeedState = {
  deleteOptions: {
    everything: false,
    creditors: false
  },
  insertOptions: {
    everything: false,
    creditors: false
  }
};

const seedReducer = (state: ISeedState, action: ISeedAction) => {
  switch (action.type) {
    case CLEAR_EVERYTHING:
      return {
        ...state,
        deleteOptions: Object.keys(state.deleteOptions).reduce((acc, curr) => {
          if (curr === 'everything' || curr === 'creditors') acc[curr] = true;
          return acc;
        }, {} as ISeedState['deleteOptions'])
      } as ISeedState;
    case CLEAR_CREDITORS:
      return {
        ...state,
        deleteOptions: {
          ...state.deleteOptions,
          creditors: true,
          everything: false
        }
      } as ISeedState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(seedReducer, seedDefaultState);
