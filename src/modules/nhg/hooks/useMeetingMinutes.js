import React, { useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import { createMeeting, getAllMeetings, getNhgMembers } from "../api/nhgApi";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export const useMeetingMinutes = () => {
  const [, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    minutes: [],
    members: [],
    formData: {
      date: moment().format("YYYY-MM-DD"),
      place: "",
      participants: null,
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (meetingId) => {
    if (!meetingId) {
      console.error("Meeting ID is required to navigate to the agenda page");
      return;
    }
    console.log("Navigating with Meeting ID: ", meetingId); // Debug log
    navigate(`nhg/meeting/${meetingId}/agendas`);
  };

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => {
        message;
      },
      validators: {
        date: {
          message: "The :attribute must be a valid date.",
          rule: (val) => moment(val).isValid(),
          required: true,
        },
      },
    }),
  );

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setState((draft) => {
        // Ensure the date is a string in "YYYY-MM-DD" format
        draft.formData.date = moment(selectedDate).format("YYYY-MM-DD");
      });
    }
  };

  const handleFormChange = ({ target }) => {
    const { name, value } = target;
    setState((draft) => {
      draft.formData[name] =
        name === "date" ? moment(value).format("YYYY-MM-DD") : value;
    });
  };

  const getParticipants = async () => {
    try {
      const response = await getNhgMembers();
      const { success, data } = response.data;
      if (success) {
        const participants = data.map((member) => ({
          id: member.user.id,
          name: member.user.name,
        }));
        setState((draft) => {
          draft.members = participants;
        });
      } else {
        throw new Error("Failed to fetch participants");
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const fetchMeetingMinutes = async () => {
    try {
      const response = await getAllMeetings();
      const { success, message, data } = response.data;
      if (success) {
        setState((draft) => {
          draft.minutes = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const createMeetingHandler = async (meetingData) => {
    try {
      const response = await createMeeting(meetingData);
      const { success, message } = response.data;
      if (success) {
        navigate(location.pathname, { replace: true });
        await fetchMeetingMinutes();
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error Creating Meeting", error);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    console.log("Is form valid:", formValidator.current.allValid());
    if (formValidator.current.allValid()) {
      // Prepare the payload
      const payload = {
        date: state.formData.date,
        place: state.formData.place,
        participantsIds: state.formData.participants.map((p) => p.id),
      };
      console.log("Payload being sent to API:", payload);
      await createMeetingHandler(payload);
    } else {
      console.log(
        "Validation Errors:",
        formValidator.current.getErrorMessages(),
      );
      formValidator.current.showMessages();
      setForceUpdate((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getParticipants();
    fetchMeetingMinutes();
  }, []);

  return {
    handleCreate,
    state,
    handleFormChange,
    handleDateChange,
    formValidator,
    handleNavigate,
  };
};
