import React from "react";
import {
  DialogHeader,
  GeneralDialog,
  InputControl,
  LoadingButton,
} from "../../../shared";
import { DialogActions, DialogContent, Divider, Stack } from "@mui/material";
import { useImmer } from "use-immer";
import SimpleReactValidator from "simple-react-validator";
import { utilFunctions } from "../../../utils";
import { enqueueSnackbar } from "notistack";
import { verifyReportApi } from "../apis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const ApproveOrRejectReport = ({ refetchReportDetails }) => {
  const {
    state,
    formValidator,
    handleResetFormData,
    handleFormChange,
    handleFormSubmit,
  } = useApproveOrReject({ refetchReportDetails });

  const helperText = {
    message: formValidator.current.message(
      "message",
      state.formData.message,
      "required",
    ),
  };

  return (
    <GeneralDialog
      disableCloseOnBackgroundClick={false}
      dialogValue="?verify-report"
    >
      <DialogHeader title="Approve/Reject" resetCache={handleResetFormData} />
      <Divider />
      <Stack component="form">
        <DialogContent>
          <Stack>
            <InputControl
              type="textarea"
              size="small"
              label="Message (Optional for approve)"
              value={state.formData.message}
              name="message"
              onChange={handleFormChange}
              error={Boolean(helperText.message)}
              helperText={helperText.message}
            />
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <LoadingButton
            size="small"
            loading={false}
            variant="contained"
            color="error"
            onClick={(event) => handleFormSubmit({ event, type: "reject" })}
          >
            Reject
          </LoadingButton>
          <LoadingButton
            size="small"
            loading={false}
            variant="contained"
            onClick={(event) => handleFormSubmit({ event, type: "approve" })}
          >
            Approve
          </LoadingButton>
        </DialogActions>
      </Stack>
    </GeneralDialog>
  );
};

const useApproveOrReject = ({ refetchReportDetails }) => {
  const [, setAutoForceUpdate] = React.useState();
  const { reportId } = useParams();
  const [state, setState] = useImmer({
    formData: {
      message: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setAutoForceUpdate },
      element: (message) => message,
    }),
  );

  const verifyNhgReport = async ({ reportId, approve, message }) => {
    try {
      const response = await verifyReportApi({ reportId, approve, message });
      const { success } = response;
      if (success) {
        enqueueSnackbar({ message: response.message, variant: "success" });
        refetchReportDetails(reportId);
        navigate(location.pathname, { replace: true, state: location.state });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const handleResetFormData = () => {
    setState((draft) => {
      draft.formData.message = "";
    });
  };

  const handleFormSubmit = async ({ event, type }) => {
    event.preventDefault();

    if (type === "approve") {
      await verifyNhgReport({
        reportId,
        approve: 1,
        message: state.formData.message,
      });
    } else if (type === "reject") {
      if (formValidator.current.allValid()) {
        await verifyNhgReport({
          reportId,
          approve: 0,
          message: state.formData.message,
        });
      } else {
        formValidator.current.showMessages();
        setAutoForceUpdate(1);
      }
    }
  };

  return {
    state,
    formValidator,
    handleResetFormData,
    handleFormChange,
    handleFormSubmit,
  };
};

ApproveOrRejectReport.propTypes = {
  refetchReportDetails: PropTypes.func.isRequired,
};
