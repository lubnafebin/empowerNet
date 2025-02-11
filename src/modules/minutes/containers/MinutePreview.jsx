import { PageLayout, LoadingButton } from "../../../shared";
import { enqueueSnackbar } from "notistack";
import { useImmer } from "use-immer";
import { utilFunctions } from "../../../utils";
import { generateMinuteReportApi } from "../apis";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";

export const MinutePreview = () => {
  const { breadcrumbs, state, handleGenerateMinuteReport } = useMinutePreview();

  return (
    <PageLayout
      title="Agendas"
      breadcrumbs={breadcrumbs}
      actionSection={
        <LoadingButton
          loading={state.generateButtonLoading}
          onClick={handleGenerateMinuteReport}
        >
          Generate Report
        </LoadingButton>
      }
    ></PageLayout>
  );
};

const useMinutePreview = () => {
  const [state, setState] = useImmer({
    generateButtonLoading: false,
  });

  const { meetingId } = useParams();

  const generateMinuteReport = async ({ meetingId }) => {
    triggerGenerateButtonLoading(true);
    try {
      const response = await generateMinuteReportApi({ meetingId });
      if (response.status === 200) {
        // Generate the file name dynamically
        const fileName = "Minute_Report.pdf";

        // Save the file as a blob
        saveAs(response.data, fileName);

        enqueueSnackbar({
          message: "Minute report successfully generated",
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
      utilFunctions.displayError(exception);
    } finally {
      triggerGenerateButtonLoading(false);
    }
  };

  const triggerGenerateButtonLoading = (status) => {
    setState((draft) => {
      draft.generateButtonLoading = status;
    });
  };

  const handleGenerateMinuteReport = async () => {
    await generateMinuteReport({ meetingId });
  };

  const breadcrumbs = [];
  return {
    breadcrumbs,
    state,
    generateMinuteReport,
    handleGenerateMinuteReport,
  };
};
