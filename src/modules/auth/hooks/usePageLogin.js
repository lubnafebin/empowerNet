import { useImmer } from "use-immer";
import { login } from "../apis/authApis";
import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { useNavigate } from "react-router-dom";

export const usePageLogin = () => {
  const [_, setForceUpdate] = React.useState(0);

  const [state, setState] = useImmer({
    showPassword: false,
    formdata: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const doLogIn = async (credentials) => {
    try {
      const response = await login(credentials);
      const { success, message, data } = response.data;
      if (success) {
        localStorage.setItem("authDetails", JSON.stringify(data));
        if (data.cdsId) {
          navigate("/cds/wards");
        } else if (data.nhgId) {
          navigate("/nhg/roles");
        }
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordToggle = (name) => {
    setState((draft) => {
      draft[name] = !draft[name];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidator.current.allValid()) {
      console.log(state.formdata);
      const { email, password } = state.formdata;
      await doLogIn({ email, password });
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setState((draft) => {
      draft.formdata[name] = value;
    });
  };
  return {
    handlePasswordToggle,
    formValidator,
    state,
    handleSubmit,
    handleFormChange,
  };
};
