import { useImmer } from "use-immer";
import { useUtilFunctions, utilFunctions } from "../../../utils";
import { getAllReportsApi } from "../apis";
import React from "react";

export const useAllReports = () => {
  const [state, setState] = useImmer({
    reports: {
      options: [],
      loading: true,
    },
  });

  const { getLoggedInUser } = useUtilFunctions();
  const user = getLoggedInUser();

  const getAllReports = async ({ wardId }) => {
    triggerTableLoading(true);
    try {
      const response = await getAllReportsApi({ wardId });

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.reports.options = data;
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
      draft.reports.loading = status;
    });
  };

  React.useEffect(() => {
    getAllReports({ wardId: user.wardId });
  }, []);

  return { state };
};
