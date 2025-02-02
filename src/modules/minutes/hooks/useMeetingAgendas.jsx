import React from "react";
import { AlertRowAction, useAlertContext } from "../../../shared";
import { enqueueSnackbar } from "notistack";
import {
  deleteAgendaApi,
  getMeetingAgendaListApi,
  getAgendaDetailsApi,
  updateAgendaApi,
} from "../apis";
import SimpleReactValidator from "simple-react-validator";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { utilFunctions } from "../../../utils";

export const useMeetingAgendas = () => {
  const [, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    isFormLoading: true,
    isFormSubmitting: false,
    isTableLoading: true,
    agendaList: { options: [] },
    selectedAgendaId: null,
    formData: {
      name: "",
      agendaNo: "",
    },
  });
  const { meetingId } = useParams();
  const { setAlert } = useAlertContext();
  const location = useLocation();
  const navigate = useNavigate();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const getAgendaDetails = async (agendaId) => {
    triggerFormLoading(true);
    try {
      const response = await getAgendaDetailsApi(agendaId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.formData = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerFormLoading(false);
    }
  };

  const getAgendaList = async (meetingId) => {
    triggerTableLoading(true);
    try {
      const response = await getMeetingAgendaListApi(meetingId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.agendaList.options = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerTableLoading(false);
    }
  };

  const updateAgenda = async ({ formData, agendaId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await updateAgendaApi({ params: formData, agendaId });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getAgendaList();
        navigate(location.pathname, { replace: true });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerSubmitButtonLoading(false);
    }
  };

  const deleteAgenda = async (agendaId) => {
    triggerTableLoading(true);
    try {
      const response = await deleteAgendaApi({ agendaId });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getAgendaList();
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerTableLoading(false);
    }
  };

  const triggerFormLoading = (status) => {
    setState((draft) => {
      draft.isFormLoading = status;
    });
  };

  const triggerSubmitButtonLoading = (status) => {
    setState((draft) => {
      draft.isFormSubmitting = status;
    });
  };

  const triggerTableLoading = (status) => {
    setState((draft) => {
      draft.isTableLoading = status;
    });
  };

  const toggleModel = async ({ type, id }) => {
    switch (type) {
      case "agendaDetails":
        handleAgendaSelection(id);
        break;
      case "manageAds":
        break;
      case "deleteAgenda":
        setAlert((draft) => {
          draft.open = true;
          draft.dialogValue = "?delete";
          draft.title = "Delete Agenda";
          draft.description =
            "Are you sure? Do you want to delete the agenda. Once you delete the agenda there is no going back.";
          draft.rowAction = (
            <AlertRowAction
              onClick={async () => await deleteAgenda(id)}
              label="Delete"
            />
          );
        });
        break;
      default:
        break;
    }
  };

  const handleAgendaSelection = async (id) => {
    navigate("?agenda");
    setState((draft) => {
      draft.selectedAgendaId = id;
    });
    await getAgendaDetails(id);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formValidator.current.allValid()) {
      switch (location.search) {
        case "?agenda":
          await updateAgenda({
            formData: {
              name: state.formData.name,
              agendaNo: state.formData.agendaNo,
            },
            agendaId: state.selectedAgendaId,
          });
          break;
        default:
          break;
      }
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  // Reset form data
  React.useEffect(() => {
    if (
      location.search === "" &&
      (state.formData.name !== "" ||
        state.formData.agendaNo !== "" ||
        formValidator.current.errorMessages)
    ) {
      formValidator.current.hideMessages();
      setState((draft) => {
        draft.formData = { name: "", agendaNo: "" };
        draft.selectedAgendaId = null;
      });
      setForceUpdate(0);
    }
  }, [location.search]);

  React.useEffect(() => {
    getAgendaList(meetingId);
  }, []);

  return {
    state,
    formValidator,
    handleFormSubmit,
    toggleModel,
    handleFormChange,
  };
};
