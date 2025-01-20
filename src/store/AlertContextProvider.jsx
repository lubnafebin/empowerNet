import PropsTypes from 'prop-types';
import { AlertContext, initialAlertState } from '../shared';
import { useImmer } from 'use-immer';

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useImmer(initialAlertState);

  // Provide the alert state and setter function
  const value = { alert, setAlert };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

AlertContextProvider.propTypes = {
  children: PropsTypes.node,
};
