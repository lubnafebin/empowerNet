import React from "react";
import { AlertRowAction, useAlertContext } from "../../../shared";
import { enqueueSnackbar } from "notistack";
import {
  deleteTransactionApi,
  getMeetingTransactionListApi,
  getTransactionDetailsApi,
  updateTransactionApi,
} from "../apis";
import SimpleReactValidator from "simple-react-validator";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { utilFunctions } from "../../../utils";

export const useTransactions = () => {
  const [_, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    isFormLoading: true,
    isFormSubmitting: false,
    isTableLoading: true,
    transactions: { options: [] },
    selectedTransactionId: null,
    formData: {
      name: "",
      TransactionNo: "",
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

  const getTransactionDetails = async (transactionId) => {
    triggerFormLoading(true);
    try {
      const response = await getTransactionDetailsApi(transactionId);

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
      const response = await getMeetingTransactionListApi(meetingId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.transactions.options = data;
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

  const createNewTransaction = async (formData) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = {};
      // await createTransactionApi(formData);
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

  const updateTransaction = async ({ formData, transactionId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await updateTransactionApi({
        params: formData,
        transactionId,
      });

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

  const deleteTransaction = async (transactionId) => {
    triggerTableLoading(true);
    try {
      const response = await deleteTransactionApi({ transactionId });

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
      case "transactionDetails":
        handleTransactionSelection(id);
        break;
      case "manageAds":
        break;
      case "deleteTransaction":
        setAlert((draft) => {
          draft.open = true;
          draft.dialogValue = "?delete";
          draft.title = "Delete Transaction";
          draft.description =
            "Are you sure? Do you want to delete the transaction. Once you delete the transaction there is no going back.";
          draft.rowAction = (
            <AlertRowAction
              onClick={async () => await deleteTransaction(id)}
              label="Delete"
            />
          );
        });
        break;
      default:
        navigate("?new-transaction");
        break;
    }
  };

  const handleTransactionSelection = async (id) => {
    navigate("?transaction");
    setState((draft) => {
      draft.selectedTransactionId = id;
    });
    await getTransactionDetails(id);
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
        case "?new-transaction":
          await createNewTransaction(state.formData);
          break;
        case "?transaction":
          await updateTransaction({
            formData: {
              name: state.formData.name,
              transactionNo: state.formData.transactionNo,
            },
            transactionId: state.selectedTransactionId,
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
        state.formData.transactionNo !== "" ||
        formValidator.current.errorMessages)
    ) {
      formValidator.current.hideMessages();
      setState((draft) => {
        draft.formData = { name: "", transactionNo: "" };
        draft.selectedTransactionId = null;
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
