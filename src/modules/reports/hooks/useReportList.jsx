import dayjs from "dayjs";
import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import {
  createNewReportSummaryApi,
  deleteReportApi,
  generateReportApi,
  getAllReportsApi,
} from "../apis/reportApis";
import { enqueueSnackbar } from "notistack";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { utilFunctions } from "../../../utils";
import { AlertRowAction, useAlertContext } from "../../../shared";

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
    reports: { options: [], loading: true },
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
    reportFormButtonLoading: false,
    generateReportButtonLoading: false,
  });

  const { setAlert } = useAlertContext();
  const navigate = useNavigate();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const reportFormValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const getAllReports = async () => {
    triggerTableLoading(true);
    try {
      const response = await getAllReportsApi();

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

  const createNewReportSummary = async (formData) => {
    triggerReportFormButtonLoading(true);
    try {
      const response = await createNewReportSummaryApi(formData);

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getAllReports();
        // handleResetFormData();
        navigate(location.pathname, { replace: true });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerReportFormButtonLoading(false);
    }
  };

  const deleteReport = async (reportId) => {
    try {
      const response = await deleteReportApi(reportId);

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getAllReports();
        navigate(location.pathname, { replace: true });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    }
  };

  const triggerTableLoading = (status) => {
    setState((draft) => {
      draft.reports.loading = status;
    });
  };

  const triggerGenerateReportButtonLoading = (status) => {
    setState((draft) => {
      draft.generateReportButtonLoading = status;
    });
  };

  const triggerReportFormButtonLoading = (status) => {
    setState((draft) => {
      draft.reportFormButtonLoading = status;
    });
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

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const handleReportFormChange = (event) => {
    const { name, value } = event.target;
    setState((draft) => {
      if (
        ["depositReport", "refundReport", "membershipFeesReport"].includes(name)
      ) {
        draft.reportForm[name] = value?.target?.files
          ? value.target.files[0]
          : value;
      } else {
        draft.reportForm[name] = value;
      }
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

  const handleReportFormSubmit = async (event) => {
    event.preventDefault();
    if (reportFormValidator.current.allValid()) {
      const formData = new FormData();

      Object.entries(state.reportForm).forEach(([key, value]) => {
        if (
          ["depositReport", "refundReport", "membershipFeesReport"].includes(
            key,
          )
        ) {
          value instanceof File && formData.append(key, value);
        } else if (["startDate", "endDate"].includes(key)) {
          formData.append(key, dayjs(value).format("YYYY-MM-DD"));
        } else {
          formData.append(key, value);
        }
      });

      await createNewReportSummary(formData);
    } else {
      reportFormValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  const handleDeleteReport = (reportId) => {
    setAlert((draft) => {
      draft.open = true;
      draft.dialogValue = "?delete";
      draft.title = "Delete Report";
      draft.description =
        "Are you sure? Do you want to delete the report. Once you delete the report there is no going back.";
      draft.rowAction = (
        <AlertRowAction
          onClick={async () => await deleteReport(reportId)}
          label="Delete"
        />
      );
    });
  };

  React.useEffect(() => {
    getAllReports();
  }, []);
  return {
    formValidator,
    reportFormValidator,
    state,
    handleFormSubmit,
    handleFormChange,
    toggleModel,
    handleReportFormSubmit,
    handleReportFormChange,
    handleDeleteReport,
  };
};
