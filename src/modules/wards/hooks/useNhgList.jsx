import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import {
  createWardApi,
  deleteWardApi,
  getWardDetailsApi,
  getWardNhgListApi,
  updateWardApi,
} from "../apis";
import { enqueueSnackbar } from "notistack";
import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { AlertRowAction, useAlertContext } from "../../../shared";
import { utilFunctions } from "../../../utils";

export const useNhgList = () => {
  const [_, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    isFormLoading: true,
    isFormSubmitting: false,
    isTableLoading: true,
    NhgList: { options: [] },
    selectedWardId: null,
    formData: {
      name: "",
      wardNo: "",
    },
  });
  const { wardId } = useParams();
  const { setAlert } = useAlertContext();
  const location = useLocation();
  const navigate = useNavigate();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const getWardDetails = async (wardId) => {
    triggerFormLoading(true);
    try {
      const response = await getWardDetailsApi(wardId);

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

  const getWardNhgList = async (wardId) => {
    triggerTableLoading(true);
    try {
      const response = await getWardNhgListApi(wardId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.NhgList.options = data;
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

  const createNewWard = async (formData) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await createWardApi(formData);

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getWardNhgList();
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

  const updateWard = async ({ formData, wardId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await updateWardApi({ params: formData, wardId });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getWardNhgList();
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

  const deleteWard = async (wardId) => {
    triggerTableLoading(true);
    try {
      const response = await deleteWardApi({ wardId });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getWardNhgList();
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
      case "wardDetails":
        handleWardSelection(id);
        break;
      case "manageAds":
        break;
      case "deleteWard":
        setAlert((draft) => {
          draft.open = true;
          draft.dialogValue = "?delete";
          draft.title = "Delete Ward";
          draft.description =
            "Are you sure? Do you want to delete the ward. Once you delete the ward there is no going back.";
          draft.rowAction = (
            <AlertRowAction
              onClick={async () => await deleteWard(id)}
              label="Delete"
            />
          );
        });
        break;
      default:
        navigate("?new-ward");
        break;
    }
  };

  const handleWardSelection = async (id) => {
    navigate("?ward");
    setState((draft) => {
      draft.selectedWardId = id;
    });
    await getWardDetails(id);
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
        case "?new-ward":
          await createNewWard(state.formData);
          break;
        case "?ward":
          await updateWard({
            formData: {
              name: state.formData.name,
              wardNo: state.formData.wardNo,
            },
            wardId: state.selectedWardId,
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
        draft.formData = { name: "", wardNo: "" };
        draft.selectedWardId = null;
      });
      setForceUpdate(0);
    }
  }, [location.search]);

  React.useEffect(() => {
    getWardNhgList(wardId);
    getWardDetails(wardId);
  }, []);

  return {
    state,
    formValidator,
    handleFormSubmit,
    toggleModel,
    handleFormChange,
  };
};
