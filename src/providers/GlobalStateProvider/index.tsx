import React, { useContext } from 'react';
import useGlobalStateReducer from '../../reducers/GlobalStateReducer';
import {
  IGlobalState,
  IGlobalStateAction
} from 'reducers/GlobalStateReducer/globalStateReducer.interface';

const GlobalStateContext = React.createContext<IGlobalState | undefined>(
  undefined
);
const GlobalDispatchContext = React.createContext<
  React.Dispatch<IGlobalStateAction> | undefined
>(undefined);

// TODO: Create common interface for all providers
type GlobalStateProviderProps = { children: React.ReactNode };

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useGlobalStateReducer();

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export const useGlobalDispatch = () => {
  const context = useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalDispatch must be used within a GlobalDispatchProvider'
    );
  }
  return context;
};
