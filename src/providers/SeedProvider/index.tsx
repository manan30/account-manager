import React, { Dispatch } from 'react';
import {
  ISeedState,
  ISeedDispatch
} from 'reducers/SeedReducer/seedReducer.interface';

const SeedStateContext = React.createContext<ISeedState | undefined>(undefined);
const SeedDispatchContext = React.createContext<
  Dispatch<ISeedDispatch> | undefined
>(undefined);

type SeedProviderProps = {
  children: React.ReactNode;
};

const SeedProvider: React.FC<SeedProviderProps> = ({ children }) => {
  return (
    <SeedStateContext.Provider>
      <SeedDispatchContext.Provider>{children}</SeedDispatchContext.Provider>
    </SeedStateContext.Provider>
  );
};

export default SeedProvider;
