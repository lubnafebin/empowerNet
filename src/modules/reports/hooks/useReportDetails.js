import React from "react";
import { useImmer } from "use-immer";
import { utilFunctions } from "../../../utils";
import { getReportDetailsApi } from "../apis";
import { useParams } from "react-router-dom";

export const useReportDetails = () => {
  const [state, setState] = useImmer({
    report: {
      details: { reports: [], startDate: "", endDate: "" },
      loading: true,
    },
  });
  const { reportId } = useParams();

  const getReportDetails = async (reportId) => {
    triggerDetailsLoading(true);
    try {
      const response = await getReportDetailsApi(reportId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.report.details = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerDetailsLoading(false);
    }
  };

  const triggerDetailsLoading = (status) => {
    setState((draft) => {
      draft.report.loading = status;
    });
  };

  React.useEffect(() => {
    getReportDetails(reportId);
  }, []);

  return { state };
};
