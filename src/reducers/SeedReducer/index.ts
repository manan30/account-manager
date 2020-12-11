import { ISeedState } from './seedReducer.interface';

const SeedDefaultState: ISeedState = {
  delete: {
    everything: false,
    creditors: false
  },
  insert: {
    everything: false,
    creditors: false
  }
};
