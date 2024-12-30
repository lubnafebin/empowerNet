import { AlertDialogContext, initialAlertState } from "../context";
import { useImmer } from "use-immer";
import PropTypes from "prop-types";

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useImmer(initialAlertState);
  return (
    <AlertDialogContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

AlertContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
