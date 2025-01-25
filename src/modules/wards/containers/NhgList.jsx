/* eslint-disable react/prop-types */
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
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ManageAccountsOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNhgList } from "../hooks";
import { utilFunctions } from "../../../utils";

export const NhgList = () => {
  const {
    state,
    formValidator,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
  } = useNhgList();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Name",
        cell: ({
          row: {
            original: { user },
          },
        }) => <Typography>{user.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Email",
        cell: ({
          row: {
            original: { user },
          },
        }) => <Typography>{user.email}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "President",
        cell: ({
          row: {
            original: { president },
          },
        }) => <Typography>{president?.user?.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Secretary",
        cell: ({
          row: {
            original: { secretary },
          },
        }) => <Typography>{secretary?.user?.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Contact No",
        accessorKey: "contactNo",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Members",
        accessorKey: "totalMembers",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Status",
        cell: ({
          row: {
            original: { status },
          },
        }) => {
          return (
            <Chip
              label={status.name}
              color={status === "Registered" ? "warning" : "success"}
            />
          );
        },
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
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        placement: "right",
        meta: { cellStyle: { width: 70 } },
        cell: ({
          row: {
            original: { id },
          },
        }) => (
          <Stack flexDirection="row">
            {/* <Tooltip title="Manage Ads" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => toggleModel({ type: "mangeAds" })}
              >
                <ManageAccountsOutlined fontSize="small" />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Ward Details" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => toggleModel({ type: "wardDetails", id })}
              >
                <VisibilityOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Delete Ward" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => toggleModel({ type: "deleteWard", id })}
              >
                <DeleteOutlineRounded fontSize="small" />
              </IconButton>
            </Tooltip> */}
          </Stack>
        ),
      },
    ],
    [],
  );

  const helperText = {
    name: formValidator.current.message(
      "name",
      state.wardDetails.name,
      "required",
    ),
    wardNo: formValidator.current.message(
      "wardNo",
      state.wardDetails.wardNo,
      "required",
    ),
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/" },
    { title: "Wards", href: "/wards" },
    { title: state.wardDetails.name },
  ];

  return (
    <PageLayout
      title={state.wardDetails.name}
      breadcrumbs={breadcrumbs}
      actionSection={
        <Button
          variant="contained"
          startIcon={<ManageAccountsOutlined />}
          onClick={() => toggleModel({ type: "manageAds" })}
        >
          Manage ADS
        </Button>
      }
    >
      <ReactTable
        title="NHG List"
        columns={columns}
        data={state.NhgList.options}
        loading={state.isTableLoading}
        rowClick={() => {}}
      />

      <GeneralDialog
        dialogValue={state.selectedWardId ? "?ward" : "?manage-ads"}
        disableCloseOnBackgroundClick={false}
      >
        <DialogHeader title="Manage ADS" />
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
                  label="ADS"
                  name="ads"
                  type="dropdown"
                  options={state.president.options}
                  onChange={(event, value) =>
                    handleFormChange({ target: { name: "ads", value } })
                  }
                  value={state.formData.ads}
                  isOptionEqualToValue={(option, current) => {
                    return option.id === current.id;
                  }}
                  getOptionLabel={(option) => option.presidentEmail}
                  renderInput={(props) => {
                    return <TextField {...props} label="ADS" name="ads" />;
                  }}
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <ListItemButton
                        key={key}
                        {...optionProps}
                        sx={{ gap: 2 }}
                      >
                        <Avatar
                          src={option?.profile}
                          alt="avatar"
                          sx={{ width: 36, height: 36, fontSize: 14 }}
                        >
                          {option.president[0]}
                        </Avatar>
                        <ListItemText
                          primary={option.president}
                          secondary={option.nhg}
                        />
                      </ListItemButton>
                    );
                  }}
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
