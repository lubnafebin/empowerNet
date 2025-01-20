import React from "react";
import { AlertRowAction, useAlertContext } from "../../../shared";
import { enqueueSnackbar } from "notistack";
import {
  createNewTransactionApi,
  deleteTransactionApi,
  getMeetingParticipantsApi,
  getMeetingTransactionListApi,
  getTransactionDetailsApi,
  updateTransactionApi,
} from "../apis";
import SimpleReactValidator from "simple-react-validator";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { utilFunctions } from "../../../utils";
import dayjs from "dayjs";

export const useTransactions = () => {
  const [_, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    isFormLoading: true,
    isFormSubmitting: false,
    isTableLoading: true,
    transactions: { options: [] },
    participants: { options: [] },
    selectedTransactionId: null,
    formData: {
      memberId: null,
      deposit: "",
      refund: "",
      memberFee: "",
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
      validators: {
        minOneField: {
          message: "At least one amount is required",
          rule: ({ deposit, refund, memberFee }) => {
            return deposit !== "" || refund !== "" || memberFee !== "";
          },
        },
      },
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

  const getMeetingParticipants = async (meetingId) => {
    triggerTableLoading(true);
    try {
      const response = await getMeetingParticipantsApi(meetingId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.participants.options = data;
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

  const getMeetingTransactionList = async (meetingId) => {
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

  const createNewTransaction = async ({ params, meetingId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await createNewTransactionApi({ params, meetingId });
      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getMeetingTransactionList(meetingId);
        navigate(location.pathname, { replace: true, state: location.state });
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
        getMeetingTransactionList(meetingId);
        navigate(location.pathname, { replace: true, state: location.state });
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
        getMeetingTransactionList(meetingId);
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
        navigate("?new-transaction", { state: location.state });
        break;
    }
  };

  const handleTransactionSelection = async (id) => {
    navigate("?transaction", { state: location.state });
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
        case "?new-transaction": {
          const params = {
            transactionDate: dayjs(location.state?.minuteDate).format(
              "YYYY-MM-DD",
            ),
            memberId: state.formData.memberId?.member?.id,
          };
          if (state.formData.deposit) {
            params["deposit"] = parseInt(state.formData.deposit);
          }
          if (state.formData.refund) {
            params["refund"] = parseInt(state.formData.refund);
          }
          if (state.formData.memberFee) {
            params["memberFee"] = parseInt(state.formData.memberFee);
          }
          await createNewTransaction({ params, meetingId });
          break;
        }
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

  const resetFormState = () => {
    formValidator.current.hideMessages();
    setState((draft) => {
      draft.formData.memberId = null;
      draft.formData.deposit = "";
      draft.formData.refund = "";
      draft.formData.memberFee = "";
      draft.selectedTransactionId = null;
    });
    setForceUpdate(0);
  };

  React.useEffect(() => {
    getMeetingTransactionList(meetingId);
    getMeetingParticipants(meetingId);
  }, []);

  return {
    state,
    formValidator,
    handleFormSubmit,
    toggleModel,
    handleFormChange,
    resetFormState,
  };
};
