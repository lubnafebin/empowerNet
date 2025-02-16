import dayjs from "dayjs";
import React from "react";
import { utilFunctions } from "../../../utils";
import {
  createNewLoanApi,
  createNewTransactionApi,
  getMeetingParticipantsApi,
} from "../apis";
import { enqueueSnackbar } from "notistack";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const useManageTransactionEntry = ({ transactionType, reloadTable }) => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [, setForceUpdate] = React.useState(0);

  const [state, setState] = useImmer({
    isFormLoading: true,
    isFormSubmitting: false,
    participants: { options: [] },
    formData: {
      memberId: null,
      amount: "",
    },
  });

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const createNewTransaction = async ({ params, meetingId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await createNewTransactionApi({ params, meetingId });
      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        await reloadTable();
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

  const createNewLoan = async ({ params, meetingId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await createNewLoanApi({ params, meetingId });
      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        await reloadTable();
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

  const getMeetingParticipants = async (meetingId) => {
    triggerFormLoading(true);
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
      triggerFormLoading(false);
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

  const resetFormState = () => {
    setState((draft) => {
      draft.formData = {
        memberId: null,
        deposit: "",
      };
    });
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
      const params = {
        transactionDate: dayjs(location.state?.minuteDate).format("YYYY-MM-DD"),
        memberId: state.formData.memberId?.member?.id,
        amount: state.formData.amount,
        transactionType,
      };

      if (transactionType === "loan") {
        await createNewLoan({ params, meetingId });
      } else {
        await createNewTransaction({ params, meetingId });
      }
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  React.useEffect(() => {
    if (location.search && state.participants.options.length === 0)
      getMeetingParticipants(meetingId);
  }, [location.search]);

  return {
    state,
    formValidator,
    resetFormState,
    handleFormChange,
    handleFormSubmit,
  };
};
