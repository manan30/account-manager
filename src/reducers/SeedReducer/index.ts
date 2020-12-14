import { useReducer } from 'react';
import { ISeedAction, ISeedState } from './seedReducer.interface';

const seedDefaultState: ISeedState = {
  seedOptions: {
    everything: false,
    creditors: false
  }
};

const seedReducer = (state: ISeedState, action: ISeedAction) => {
  switch (action.type) {
    case 'ADD_EVERYTHING':
      return {
        ...state,
        seedOptions: Object.keys(state.seedOptions).reduce((acc, curr) => {
          if (
            curr === 'everything' ||
            curr === 'creditors' ||
            curr === 'transactions'
          )
            acc[curr] = action?.payload?.status;
          return acc;
        }, {} as ISeedState['seedOptions'])
      } as ISeedState;
    case 'ADD_CREDITORS':
      return {
        ...state,
        seedOptions: {
          ...state.seedOptions,
          creditors: action?.payload?.status,
          everything:
            action?.payload?.status &&
            Object.entries(state.seedOptions)
              .filter(([key]) => key !== 'everything' && key !== 'creditors')
              .every((value) => value[1] === true)
              ? true
              : false
        }
      } as ISeedState;
    case 'ADD_TRANSACTIONS':
      return {
        ...state,
        seedOptions: {
          ...state.seedOptions,
          transactions: action?.payload?.status,
          everything:
            action?.payload?.status &&
            Object.entries(state.seedOptions)
              .filter(([key]) => key !== 'everything' && key !== 'transactions')
              .every((value) => value[1] === true)
              ? true
              : false
        }
      } as ISeedState;
    case 'RESET':
      return { ...seedDefaultState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(seedReducer, seedDefaultState);
