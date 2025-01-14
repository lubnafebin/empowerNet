import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import { getMeetingAgendas } from "../api";

export const useMeetingAgendas = () => {
  const [, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    agendas: [],
    formData: {
      name: "",
      note: "",
    },
  });
  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => {
        message;
      },
    }),
  );
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  const fetchMeetingAgendas = async () => {
    try {
      const agendas = await getMeetingAgendas();
      setState((draft) => {
        draft.agendas = agendas;
      });
    } catch (error) {
      console.error("Failed to fetch meeting agendas:", error);
    }
  };

  React.useEffect(() => {
    fetchMeetingAgendas();
  }, []);

  return {
    state,
    handleFormChange,
    formValidator,
  };
};
