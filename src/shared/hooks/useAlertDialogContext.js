import { AlertDialogContext } from "../context";
import React from "react";

export const useAlertDialogContext = () => {
  const alertContext = React.useContext(AlertDialogContext);
  if (!alertContext)
    throw Error("Alert context not available outside the context!!");

  return alertContext;
};
