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
} from "@mui/material";
import {
  Add,
  DeleteOutlineRounded,
  ManageAccountsOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useWardList } from "../hooks";
import dayjs from "dayjs";
import { utilFunctions } from "../../../utils";

export const WardList = () => {
  const {
    state,
    formValidator,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
  } = useWardList();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Ward No",
        accessorKey: "wardNo",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Created At",
        cell: ({
          row: {
            original: { createdAt },
          },
        }) => utilFunctions.formatDateAndTime(createdAt),
        enableSorting: true,
        placement: "right",
      },
      {
        header: "ADS",
        accessorKey: "ads",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        placement: "right",
        meta: { width: 150 },
        cell: ({
          row: {
            original: { id },
          },
        }) => (
          <Stack flexDirection="row">
            <Tooltip title="Manage Ads" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => toggleModel({ type: "mangeAds" })}
              >
                <ManageAccountsOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
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

  return (
    <PageLayout
      title="Wards"
      actionSection={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => toggleModel("newWard")}
        >
          New Ward
        </Button>
      }
    >
      <ReactTable
        columns={columns}
        data={state.wardList.options}
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
