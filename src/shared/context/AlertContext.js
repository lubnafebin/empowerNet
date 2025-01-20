import React from 'react';

export const initialAlertState = {
  open: false,
  title: '',
  description: '',
  rowAction: null,
  dialogValue: '?alert',
};

export const AlertContext = React.createContext({
  alert: initialAlertState,
  setAlert: () => {},
});
