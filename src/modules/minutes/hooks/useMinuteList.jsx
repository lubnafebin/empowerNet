/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import {
  createMinuteApi,
  deleteMinuteApi,
  getMinuteListApi,
  getMinuteDetailsApi,
  updateMinuteApi,
} from "../apis";
import { enqueueSnackbar } from "notistack";
import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { AlertRowAction, useAlertContext } from "../../../shared";
import dayjs from "dayjs";
import {
  getAllNhgMembersApi,
  useUtilFunctions,
  utilFunctions,
} from "../../../utils";

export const useMinuteList = () => {
  const [_, setForceUpdate] = React.useState(0);
  const { getLoggedInUser } = useUtilFunctions();
  const loggedUser = getLoggedInUser();

  const [state, setState] = useImmer({
    isFormLoading: true,
    isFormSubmitting: false,
    minuteList: { options: [], loading: true },
    membersList: { options: [], loading: false },
    selectedMinuteId: null,
    formData: {
      date: dayjs(),
      place: "",
      participantsIds: [],
    },
  });
  const { setAlert } = useAlertContext();
  const location = useLocation();
  const navigate = useNavigate();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const getMinuteDetails = async (wardId) => {
    triggerFormLoading(true);
    try {
      const response = await getMinuteDetailsApi(wardId);

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

  const getMinuteList = async () => {
    triggerTableLoading(true);
    try {
      const response = await getMinuteListApi();

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.minuteList.options = data;
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

  const getAllNhgMembers = async (nhgId) => {
    triggerTableLoading(true);
    try {
      const response = await getAllNhgMembersApi(nhgId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.membersList.options = data;
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

  const createNewMinute = async (formData) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await createMinuteApi(formData);

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getMinuteList();
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

  const updateMinute = async ({ formData, wardId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await updateMinuteApi({ params: formData, wardId });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getMinuteList();
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

  const deleteMinute = async (wardId) => {
    triggerTableLoading(true);
    try {
      const response = await deleteMinuteApi({ wardId });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getMinuteList();
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
      draft.minuteList.loading = status;
    });
  };

  const toggleModel = async ({ type, id }) => {
    switch (type) {
      case "wardDetails":
        handleMinuteSelection(id);
        break;
      case "manageAds":
        break;
      case "deleteMinute":
        setAlert((draft) => {
          draft.open = true;
          draft.dialogValue = "?delete";
          draft.title = "Delete Minute";
          draft.description =
            "Are you sure? Do you want to delete the ward. Once you delete the ward there is no going back.";
          draft.rowAction = (
            <AlertRowAction
              onClick={async () => await deleteMinute(id)}
              label="Delete"
            />
          );
        });
        break;
      default:
        navigate("?new-minute");
        loggedUser?.nhgId && (await getAllNhgMembers(loggedUser.nhgId));
        break;
    }
  };

  const handleMinuteSelection = async (id) => {
    navigate("?ward");
    setState((draft) => {
      draft.selectedMinuteId = id;
    });
    await getMinuteDetails(id);
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
        case "?new-minute": {
          const params = {
            place: state.formData.place,
            date: dayjs(state.formData.date).format("YYYY-MM-DD"),
            participantsIds: state.formData.participantsIds.map(
              (participant) => participant.id,
            ),
          };
          await createNewMinute(params);
          break;
        }
        case "?ward":
          await updateMinute({
            formData: {
              name: state.formData.name,
              wardNo: state.formData.wardNo,
            },
            wardId: state.selectedMinuteId,
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
        state.formData.wardNo !== "" ||
        formValidator.current.errorMessages)
    ) {
      formValidator.current.hideMessages();
      setState((draft) => {
        draft.formData.date = dayjs();
        draft.formData.participantsIds = [];
        draft.formData.place = "";
      });
      setForceUpdate(0);
    }
  }, [location.search]);

  React.useEffect(() => {
    getMinuteList();
  }, []);

  return {
    state,
    formValidator,
    handleFormSubmit,
    toggleModel,
    handleFormChange,
  };
};
