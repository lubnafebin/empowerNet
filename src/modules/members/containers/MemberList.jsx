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
import { useMemberList } from "../hooks";

export const MemberList = () => {
  const {
    state,
    formValidator,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
  } = useMemberList();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Profile",
        cell: ({
          row: {
            original: { attachments, user },
          },
        }) => {
          const url = "http://localhost:5000/" + attachments[2].url;
          return (
            <Avatar
              src={url}
              sx={{
                width: "24px",
                height: "24px",
                fontSize: 14,
                backgroundColor: "primary.main",
              }}
            >
              {user.name[0]}
            </Avatar>
          );
        },
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Name",
        cell: ({
          row: {
            original: { user },
          },
        }) => <Typography fontSize="14px">{user.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Email",
        cell: ({
          row: {
            original: { user },
          },
        }) => <Typography fontSize="14px">{user.email}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Aadhar No",
        cell: ({
          row: {
            original: { address },
          },
        }) => <Typography fontSize="14px">{address.aadharNo}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Contact No",
        cell: ({
          row: {
            original: { address },
          },
        }) => <Typography fontSize="14px">{address.contactNo}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Role",
        cell: ({
          row: {
            original: { role },
          },
        }) => <Typography fontSize="14px">{role.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Status",
        cell: ({
          row: {
            original: { status },
          },
        }) => (
          <Chip
            label={status.name}
            color={status.name === "Not Verified" ? "warning" : "success"}
          />
        ),
        enableSorting: true,
        placement: "right",
      },
      // {
      //   header: "Created At",
      //   cell: ({
      //     row: {
      //       original: { createdAt },
      //     },
      //   }) => {
      //     return dayjs(createdAt).format("ddd DD, MMM YYYY, hh:mm A");
      //   },
      //   enableSorting: true,
      //   placement: "right",
      // },
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
      title: "Members",
    },
  ];

  return (
    <PageLayout
      title="Members"
      breadcrumbs={breadcrumbs}
      actionSection={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => toggleModel("newWard")}
        >
          New Member
        </Button>
      }
    >
      <ReactTable
        columns={columns}
        data={state.memberList.options}
        loading={state.memberList.loading}
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
