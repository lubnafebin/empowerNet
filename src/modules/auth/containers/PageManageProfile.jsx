import {
  FormCardLayout,
  InputControl,
  LoadingButton,
  PageLayout,
} from "../../../shared";
import { Container, Paper, Stack } from "@mui/material";
import { ProfileCard } from "../components";
import { globalGap, logoutServices, utilFunctions } from "../../../utils";
import { useImmer } from "use-immer";
import SimpleReactValidator from "simple-react-validator";
import React from "react";
import { enqueueSnackbar } from "notistack";
import { getUserDetailsApi, updatePasswordApi } from "../apis";

export const PageManageProfile = () => {
  const { formValidator, state, handleFormChange, handleFormSubmit } =
    usePageManageProfile();

  const helperText = {
    currentPassword: formValidator.current.message(
      "currentPassword",
      state.formData.currentPassword,
      "required",
    ),
    newPassword: formValidator.current.message(
      "newPassword",
      {
        newPassword: state.formData.newPassword,
        currentPassword: state.formData.currentPassword,
      },
      "required|notSameAsOldPassword",
    ),
    confirmPassword: formValidator.current.message(
      "confirmPassword",
      {
        newPassword: state.formData.newPassword,
        confirmPassword: state.formData.confirmPassword,
      },
      "required|passwordsMatch",
    ),
  };

  return (
    <PageLayout title="Profile">
      <Container maxWidth="xl">
        <Paper
          gap={2}
          width="100%"
          sx={{
            overflow: "hidden",
            borderRadius: "16px",
          }}
        >
          <ProfileCard
            avatarTitle={state.userDetails.name.charAt(0)}
            email={state.userDetails.email}
            mobile={state.userDetails.contactNo}
            name={state.userDetails.name}
            joinedAt={state.userDetails.joinedAt}
          />
        </Paper>
        <FormCardLayout
          title="Manage Password"
          parentStyle={{ mt: globalGap }}
          childrenStyle={{
            flexDirection: { md: "row", xs: "column", alignItems: "center" },
          }}
        >
          <Stack
            width="100%"
            gap="14px"
            component="form"
            onSubmit={handleFormSubmit}
          >
            <InputControl
              label="Current Password"
              size="small"
              name="currentPassword"
              value={state.formData.currentPassword}
              helperText={helperText.currentPassword}
              error={!!helperText.currentPassword}
              onChange={handleFormChange}
            />
            <InputControl
              label="New Password"
              size="small"
              name="newPassword"
              value={state.formData.newPassword}
              helperText={helperText.newPassword}
              error={!!helperText.newPassword}
              onChange={handleFormChange}
            />
            <InputControl
              label="Confirm Password"
              size="small"
              name="confirmPassword"
              value={state.formData.confirmPassword}
              helperText={helperText.confirmPassword}
              error={!!helperText.confirmPassword}
              onChange={handleFormChange}
            />
            <Stack ml="auto">
              <LoadingButton loading={state.buttonLoading} variant="contained">
                Update
              </LoadingButton>
            </Stack>
          </Stack>
        </FormCardLayout>
      </Container>
    </PageLayout>
  );
};

const usePageManageProfile = () => {
  const [, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    userDetails: { name: "", email: "", contactNo: "", joinedAt: "" },
    formData: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    buttonLoading: false,
  });

  const formValidator = React.useRef(
    new SimpleReactValidator({
      element: (message) => message,
      autoForceUpdate: { forceUpdate: setForceUpdate },
      validators: {
        notSameAsOldPassword: {
          message: "New password cannot be the same as the current password",
          rule: ({ newPassword, currentPassword }) => {
            return newPassword !== currentPassword;
          },
        },
        passwordsMatch: {
          message: "New password and confirm password must match",
          rule: ({ newPassword, confirmPassword }) => {
            return newPassword === confirmPassword;
          },
        },
      },
    }),
  );

  const getUserDetails = async () => {
    try {
      const response = await getUserDetailsApi();
      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.userDetails = data;
        });
      } else {
        throw {
          response: {
            data: { message },
          },
        };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    }
  };

  const updatePassword = async (params) => {
    triggerButtonLoading(true);
    try {
      const response = await updatePasswordApi(params);
      const { success, message } = response;
      if (success) {
        enqueueSnackbar({
          message,
          variant: "success",
        });
        logoutServices();
      } else {
        throw {
          response: {
            data: {
              message,
            },
          },
        };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerButtonLoading(false);
    }
  };

  const triggerButtonLoading = (loading) => {
    setState((draft) => {
      draft.buttonLoading = loading;
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
      await updatePassword({
        currentPassword: state.formData.currentPassword,
        newPassword: state.formData.newPassword,
      });
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);
  return { state, formValidator, handleFormChange, handleFormSubmit };
};
