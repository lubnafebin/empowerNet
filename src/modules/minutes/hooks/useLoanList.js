import React from "react";
import { utilFunctions } from "../../../utils";
import { getMeetingLoanListApi } from "../apis";
import { useImmer } from "use-immer";
import { useParams } from "react-router-dom";

export const useLoanList = () => {
  const { meetingId } = useParams();
  const [state, setState] = useImmer({
    isTableLoading: true,
    loan: { options: [] },
  });

  const getMeetingLoanList = async (meetingId) => {
    triggerTableLoading(true);
    try {
      const response = await getMeetingLoanListApi({
        meetingId,
      });

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.loan.options = data;
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

  const reloadTable = async () => await getMeetingLoanList(meetingId);

  React.useEffect(() => {
    getMeetingLoanList(meetingId);
  }, []);

  return { state, reloadTable };
};
