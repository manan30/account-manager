import { useReducer } from 'react';
import { ISeedAction, ISeedState } from './seedReducer.interface';

const seedDefaultState: ISeedState = {
  deleteOptions: {
    everything: false,
    creditors: false,
    transactions: false
  },
  insertOptions: {
    everything: false,
    creditors: false,
    transactions: false
  }
};

const seedReducer = (state: ISeedState, action: ISeedAction) => {
  switch (action.type) {
    case 'CLEAR_EVERYTHING':
      return {
        ...state,
        deleteOptions: Object.keys(state.deleteOptions).reduce((acc, curr) => {
          if (
            curr === 'everything' ||
            curr === 'creditors' ||
            curr === 'transactions'
          )
            acc[curr] = action.payload.status;
          return acc;
        }, {} as ISeedState['deleteOptions'])
      } as ISeedState;
    case 'CLEAR_CREDITORS':
      return {
        ...state,
        deleteOptions: {
          ...state.deleteOptions,
          creditors: action.payload.status,
          everything:
            action.payload.status &&
            Object.entries(state.deleteOptions)
              .filter(([key]) => key !== 'everything' && key !== 'creditors')
              .every((value) => value[1] === true)
              ? true
              : false
        }
      } as ISeedState;
    case 'CLEAR_TRANSACTIONS':
      return {
        ...state,
        deleteOptions: {
          ...state.deleteOptions,
          transactions: action.payload.status,
          everything:
            action.payload.status &&
            Object.entries(state.deleteOptions)
              .filter(([key]) => key !== 'everything' && key !== 'transactions')
              .every((value) => value[1] === true)
              ? true
              : false
        }
      } as ISeedState;
    case 'ADD_EVERYTHING':
      return {
        ...state,
        insertOptions: Object.keys(state.insertOptions).reduce((acc, curr) => {
          if (
            curr === 'everything' ||
            curr === 'creditors' ||
            curr === 'transactions'
          )
            acc[curr] = action.payload.status;
          return acc;
        }, {} as ISeedState['insertOptions'])
      } as ISeedState;
    case 'ADD_CREDITORS':
      return {
        ...state,
        insertOptions: {
          ...state.insertOptions,
          creditors: action.payload.status,
          everything:
            action.payload.status &&
            Object.entries(state.insertOptions)
              .filter(([key]) => key !== 'everything' && key !== 'creditors')
              .every((value) => value[1] === true)
              ? true
              : false
        }
      } as ISeedState;
    case 'ADD_TRANSACTIONS':
      return {
        ...state,
        insertOptions: {
          ...state.insertOptions,
          transactions: action.payload.status,
          everything:
            action.payload.status &&
            Object.entries(state.insertOptions)
              .filter(([key]) => key !== 'everything' && key !== 'transactions')
              .every((value) => value[1] === true)
              ? true
              : false
        }
      } as ISeedState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(seedReducer, seedDefaultState);
