import React from "react";
// import { enqueueSnackbar } from "notistack";
import { useImmer } from "use-immer";
import MembersIcon from "../../../assets/members-icon-dark.svg";
// import ReportIcon from "../../../assets/icons/report.svg";
// import CoachIcon from "../../../assets/icons/coach.svg";
import { useUtilFunctions, utilFunctions } from "../../../utils";
import { getDashboardAnalyticsApi } from "../apis";

export const useDashboard = () => {
  const { getLoggedInUser } = useUtilFunctions();
  const [state, setState] = useImmer({
    dashboardCards: [
      {
        title: "Total Savings",
        accessor: "totalClient",
        value: 0,
        icon: MembersIcon,
        caption: "Client analytics",
      },
      {
        title: "Total Refunds",
        accessor: "totalBIP",
        value: 0,
        icon: MembersIcon,
        caption: "Coach analytics",
      },
      {
        title: "Total Members",
        accessor: "totalReport",
        value: 0,
        icon: MembersIcon,
        caption: "Report analytics",
      },
    ],
    contentLoading: false,
  });

  const user = getLoggedInUser();
  const { formatError } = useUtilFunctions();

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ API SECTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const getDashboardAnalytics = async ({ profituneId = null }) => {
    triggerContentLoading(true);
    try {
      const response = await getDashboardAnalyticsApi({ profituneId });
      const { status, data } = response;

      if (status === 200) {
        const lightColors = ["#CDE9FF", "#FFF9CD", "#FCE1D0"];
        setState((draft) => {
          draft.dashboardCards = draft.dashboardCards
            .map((card, index) => {
              return profituneId && card.accessor === "totalBIP"
                ? null
                : {
                    ...card,
                    color: lightColors[index] ?? "#D6E4FF",
                    value: data[card.accessor],
                  };
            })
            .filter(Boolean);
        });
      } else {
        throw {
          response: { data: { message: "Failed to fetch dashboard details" } },
        };
      }
      return response;
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerContentLoading(false);
    }
  };

  //   +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ UTIL FUNCTION SECTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const triggerContentLoading = (loading) => {
    setState((draft) => {
      draft.contentLoading = loading;
    });
  };

  React.useEffect(() => {
    // getDashboardAnalytics({
    //   profituneId: user.userType === 2 ? user.userId : null,
    // });
  }, []);
  return { state };
};
