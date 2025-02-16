/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import {
  DialogHeader,
  GeneralDialog,
  InputControl,
  LoadingButton,
} from "../../../shared";
import { BASE_URL } from "../../../configs";
import { useManageTransactionEntry } from "../hooks";

export const ManageDeposit = ({ reloadTable }) => {
  const {
    state,
    formValidator,
    resetFormState,
    handleFormSubmit,
    handleFormChange,
  } = useManageTransactionEntry({ transactionType: "deposit", reloadTable });

  const helperText = {
    memberId: formValidator.current.message(
      "name",
      state.formData.memberId,
      "required",
    ),
    amount: formValidator.current.message(
      "amount",
      state.formData.amount,
      "required",
    ),
  };

  return (
    <GeneralDialog
      dialogValue="?new-deposit"
      disableCloseOnBackgroundClick={false}
    >
      <DialogHeader title="New Deposit" resetCache={resetFormState} />
      <Divider variant="fullWidth" orientation="horizontal" />
      {state.isFormLoading ? (
        <Stack
          sx={{ width: { md: 400, xs: "100%" }, height: 190 }}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{ width: { md: 500, xs: "100%" } }}
        >
          <DialogContent>
            <InputControl
              type="dropdown"
              size="small"
              options={state.participants.options}
              isOptionEqualToValue={(option, current) => {
                return option.id === current.id;
              }}
              getOptionLabel={(option) => option.member.user.name}
              onChange={(_, value) =>
                handleFormChange({
                  target: { name: "memberId", value },
                })
              }
              value={state.formData.memberId}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <ListItem
                    key={key}
                    {...optionProps}
                    sx={{ gap: "8px", display: "flex" }}
                  >
                    <Avatar
                      src={BASE_URL + option.member.user.profile?.url}
                      alt="avatar"
                      sx={{ width: 36, height: 36, fontSize: 14 }}
                    >
                      {option.member.user.name[0]}
                    </Avatar>
                    <ListItemText
                      primary={option.member.user.name}
                      secondary={option.member.user.email}
                    />
                  </ListItem>
                );
              }}
              renderInput={(props) => (
                <TextField
                  required
                  label="Account Holder Name"
                  {...props}
                  placeholder="Select account holder"
                  error={Boolean(helperText.memberId)}
                  helperText={helperText.memberId}
                />
              )}
            />
            <InputControl
              size="small"
              type="number"
              label="Deposit Amount"
              value={state.formData.amount}
              name="amount"
              onChange={handleFormChange}
              error={Boolean(helperText.amount)}
              helperText={helperText.amount}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <Divider />
          <DialogActions>
            <LoadingButton
              size="small"
              loading={state.isFormSubmitting}
              type="submit"
              variant="contained"
            >
              Create
            </LoadingButton>
          </DialogActions>
        </Box>
      )}
    </GeneralDialog>
  );
};
