import React from "react";
import { useImmer } from "use-immer";
import { useAppStateContext } from "../../../shared";
import SimpleReactValidator from "simple-react-validator";
import { doSignInApi } from "../apis";
import { setAuthDetailsServices } from "../../../utils";
import { enqueueSnackbar } from "notistack";

export const usePageSignIn = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    formData: {
      email: "",
      password: "",
    },
    showPassword: false,
  });
  const { setAppState } = useAppStateContext();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const doSignIn = async ({ loginDetails }) => {
    try {
      const response = await doSignInApi(loginDetails);

      const { success, message, data } = response;
      if (success) {
        setAuthDetailsServices(data);

        setAppState((draft) => {
          draft.authentication = data;
        });
        enqueueSnackbar({ message, variant: "success" });
      } else {
        enqueueSnackbar({ message, variant: "error" });
      }
    } catch (error) {
      const { data } = error.response.data;

      // if (data.error.fieldErrors?.length > 0) {
      // data.error.fieldErrors.forEach((err) => {

      // });

      // }

      enqueueSnackbar({ message: data.message, variant: "error" });
    }
  };

  const handleFormChange = async (event) => {
    const { name, value } = event.target;

    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const togglePassword = () => {
    setState((draft) => {
      draft.showPassword = !draft.showPassword;
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formValidator.current.allValid()) {
      await doSignIn({ loginDetails: state.formData });
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  return {
    state,
    handleFormChange,
    togglePassword,
    handleFormSubmit,
    formValidator,
  };
};
