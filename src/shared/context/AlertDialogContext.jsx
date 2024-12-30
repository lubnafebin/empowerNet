import React from "react";

export const initialAlertState = {
  open: false,
  dialogValue: "?dialog",
  title: null,
};

export const AlertDialogContext = React.createContext({
  alert: initialAlertState,
  setAlert: () => {},
});
