import React from "react";
import { useImmer } from "use-immer";
import { useAppStateContext } from "../../../shared";
import { useParams } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { doSignUpApi } from "../apis";
import { enqueueSnackbar } from "notistack";
import {
  getCdsListApi,
  getWardListApi,
  setAuthDetailsServices,
} from "../../../utils";

export const usePageSignUp = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    formData: {
      name: "",
      ward: null,
      cds: null,
      email: "",
      password: "",
      confirmPassword: "",
    },
    cdsList: { options: [], loading: false },
    wardList: { options: [], loading: false },
    showPassword: false,
    showConfirmPassword: false,
  });
  const { setAppState } = useAppStateContext();
  const { accountType } = useParams();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
      validators: {
        matchPassword: {
          message: "Password and confirm password does not match",
          rule: ({ password, confirmPassword }) => {
            return (
              password !== "" &&
              confirmPassword !== "" &&
              password === confirmPassword
            );
          },
        },
      },
    }),
  );

  const doSignUp = async ({ registrationDetails }) => {
    try {
      const response = await doSignUpApi(registrationDetails, accountType);

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
      const { message } = error.response.data.data;
      enqueueSnackbar({ message, variant: "error" });
    }
  };

  const getCds = async () => {
    try {
      const response = await getCdsListApi();

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.cdsList.options = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      const { message } = error.response.data;
      enqueueSnackbar({ message, variant: "error" });
    }
  };

  const getWardList = async (cdsId) => {
    try {
      const response = await getWardListApi({ cdsId });

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.wardList.options = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      const { message } = error.response.data;
      enqueueSnackbar({ message, variant: "error" });
    }
  };

  const handleFormChange = async (event) => {
    const { name, value } = event.target;

    setState((draft) => {
      draft.formData[name] = value;
      if (name === "cds" && draft.formData.ward) {
        draft.formData.ward = null;
        draft.wardList.options = [];
      }
    });

    if (name === "cds" && value?.id) {
      await getWardList(value.id);
    }
  };

  const togglePassword = ({ field }) => {
    setState((draft) => {
      const key = "show" + field;
      draft[key] = !draft[key];
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      formValidator.current.allValid() &&
      accountType === "nhg" &&
      state.formData.ward &&
      state.formData.cds
    ) {
      const registrationDetails = {
        ...state.formData,
        wardId: state.formData.ward.id,
      };

      delete registrationDetails.ward;
      delete registrationDetails.cds;

      await doSignUp({ registrationDetails });
    } else if (
      formValidator.current.fieldValid("name") &&
      formValidator.current.fieldValid("email") &&
      formValidator.current.fieldValid("password") &&
      formValidator.current.fieldValid("confirmPassword") &&
      accountType === "cds"
    ) {
      const { name, email, password, confirmPassword } = state.formData;
      const registrationDetails = { name, email, password, confirmPassword };

      await doSignUp({ registrationDetails });
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  React.useEffect(() => {
    getCds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    handleFormChange,
    togglePassword,
    handleFormSubmit,
    formValidator,
  };
};
