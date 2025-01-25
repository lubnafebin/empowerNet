import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import {
  createWardApi,
  deleteWardApi,
  getNhgPresidentsByWardIdApi,
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
    president: { options: [] },
    selectedWardId: null,
    wardDetails: {
      name: "",
      wardNo: "",
    },
    formData: { ads: null },
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

  const getNhgPresidentsByWardId = async (wardId) => {
    // triggerTableLoading(true);
    try {
      const response = await getNhgPresidentsByWardIdApi(wardId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.president.options = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      // triggerTableLoading(false);
    }
  };

  const getWardDetails = async (wardId) => {
    triggerFormLoading(true);
    try {
      const response = await getWardDetailsApi(wardId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.wardDetails = data;
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

  const createNewWard = async (wardDetails) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await createWardApi(wardDetails);

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

  const updateWard = async ({ wardDetails, wardId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await updateWardApi({ params: wardDetails, wardId });

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
        navigate("?manage-ads");
        await getNhgPresidentsByWardId(wardId);
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
    console.log(value);
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formValidator.current.allValid()) {
      switch (location.search) {
        case "?new-ward":
          await createNewWard(state.wardDetails);
          break;
        case "?ward":
          await updateWard({
            wardDetails: {
              name: state.wardDetails.name,
              wardNo: state.wardDetails.wardNo,
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
