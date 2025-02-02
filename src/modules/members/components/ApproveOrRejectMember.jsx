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
import { approveOrRejectMemberApi } from "../apis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const ApproveOrRejectMember = ({ refetchMemberDetails }) => {
  const {
    state,
    formValidator,
    handleResetFormData,
    handleFormChange,
    handleFormSubmit,
  } = useApproveOrRejectMember({ refetchMemberDetails });

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
      dialogValue="?approve-or-reject-member"
    >
      <DialogHeader
        title="Approve/Reject Member"
        resetCache={handleResetFormData}
      />
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

const useApproveOrRejectMember = ({ refetchMemberDetails }) => {
  const [, setAutoForceUpdate] = React.useState();
  const { nhgId } = useParams();
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

  const approveOrReject = async ({ nhgId, message, memberId, approve }) => {
    try {
      const response = await approveOrRejectMemberApi({
        nhgId,
        memberId,
        message,
        approve,
      });
      const { success } = response;
      if (success) {
        enqueueSnackbar({ message: response.message, variant: "success" });
        navigate(location.pathname, { replace: true, state: location.state });
        await refetchMemberDetails(nhgId);
      } else {
        throw {
          response: {
            data: { message: response.message },
          },
        };
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
      await approveOrReject({
        nhgId,
        memberId: location.state?.memberId,
        approve: 1,
        message: state.formData.message,
      });
    } else if (type === "reject") {
      if (formValidator.current.allValid()) {
        await approveOrReject({
          nhgId,
          memberId: location.state?.memberId,
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

ApproveOrRejectMember.propTypes = {
  refetchMemberDetails: PropTypes.func.isRequired,
};
