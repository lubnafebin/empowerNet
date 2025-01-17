import React from 'react';
import { AppStateContext } from '../context';

export const useAppStateContext = () => {
  const context = React.useContext(AppStateContext);

  if (!context) {
    throw new Error(
      'useAppStateContext must be used within an AppStateContextProvider',
    );
  }
  return context;
};
