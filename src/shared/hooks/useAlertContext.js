import React from 'react';
import { AlertContext } from '../context';

/**
 * A hook to access the AlertContext.
 *
 * @returns The AlertContext
 * @throws An error if the hook is not used within an AlertProvider
 */
export const useAlertContext = () => {
  const context = React.useContext(AlertContext);

  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }

  return context;
};
