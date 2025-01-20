import React from "react";
import { useImmer } from "use-immer";
import { utilFunctions } from "../../../utils";
import {
  generateConsolidateReportApi,
  getReportDetailsApi,
  uploadConsolidateReportApi,
} from "../apis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { enqueueSnackbar } from "notistack";

export const useReportDetails = () => {
  const [_, setForceUpdate] = React.useState(0);

  const [state, setState] = useImmer({
    report: {
      consolidateReport: null,
      details: {
        reports: [],
        startDate: "",
        endDate: "",
      },
      loading: true,
    },
    formData: {
      startDate: null,
      endDate: null,
      monthlyThriftTotal: "",
      thriftSplit1: "",
      thriftSplit2: "",
      monthlyThriftShadowDeposits: "",
      amountWithdrawn: "",
      cashTransactionAmount: "",
      remainingBalance: "",
    },
    generateReportButtonLoading: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { reportId } = useParams();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

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

  const uploadConsolidateReport = async (file) => {
    try {
      const response = await uploadConsolidateReportApi(file);

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    }
  };

  const generateConsolidateReport = async (params) => {
    triggerGenerateReportButtonLoading(true);
    try {
      const response = await generateConsolidateReportApi(params);

      if (response.status === 200) {
        // Generate the file name dynamically
        const fileName =
          "CONSOLIDATE_REPORT_" +
          `${params.startDate}to${params.endDate}` +
          ".pdf";

        // Save the file as a blob
        saveAs(response.data, fileName);

        enqueueSnackbar({
          message: `Consolidate report generated successfully`,
          variant: "success",
        });
        navigate(location.pathname, { replace: true });
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
        message: "Failed to generate the consolidate report",
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

  const triggerDetailsLoading = (status) => {
    setState((draft) => {
      draft.report.loading = status;
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const handleConsolidateReportUpload = async (event) => {
    const { value } = event.target;
    const formData = new FormData();
    formData.append("reportId", reportId);

    if (value?.target?.files) {
      setState((draft) => {
        draft.report.consolidateReport = value.target?.files[0];
      });
      formData.append("consolidateReport", value.target.files[0]);
    }
    await uploadConsolidateReport(formData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formValidator.current.allValid()) {
      const params = {
        ...state.formData,
        startDate: dayjs(state.formData.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(state.formData.end).format("YYYY-MM-DD"),
      };
      await generateConsolidateReport(params);
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  React.useEffect(() => {
    getReportDetails(reportId);
  }, []);

  return {
    state,
    handleFormSubmit,
    handleFormChange,
    handleConsolidateReportUpload,
    formValidator,
  };
};
