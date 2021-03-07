import React, { Dispatch, useContext } from 'react';
import useSeedReducer from '../../reducers/SeedReducer';
import {
  ISeedState,
  ISeedAction
} from '../../reducers/SeedReducer/seedReducer.interface';

const SeedStateContext = React.createContext<ISeedState | undefined>(undefined);
const SeedDispatchContext = React.createContext<
  Dispatch<ISeedAction> | undefined
>(undefined);

type SeedProviderProps = {
  children: React.ReactNode;
};

const SeedProvider: React.FC<SeedProviderProps> = ({ children }) => {
  const [state, dispatch] = useSeedReducer();
  return (
    <SeedStateContext.Provider value={state}>
      <SeedDispatchContext.Provider value={dispatch}>
        {children}
      </SeedDispatchContext.Provider>
    </SeedStateContext.Provider>
  );
};

export default SeedProvider;

export const useSeedState = () => {
  const context = useContext(SeedStateContext);
  if (context === undefined) {
    throw new Error('useSeedState must be used within a SeedStateProvider');
  }
  return context;
};

export const useSeedDispatch = () => {
  const context = useContext(SeedDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useSeedDispatch must be used within a SeedDispatchProvider'
    );
  }
  return context;
};
