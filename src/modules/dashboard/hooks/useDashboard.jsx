import React from "react";
// import { enqueueSnackbar } from "notistack";
import { useImmer } from "use-immer";
import { useUtilFunctions, utilFunctions } from "../../../utils";
import { getDashboardAnalyticsApi } from "../apis";
import { useLocation } from "react-router-dom";
import {
  AccountBalance,
  Diversity3,
  Groups,
  LocationCity,
  Map,
  Paid,
  Savings,
} from "@mui/icons-material";

export const useDashboard = () => {
  const { getLoggedInUser } = useUtilFunctions();
  const [state, setState] = useImmer({
    dashboardCards: [],
    contentLoading: false,
  });
  const location = useLocation();

  const user = getLoggedInUser();

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ API SECTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const getDashboardAnalytics = async ({ roleType }) => {
    triggerContentLoading(true);
    try {
      const response = await getDashboardAnalyticsApi({ roleType });
      const { success, data } = response;

      if (success) {
        const lightColors = ["#CDE9FF", "#FFF9CD", "#FCE1D0"];
        const icons =
          roleType === "Member"
            ? [
                <Savings key="savings" sx={{ color: "#000" }} />,
                <Paid key="refunds" sx={{ color: "#000" }} />,
                <AccountBalance key="loan" sx={{ color: "#000" }} />,
              ]
            : roleType === "CDS"
              ? [
                  <Map key="location" sx={{ color: "#000" }} />,
                  <Diversity3 key="diversity" sx={{ color: "#000" }} />,
                ]
              : roleType === "NHG"
                ? [<Groups key="members" sx={{ color: "#000" }} />]
                : [<Diversity3 key="diversity" sx={{ color: "#000" }} />];

        setState((draft) => {
          draft.dashboardCards = data.map((card, index) => {
            return {
              ...card,
              color: lightColors[index] ?? "#D6E4FF",
              icon: icons[index],
            };
          });
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
    const roleType = location.pathname.split("/")[1].includes("cds")
      ? "CDS"
      : location.pathname.split("/")[1].includes("ads")
        ? "ADS"
        : location.pathname.split("/")[1].includes("nhg")
          ? "NHG"
          : "Member";

    getDashboardAnalytics({ roleType });
  }, []);

  return { state };
};
