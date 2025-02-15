import React from "react";
import {
  DialogHeader,
  GeneralDialog,
  InputControl,
  LoadingButton,
  PageLayout,
  ReactTable,
} from "../../../shared";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  // IconButton,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  // Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  // AssignmentOutlined,
  // CurrencyRupeeRounded,
  // DeleteOutlineRounded,
} from "@mui/icons-material";
import { useTransactions } from "../hooks";
import {
  useLocation,
  // useNavigate
} from "react-router-dom";
import { BASE_URL } from "../../../configs";

export const Transactions = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const {
    state,
    formValidator,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
    resetFormState,
  } = useTransactions();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
      },
      {
        header: "Account Holder",
        cell: ({
          row: {
            original: { accountHolder },
          },
        }) => <Typography>{accountHolder.name}</Typography>,
        enableSorting: true,
      },
      {
        header: "Date",
        accessorKey: "transactionDate",
        enableSorting: true,
        meta: { stackStyle: { minWidth: 100 } },
      },
      {
        header: "Time",
        accessorKey: "transactionTime",
        enableSorting: true,
      },
      {
        header: "Recorder By",
        cell: ({
          row: {
            original: { createdBy },
          },
        }) => <Typography fontSize={14}>{createdBy?.name ?? "-"}</Typography>,
        enableSorting: true,
      },
      {
        header: "Deposit",
        accessorKey: "deposit",
        enableSorting: true,
      },
      {
        header: "Refund",
        cell: ({
          row: {
            original: { refund },
          },
        }) => (
          <Typography fontSize={16} fontWeight={500}>
            {refund ?? "0"}
          </Typography>
        ),
        enableSorting: true,
        meta: {
          rowCellStyle: {
            align: "center",
          },
        },
      },
      {
        header: "Member Fee",
        cell: ({
          row: {
            original: { memberFee },
          },
        }) => (
          <Typography fontSize={16} fontWeight={500}>
            {memberFee ?? "0"}
          </Typography>
        ),
        enableSorting: true,
        meta: {
          rowCellStyle: {
            align: "center",
          },
        },
      },
      {
        header: "Total Savings",
        cell: ({
          row: {
            original: { totalSavings },
          },
        }) => (
          <Typography fontSize={16} fontWeight={500} color="success.light">
            {totalSavings}
          </Typography>
        ),
        enableSorting: true,
      },
      {
        header: "Total Refunds",
        cell: ({
          row: {
            original: { totalRefund },
          },
        }) => (
          <Typography fontSize={16} fontWeight={500} color="success.light">
            {totalRefund}
          </Typography>
        ),
        enableSorting: true,
      },
    ],
    [],
  );

  const helperText = {
    memberId: formValidator.current.message(
      "name",
      state.formData.memberId,
      "required",
    ),
    deposit: formValidator.current.message(
      "deposit",
      {
        deposit: state.formData.deposit,
        refund: state.formData.refund,
        memberFee: state.formData.memberFee,
      },
      "minOneField",
    ),
    refund: formValidator.current.message(
      "refund",
      {
        deposit: state.formData.deposit,
        refund: state.formData.refund,
        memberFee: state.formData.memberFee,
      },
      "minOneField",
    ),
    memberFee: formValidator.current.message(
      "memberFee",
      {
        deposit: state.formData.deposit,
        refund: state.formData.refund,
        memberFee: state.formData.memberFee,
      },
      "minOneField",
    ),
  };

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/nhg/",
    },
    {
      title: "Minutes",
      href: `/nhg/minutes`,
    },
    {
      title: location.state?.minuteDate ?? "",
    },
  ];

  return (
    <PageLayout
      title={"Transactions on " + location.state?.minuteDate}
      breadcrumbs={breadcrumbs}
      actionSection={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => toggleModel("newWard")}
        >
          New Transaction
        </Button>
      }
    >
      <ReactTable
        columns={columns}
        data={state.transactions.options}
        loading={state.isTableLoading}
      />

      <GeneralDialog
        dialogValue={state.selectedWardId ? "?transaction" : "?new-transaction"}
        disableCloseOnBackgroundClick={false}
      >
        <DialogHeader
          title={state.selectedWardId ? state.formData.name : "New Transaction"}
          resetCache={resetFormState}
        />
        <Divider variant="fullWidth" orientation="horizontal" />
        {state.isFormLoading && state.selectedWardId ? (
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
              <Stack gap="14px">
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
                    // eslint-disable-next-line react/prop-types
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
                <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                  <InputControl
                    size="small"
                    type="number"
                    label="Deposit Amount"
                    value={state.formData.deposit}
                    name="deposit"
                    onChange={handleFormChange}
                    error={Boolean(helperText.deposit)}
                    helperText={helperText.deposit}
                  />
                  <InputControl
                    size="small"
                    type="number"
                    label="Refund Amount"
                    value={state.formData.refund}
                    name="refund"
                    onChange={handleFormChange}
                    error={Boolean(helperText.refund)}
                    helperText={helperText.refund}
                  />
                </Stack>
                <InputControl
                  size="small"
                  type="number"
                  label="Membership Fee"
                  value={state.formData.memberFee}
                  name="memberFee"
                  onChange={handleFormChange}
                  error={Boolean(helperText.memberFee)}
                  helperText={helperText.memberFee}
                />
              </Stack>
            </DialogContent>
            <Divider />
            <DialogActions>
              <LoadingButton
                size="small"
                loading={state.isFormSubmitting}
                type="submit"
                variant="contained"
              >
                {state.selectedWardId ? "Update" : "Create"}
              </LoadingButton>
            </DialogActions>
          </Box>
        )}
      </GeneralDialog>
    </PageLayout>
  );
};
