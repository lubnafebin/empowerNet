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
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  AssignmentOutlined,
  CurrencyRupeeRounded,
  DeleteOutlineRounded,
} from "@mui/icons-material";
import { useTransactions } from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";

export const Transactions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state,
    formValidator,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
  } = useTransactions();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Account Holder",
        cell: ({
          row: {
            original: { accountHolder },
          },
        }) => <Typography>{accountHolder.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Date",
        accessorKey: "transactionDate",
        enableSorting: true,
        placement: "right",
        meta: { stackStyle: { minWidth: 100 } },
      },
      {
        header: "Time",
        accessorKey: "transactionTime",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Recorder By",
        cell: ({
          row: {
            original: { createdBy },
          },
        }) => <Typography fontWeight={14}>{createdBy?.name ?? "-"}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Deposit",
        accessorKey: "deposit",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Refund",
        accessorKey: "refund",
        enableSorting: true,
        placement: "refund",
      },
      {
        header: "Member Fee",
        cell: ({
          row: {
            original: { memberFee },
          },
        }) => (
          <Typography fontSize={14}>
            {memberFee ?? "0"}
          </Typography>
        ),
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Savings",
        accessorKey: "totalSavings",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Refunds",
        accessorKey: "totalRefund",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        placement: "right",
        cell: ({
          row: {
            original: { id },
          },
        }) => (
          <Stack flexDirection="row">
            <Tooltip title="Agendas" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => navigate(`${id}/agendas`)}
              >
                <AssignmentOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Transactions" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => navigate(`${id}/transactions`)}
              >
                <CurrencyRupeeRounded fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Meeting" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => toggleModel({ type: "deleteWard", id })}
              >
                <DeleteOutlineRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [],
  );

  const helperText = {
    name: formValidator.current.message(
      "name",
      state.formData.name,
      "required",
    ),
    wardNo: formValidator.current.message(
      "wardNo",
      state.formData.wardNo,
      "required",
    ),
  };

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Minutes",
      href: `/minutes`,
    },
    {
      title: location.state?.minuteDate ?? "",
    },
  ];

  return (
    <PageLayout
      title="Transactions"
      breadcrumbs={breadcrumbs}
      actionSection={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => toggleModel("newWard")}
        >
          New Minute
        </Button>
      }
    >
      <ReactTable
        columns={columns}
        data={state.transactions.options}
        loading={state.isTableLoading}
      />

      <GeneralDialog dialogValue={state.selectedWardId ? "?ward" : "?new-ward"}>
        <DialogHeader
          title={state.selectedWardId ? state.formData.name : "New Ward"}
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
            sx={{ width: { md: 400, xs: "100%" } }}
          >
            <DialogContent>
              <Stack gap="14px">
                <InputControl
                  required
                  size="small"
                  label="Ward No"
                  value={state.formData.wardNo}
                  name="wardNo"
                  onChange={handleFormChange}
                  error={Boolean(helperText.wardNo)}
                  helperText={helperText.wardNo}
                />
                <InputControl
                  required
                  size="small"
                  label="Ward Name"
                  value={state.formData.name}
                  name="name"
                  error={Boolean(helperText.name)}
                  helperText={helperText.name}
                  onChange={handleFormChange}
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
