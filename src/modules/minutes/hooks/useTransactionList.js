import { useParams } from "react-router-dom";
import { utilFunctions } from "../../../utils";
import { getMeetingTransactionListApi } from "../apis";
import { useImmer } from "use-immer";
import React from "react";

export const useTransactionList = ({ transactionType }) => {
  const { meetingId } = useParams();
  const [state, setState] = useImmer({
    isTableLoading: true,
    transactions: { options: [] },
  });

  const getMeetingTransactionList = async (meetingId) => {
    triggerTableLoading(true);
    try {
      const response = await getMeetingTransactionListApi({
        meetingId,
        transactionType,
      });

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

  const triggerTableLoading = (status) => {
    setState((draft) => {
      draft.isTableLoading = status;
    });
  };

  const reloadTable = async () => await getMeetingTransactionList(meetingId);

  React.useEffect(() => {
    getMeetingTransactionList(meetingId);
  }, []);

  return { state, reloadTable };
};
