import React, { useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import { getMeetingAgendas, updateMeetingAgenda } from "../api";

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
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const fetchMeetingAgendas = async (meetingId) => {
    try {
      const response = await getMeetingAgendas(meetingId);
      setState((draft) => {
        draft.agendas = response.data.map((item) => ({
          id: item.id,
          agenda: item.agenda,
          note: item.note,
        }));
      });
    } catch (error) {
      console.error("Failed to fetch meeting agendas:", error);
    }
  };

  const updateAgenda = async (agendaId, formData) => {
    try {
      // Call your API to update the agenda
      const response = await updateMeetingAgenda(agendaId, formData);
      if (response.success) {
        // Optionally update state if necessary
        fetchMeetingAgendas();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Failed to update agenda:", error);
    }
  };

  const handleUpdate = (agendaId) => {
    if (formValidator.current.allValid()) {
      updateAgenda(agendaId, state.formData);
    } else {
      formValidator.current.showMessages();
      setForceUpdate((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchMeetingAgendas();
  }, []);

  return {
    state,
    handleFormChange,
    formValidator,
    handleUpdate,
  };
};
