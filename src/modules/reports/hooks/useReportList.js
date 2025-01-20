import dayjs from "dayjs";
import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import { generateReportApi } from "../apis/reportApis";
import { enqueueSnackbar } from "notistack";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

export const useReportList = () => {
  const [_, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    formData: {
      startDate: null,
      endDate: null,
      transactionType: "deposit",
    },
    transactionTypes: [
      { value: "deposit", label: "Deposit" },
      { value: "refund", label: "Refund" },
      { value: "member fee", label: "Member Fees" },
    ],
    reportForm: {
      startDate: null,
      endDate: null,
      totalDeposits: "",
      totalRefunds: "",
      totalMembershipFees: "",
      depositReport: null,
      refundReport: null,
      membershipFeesReport: null,
    },
    generateReportButtonLoading: false,
  });

  const navigate = useNavigate();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const generateReport = async (params) => {
    triggerGenerateReportButtonLoading(true);
    try {
      const response = await generateReportApi(params);

      if (response.status === 200) {
        // Generate the file name dynamically
        const fileName =
          params.transactionType.toUpperCase() +
          "_REPORT_" +
          `${params.startDate}to${params.endDate}` +
          ".pdf";

        // Save the file as a blob
        saveAs(response.data, fileName);

        enqueueSnackbar({
          message: `${params.transactionType} report successfully generated`,
          variant: "success",
        });
      } else {
        // Handle JSON error response
        const errorData = response.data; // Assuming the error details are in the response data
        enqueueSnackbar({
          message: errorData.message || "Failed to generate the report",
          variant: "error",
        });
      }
    } catch (exception) {
      enqueueSnackbar({
        message: "Failed to generate the report",
        variant: "error",
      });
      console.error(exception);
    } finally {
      triggerGenerateReportButtonLoading(false);
    }
  };

  const triggerGenerateReportButtonLoading = (status) => {
    setState((draft) => {
      draft.generateReportButtonLoading = status;
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
        ...state.formData,
        startDate: dayjs(state.formData.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(state.formData.end).format("YYYY-MM-DD"),
      };

      await generateReport(params);
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  const toggleModel = async ({ type, id }) => {
    switch (type) {
      // case "wardDetails":
      //   handleMinuteSelection(id);
      //   break;
      // case "manageAds":
      //   break;
      // case "deleteMinute":
      //   setAlert((draft) => {
      //     draft.open = true;
      //     draft.dialogValue = "?delete";
      //     draft.title = "Delete Minute";
      //     draft.description =
      //       "Are you sure? Do you want to delete the ward. Once you delete the ward there is no going back.";
      //     draft.rowAction = (
      //       <AlertRowAction
      //         onClick={async () => await deleteMinute(id)}
      //         label="Delete"
      //       />
      //     );
      //   });
      //   break;
      default:
        navigate("?new-report");
        break;
    }
  };

  return {
    formValidator,
    state,
    handleFormSubmit,
    handleFormChange,
    toggleModel,
  };
};
