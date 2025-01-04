import React from "react";
import { useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import { signup } from "../apis/authApis";

export const usePageSignUp = (loginType) => {
  const [_, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    showConfirmPassword: false,
    showPassword: false,
    formData: {
      name: "",
      email: "",
      ward: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const cdsFormValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      validators: {
        confirmPassword: {
          message: "Passwords do not match",
          rule: ({ password, confirmPassword }) => {
            return password === confirmPassword;
          },
        },
      },
    }),
  );

  const nhgFormValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      validators: {
        confirmPassword: {
          message: "Passwords do not match",
          rule: ({ password, confirmPassword }) => {
            return password === confirmPassword;
          },
        },
      },
    }),
  );
  // ==================================================API SECTIONS =====================================
  const doSignIn = async (userData, type) => {
    console.log("doSignIn called with:", userData, type);
    try {
      const response = await signup(userData, type);
      console.log("API response:", response.data);
      const { success, message, data } = response.data;
      if (success) {
        console.log("Signup successful. Message:", message);
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/");
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.log(error);
    }
  };
  //=============================================== UTIL FUNCTIONS=====================================
  const handlePasswordToggle = (name) => {
    setState((draft) => {
      draft[name] = !draft[name];
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log("Current form data:", state.formData);
    const formValidator =
      loginType === "cds" ? cdsFormValidator : nhgFormValidator;
    if (formValidator.current.allValid()) {
      // call signup api
      console.log("Validation passed. Preparing to submit...");
      const payload = { ...state.formData, type: loginType };
      console.log("Payload to submit:", payload);
      await doSignIn(payload, loginType);
    } else {
      console.log("Validation failed.");
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  return {
    cdsFormValidator,
    nhgFormValidator,
    state,
    handleSignUp,
    handleFormChange,
    handlePasswordToggle,
  };
};
