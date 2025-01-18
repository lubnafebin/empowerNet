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
  Chip,
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
  DeleteOutlineRounded,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useMinuteList } from "../hooks";

export const MinuteList = () => {
  const {
    state,
    formValidator,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
  } = useMinuteList();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Date",
        accessorKey: "date",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Place",
        accessorKey: "place",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Participants",
        cell: ({
          row: {
            original: { participants },
          },
        }) => {
          return (
            <Typography fontWeight={400} fontSize={14}>
              {participants.length}
            </Typography>
          );
        },
        enableSorting: true,
        placement: "right",
        meta: { align:'center' },
      },
      {
        header: "Meeting No",
        accessorKey: "meetingNo",
        enableSorting: true,
        placement: "center",
        meta: {  align:'center' },
      },
      {
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        placement: "right",
        meta: { width: 70 },
        cell: ({
          row: {
            original: { id },
          },
        }) => (
          <Stack flexDirection="row">
            <Tooltip title="Ward Details" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => toggleModel({ type: "wardDetails", id })}
              >
                <VisibilityOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Ward" arrow disableInteractive>
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
    },
  ];

  return (
    <PageLayout
      title="Minutes"
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
        data={state.minuteList.options}
        loading={state.isTableLoading}
        rowClick={() => {}}
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
