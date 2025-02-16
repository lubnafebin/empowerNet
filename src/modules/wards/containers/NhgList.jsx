/* eslint-disable react/prop-types */
import React from "react";
import {
  DialogHeader,
  FileCard,
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
  FormHelperText,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  ManageAccountsOutlined,
  PictureAsPdf,
} from "@mui/icons-material";
import { useNhgList } from "../hooks";
import { utilFunctions } from "../../../utils";
import { useNavigate } from "react-router-dom";

export const NhgList = ({ roleType = "CDS" }) => {
  const isCds = roleType === "CDS";
  const {
    state,
    formValidator,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
    handleFormResting,
  } = useNhgList();
  const navigate = useNavigate();

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
        header: "Status",
        accessorKey: "status",
        cell: ({
          row: {
            original: { status },
          },
        }) => {
          return (
            <Chip
              label={status.name}
              color={
                status.name === "Registered"
                  ? "success"
                  : status.name === "Rejected"
                    ? "error"
                    : "warning"
              }
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
        cell: () => (
          <Stack flexDirection="row">
            <Tooltip title="Nhg OVerview" arrow disableInteractive>
              <ArrowForward fontSize="small" />
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [],
  );

  const helperText = {
    ads: formValidator.current.message("Ads", state.formData.ads, "required"),
  };

  const breadcrumbs = isCds
    ? [
        { title: "Dashboard", href: "/cds" },
        { title: "Wards", href: "/cds/wards" },
        { title: state.wardDetails.name },
      ]
    : [{ title: "Dashboard", href: "/ads" }, { title: "NHG List" }];

  return (
    <PageLayout
      title={isCds ? state.wardDetails.name : "NHG List"}
      breadcrumbs={breadcrumbs}
      actionSection={
        isCds && (
          <Button
            variant="contained"
            startIcon={<ManageAccountsOutlined />}
            onClick={() => toggleModel({ type: "manageAds" })}
          >
            Manage ADS
          </Button>
        )
      }
    >
      <ReactTable
        title={isCds ? "NHG List" : ""}
        columns={columns}
        data={state.NhgList.options}
        loading={state.isTableLoading}
        rowClick={(row) => {
          navigate(isCds ? `${row.id}/members` : `${row.id}/overview`, {
            state: { ward: state.wardDetails.name, nhg: row.user },
          });
        }}
      />

      <GeneralDialog
        dialogValue={state.selectedWardId ? "?ward" : "?manage-ads"}
        disableCloseOnBackgroundClick={false}
      >
        <DialogHeader title="Manage ADS" resetCache={handleFormResting} />
        <Divider variant="fullWidth" orientation="horizontal" />
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{ width: { md: 550, xs: "100%" } }}
        >
          <DialogContent>
            <Stack gap="14px">
              <InputControl
                label="ADS"
                name="ads"
                type="dropdown"
                size="small"
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
                  return (
                    <TextField
                      {...props}
                      label="Current ADS"
                      name="ads"
                      placeholder="Select ADS"
                      helperText={helperText.ads}
                      error={Boolean(helperText.ads)}
                    />
                  );
                }}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <ListItemButton key={key} {...optionProps} sx={{ gap: 2 }}>
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
              {state.isFormLoading ? (
                <Stack
                  sx={{ width: "100%", height: 300 }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress />
                </Stack>
              ) : state.useDetails?.name ? (
                <Stack>
                  <FormHelperText>Profile</FormHelperText>
                  <Stack gap="14px" flexDirection={{ xs: "column", md: "row" }}>
                    <Avatar
                      variant="rounded"
                      src={state.useDetails.profile}
                      alt="profile picture"
                      sx={{
                        width: "100px",
                        height: "100px",
                        cursor: "pointer",
                      }}
                    >
                      {state.useDetails?.name?.[0]}
                    </Avatar>
                    <Stack gap="14px">
                      <InputControl
                        size="small"
                        label="Name"
                        name="name"
                        value={state.useDetails.name}
                      />
                      <Stack
                        flexDirection={{ xs: "column", md: "row" }}
                        gap="14px"
                      >
                        <InputControl
                          size="small"
                          label="Email"
                          value={state.useDetails.email}
                          name="email"
                        />
                        <InputControl
                          size="small"
                          label="Contact No"
                          value={state.useDetails.contactNo}
                          name="contactNo"
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack gap="14px" mt="14px">
                    <Stack
                      flexDirection={{ xs: "column", md: "row" }}
                      gap="14px"
                    >
                      <InputControl
                        size="small"
                        label="Aadhar No"
                        value={state.useDetails.aadharNo}
                        name="aadharNo"
                      />
                      <InputControl
                        size="small"
                        label="Role"
                        value={state.useDetails.role}
                        name="role"
                      />
                    </Stack>
                    <Stack
                      flexDirection={{ xs: "column", md: "row" }}
                      gap="14px"
                    >
                      <InputControl
                        size="small"
                        label="AddressLine1"
                        value={state.useDetails.addressLine1}
                        name="addressLine1"
                      />
                      <InputControl
                        size="small"
                        label="AddressLine2"
                        value={state.useDetails.addressLine2}
                        name="addressLine2"
                      />
                    </Stack>
                    <Stack
                      flexDirection={{ xs: "column", md: "row" }}
                      gap="14px"
                    >
                      <InputControl
                        size="small"
                        label="district"
                        value={state.useDetails.district}
                        name="district"
                      />
                      <InputControl
                        size="small"
                        label="Zipcode/Postcode"
                        value={state.useDetails.postcode}
                        name="postcode"
                      />
                    </Stack>

                    <Stack gap="14px">
                      <FileCard
                        fileName={state.useDetails.aadharAttachment?.name}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        isFileUploaded={true}
                        onView={() =>
                          window.open(state.useDetails.signatureAttachment?.url)
                        }
                      />
                      <FileCard
                        fileName={state.useDetails.signatureAttachment?.name}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onView={() =>
                          window.open(state.useDetails.signatureAttachment?.url)
                        }
                        isFileUploaded={true}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              ) : (
                <FormSkelton />
              )}
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
              Update
            </LoadingButton>
          </DialogActions>
        </Box>
      </GeneralDialog>
    </PageLayout>
  );
};

const FormSkelton = () => {
  return (
    <Stack>
      <FormHelperText>Profile</FormHelperText>
      <Stack gap="14px" flexDirection={{ xs: "column", md: "row" }}>
        <Skeleton
          variant="rounded"
          sx={{
            width: "100px",
            height: "100px",
          }}
        />
        <Stack gap="14px">
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "42px",
            }}
          />
          <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
            <Skeleton
              variant="rounded"
              sx={{
                width: "190px",
                height: "42px",
              }}
            />
            <Skeleton
              variant="rounded"
              sx={{
                width: "190px",
                height: "42px",
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack gap="14px" mt="14px">
        <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "42px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "42px",
            }}
          />
        </Stack>
        <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "42px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "42px",
            }}
          />
        </Stack>
        <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "42px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "42px",
            }}
          />
        </Stack>

        <Stack gap="14px">
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "42px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "42px",
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
