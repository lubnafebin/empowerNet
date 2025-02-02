import React from "react";
import {
  AlertBlock,
  DialogHeader,
  FileCard,
  GeneralDialog,
  InputControl,
  LoadingButton,
  PageLayout,
  ReactTable,
  VisuallyHiddenInput,
} from "../../../shared";
import SignatureIcon from "../../../assets/signature-icon-lite.svg";
import SignatureDarkIcon from "../../../assets/signature-icon-dark.svg";
import AadharIcon from "../../../assets/aadhar-icon-lite.svg";
import AadharDarkIcon from "../../../assets/aadhar-icon-dark.svg";
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
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Add,
  CancelRounded,
  CheckCircle,
  // DeleteOutlineRounded,
  InfoOutlined,
  PictureAsPdf,
  Telegram,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useMemberList } from "../hooks";
import dayjs from "dayjs";
import { useLocation, useParams } from "react-router-dom";
import { useUtilFunctions } from "../../../utils";
import { ApproveOrRejectMember, ApproveOrRejectNhg } from "../components";

export const MemberList = () => {
  const {
    state,
    formValidator,
    getMemberList,
    refetchNhgDetails,
    sendRequestVerification,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
    handleResetFormData,
    handleSendMemberVerificationRequest,
  } = useMemberList();
  const { checkPermission } = useUtilFunctions();
  const approveNhgPermission = checkPermission("nhgs.id.APPROVE");
  const createMemberPermission = checkPermission("member.id.POST");
  const updateNhgPermission = checkPermission("nhg.PUT");
  const approveMemberPermission = checkPermission("allMembers.id.APPROVE");

  const theme = useTheme();
  const { nhgId, wardId } = useParams();
  const location = useLocation();

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
          const url = "http://localhost:5000/" + attachments[2]?.url;
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
        header: "Created At",
        cell: ({
          row: {
            original: { createdAt },
          },
        }) => {
          return dayjs(createdAt).format("ddd DD, MMM YYYY, hh:mm A");
        },
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
        }) => {
          return (
            <Chip
              label={status.name}
              color={
                status.name === "Draft"
                  ? "primary"
                  : status.name === "In Review"
                    ? "warning"
                    : status.name === "Rejected"
                      ? "error"
                      : "success"
              }
            />
          );
        },
        enableSorting: true,
      },
      {
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        meta: { rowCellStyle: { width: 100 } },
        cell: ({
          row: {
            original: { id, status },
          },
        }) => {
          const isVerified = status?.name === "Verified";
          const isRejected = status?.name === "Rejected";
          return (
            <Stack flexDirection="row">
              {approveMemberPermission && (
                <Tooltip
                  title={isVerified ? "Verified" : "Verify"}
                  arrow
                  disableInteractive
                >
                  {isVerified || isRejected ? (
                    <IconButton size="small" disableFocusRipple disableRipple>
                      {isVerified ? (
                        <CheckCircle fontSize="small" color="success" />
                      ) : (
                        <CancelRounded fontSize="small" color="error" />
                      )}
                    </IconButton>
                  ) : (
                    <IconButton
                      size="small"
                      onClick={() =>
                        toggleModel({
                          type: "approve-or-reject-member",
                          id,
                        })
                      }
                      sx={{
                        visibility: ["Draft"].includes(status.name)
                          ? "hidden"
                          : "visible",
                      }}
                    >
                      <CheckCircle fontSize="small" color="warning" />
                    </IconButton>
                  )}
                </Tooltip>
              )}
              <Tooltip title="Member Details" arrow disableInteractive>
                <IconButton
                  size="small"
                  onClick={() => toggleModel({ type: "memberDetails", id })}
                >
                  <VisibilityOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
              {/* <Tooltip title="Delete Member" arrow disableInteractive>
                <IconButton
                  size="small"
                  onClick={() => toggleModel({ type: "deleteMember", id })}
                >
                  <DeleteOutlineRounded fontSize="small" />
                </IconButton>
              </Tooltip> */}
            </Stack>
          );
        },
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
    email: formValidator.current.message(
      "email",
      state.formData.email,
      "required|email",
    ),
    aadharNo: formValidator.current.message(
      "aadharNo",
      state.formData.aadharNo,
      "required|min:12|max:12",
    ),
    contactNo: formValidator.current.message(
      "contactNo",
      state.formData.contactNo,
      "required|min:10|max:10",
    ),
    addressLine1: formValidator.current.message(
      "addressLine1",
      state.formData.addressLine1,
      "required",
    ),
    addressLine2: formValidator.current.message(
      "addressLine2",
      state.formData.addressLine2,
      "required",
    ),
    postcode: formValidator.current.message(
      "postcode",
      state.formData.postcode,
      "required|min:6",
    ),
    districtId: formValidator.current.message(
      "districtId",
      state.formData.districtId,
      "required",
    ),
    roleId: formValidator.current.message(
      "roleId",
      state.formData.roleId,
      "required",
    ),
    aadharAttachment: formValidator.current.message(
      "aadharAttachment",
      state.formData.aadharAttachment,
      "required",
    ),
    signatureAttachment: formValidator.current.message(
      "signatureAttachment",
      state.formData.signatureAttachment,
      "required",
    ),
  };

  const breadcrumbs = nhgId
    ? [
        {
          title: "Dashboard",
          href: "/cds",
        },
        {
          title: "Wards",
          href: "/cds/wards",
        },
        {
          title: location.state.ward,
          href: `/cds/wards/${wardId}/nhgs`,
        },
        {
          title: "Members",
        },
      ]
    : [
        {
          title: "Dashboard",
          href: "/",
        },
        {
          title: "Members",
        },
      ];

  const isNhgRegistered = state.nhgDetails.status.name === "Registered";
  const isNhgRejected = state.nhgDetails.status.name === "Rejected";
  const isDraftMode = state.nhgDetails.status.name === "Draft";
  const isInReviewMode = state.nhgDetails.status.name === "In Review";

  const isAdsRequestDisabled = state.memberList.options.length <= 4;

  return (
    <PageLayout
      title={
        <Stack flexDirection="row" gap="8px" alignItems="center">
          {state.nhgDetailsFetching ? (
            <React.Fragment>
              <Skeleton width="250px" height="30px" variant="rounded" />
              <Skeleton width="80px" height="30px" variant="rounded" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography component="h1" variant="h5" fontWeight="bold">
                {state.nhgDetails.user.name}
              </Typography>
              <Chip
                label={state.nhgDetails.status.name}
                color={
                  isDraftMode
                    ? "primary"
                    : isNhgRejected
                      ? "error"
                      : isNhgRegistered
                        ? "success"
                        : "warning"
                }
              />
            </React.Fragment>
          )}
        </Stack>
      }
      breadcrumbs={breadcrumbs}
      actionSection={
        <Stack flexDirection="row" gap="14px">
          {approveNhgPermission && isInReviewMode && (
            <Button
              variant="contained"
              onClick={() => toggleModel({ type: "approve/reject" })}
              disabled={isAdsRequestDisabled}
            >
              Approve/Reject
            </Button>
          )}
          {state.verifyNhg &&
            updateNhgPermission &&
            !isNhgRegistered &&
            isInReviewMode && (
              <Button
                variant="contained"
                startIcon={<Telegram />}
                onClick={sendRequestVerification}
                disabled={isAdsRequestDisabled}
              >
                Send Verification Request
              </Button>
            )}
          {createMemberPermission && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => toggleModel({ type: "newMember" })}
            >
              New Member
            </Button>
          )}
        </Stack>
      }
    >
      {isDraftMode && !state.nhgDetailsFetching && (
        <AlertBlock>
          <InfoOutlined fontSize="small" />
          Add your members and complete your NHG registration by requesting ADS
          verification. A minimum of three members, along with a president and a
          secretary, is required to register an NHG.
        </AlertBlock>
      )}
      <ReactTable
        title="Members"
        columns={columns}
        data={state.memberList.options}
        loading={state.memberList.loading}
      />

      <GeneralDialog
        disableCloseOnBackgroundClick={false}
        dialogValue={state.selectedMemberId ? "?member" : "?new-member"}
      >
        <DialogHeader
          title={state.selectedMemberId ? state.formData.name : "New Member"}
          resetCache={handleResetFormData}
        />
        <Divider variant="fullWidth" orientation="horizontal" />
        {state.isFormLoading && state.selectedMemberId ? (
          <Stack
            sx={{ width: { md: 600, xs: "100%" }, height: 190 }}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
              width: { md: 600, xs: "100%" },
            }}
          >
            <DialogContent
              sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
            >
              <Stack gap="14px" flexDirection={{ xs: "column", md: "row" }}>
                <Box component="label">
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(event) =>
                      handleFormChange({
                        target: {
                          name: "profile",
                          value: event,
                        },
                      })
                    }
                  />
                  <Avatar
                    variant="rounded"
                    src={
                      state.formData.profile instanceof File
                        ? URL.createObjectURL(state.formData.profile)
                        : (state.formData.profile ?? "")
                    }
                    alt="profile picture"
                    sx={{
                      width: "100px",
                      height: "100px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
                <Stack gap="14px">
                  <InputControl
                    required
                    size="small"
                    label="Name"
                    value={state.formData.name}
                    name="name"
                    onChange={handleFormChange}
                    error={Boolean(helperText.name)}
                    helperText={helperText.name}
                  />
                  <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                    <InputControl
                      required
                      size="small"
                      label="Email"
                      value={state.formData.email}
                      name="email"
                      error={Boolean(helperText.email)}
                      helperText={helperText.email}
                      onChange={handleFormChange}
                    />
                    <InputControl
                      required
                      size="small"
                      label="Contact No"
                      value={state.formData.contactNo}
                      name="contactNo"
                      error={Boolean(helperText.contactNo)}
                      helperText={helperText.contactNo}
                      onChange={handleFormChange}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack gap="14px" mt="14px">
                <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                  <InputControl
                    required
                    size="small"
                    label="Aadhar No"
                    value={state.formData.aadharNo}
                    name="aadharNo"
                    onChange={handleFormChange}
                    error={Boolean(helperText.aadharNo)}
                    helperText={helperText.aadharNo}
                  />
                  <InputControl
                    type="dropdown"
                    size="small"
                    options={state.role.options}
                    isOptionEqualToValue={(option, current) => {
                      return option.id === current.id;
                    }}
                    getOptionLabel={(option) => option.name}
                    onChange={(_, value) =>
                      handleFormChange({
                        target: { name: "roleId", value },
                      })
                    }
                    value={state.formData.roleId}
                    renderInput={(props) => (
                      <TextField
                        label="Role"
                        {...props}
                        placeholder="Select the role"
                        required
                        error={Boolean(helperText.role)}
                        helperText={helperText.role}
                      />
                    )}
                  />
                </Stack>
                <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                  <InputControl
                    required
                    size="small"
                    label="AddressLine1"
                    value={state.formData.addressLine1}
                    name="addressLine1"
                    onChange={handleFormChange}
                    error={Boolean(helperText.addressLine1)}
                    helperText={helperText.addressLine1}
                  />
                  <InputControl
                    required
                    size="small"
                    label="AddressLine2"
                    value={state.formData.addressLine2}
                    name="addressLine2"
                    onChange={handleFormChange}
                    error={Boolean(helperText.addressLine2)}
                    helperText={helperText.addressLine2}
                  />
                </Stack>
                <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                  <InputControl
                    type="dropdown"
                    size="small"
                    options={state.district.options}
                    isOptionEqualToValue={(option, current) => {
                      return option.id === current.id;
                    }}
                    getOptionLabel={(option) => option.name}
                    onChange={(_, value) =>
                      handleFormChange({
                        target: { name: "districtId", value },
                      })
                    }
                    value={state.formData.districtId}
                    renderInput={(props) => (
                      <TextField
                        label="District"
                        {...props}
                        placeholder="Select your District"
                        required
                        error={Boolean(helperText.aadharNo)}
                        helperText={helperText.aadharNo}
                      />
                    )}
                  />
                  <InputControl
                    required
                    size="small"
                    label="Zipcode/Postcode"
                    value={state.formData.postcode}
                    name="postcode"
                    onChange={handleFormChange}
                    error={Boolean(helperText.postcode)}
                    helperText={helperText.postcode}
                  />
                </Stack>

                <Stack gap="14px">
                  <Stack>
                    {state.formData.aadharAttachment ? (
                      <FileCard
                        fileName={state.formData.aadharAttachment.name}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onDelete={() =>
                          handleFormChange({
                            target: {
                              name: "aadharAttachment",
                              value: null,
                            },
                          })
                        }
                        isFileUploaded={true}
                        onView={() =>
                          window.open(state.formData.signatureAttachment.url)
                        }
                      />
                    ) : (
                      <Box component="label">
                        <VisuallyHiddenInput
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            handleFormChange({
                              target: {
                                name: "aadharAttachment",
                                value: event,
                              },
                            })
                          }
                        />
                        <FileCard
                          fileName=""
                          icon={
                            <Box
                              component="img"
                              src={
                                theme.palette.mode === "light"
                                  ? AadharDarkIcon
                                  : AadharIcon
                              }
                              alt="upload file"
                            />
                          }
                          isFileUploaded={false}
                          fileNotUploadText="Click to upload the member aadhar"
                        />
                      </Box>
                    )}

                    {helperText.aadharAttachment && (
                      <FormHelperText sx={{ color: "#C60808" }}>
                        {helperText.aadharAttachment}
                      </FormHelperText>
                    )}
                  </Stack>

                  <Stack>
                    {state.formData.signatureAttachment ? (
                      <FileCard
                        fileName={state.formData.signatureAttachment.name}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onView={() =>
                          window.open(state.formData.signatureAttachment.url)
                        }
                        onDelete={() =>
                          handleFormChange({
                            target: {
                              name: "signatureAttachment",
                              value: null,
                            },
                          })
                        }
                        isFileUploaded={true}
                      />
                    ) : (
                      <Box component="label">
                        <VisuallyHiddenInput
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            handleFormChange({
                              target: {
                                name: "signatureAttachment",
                                value: event,
                              },
                            })
                          }
                        />
                        <FileCard
                          fileName=""
                          icon={
                            <Box
                              component="img"
                              src={
                                theme.palette.mode === "light"
                                  ? SignatureDarkIcon
                                  : SignatureIcon
                              }
                              alt="upload file"
                            />
                          }
                          onDelete={() => {}}
                          isFileUploaded={false}
                          fileNotUploadText="Click to upload the member signature"
                        />
                      </Box>
                    )}

                    {helperText.signatureAttachment && (
                      <FormHelperText sx={{ color: "#C60808" }}>
                        {helperText.signatureAttachment}
                      </FormHelperText>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ py: 2 }}>
              {["Draft", "Rejected"].includes(state.formData?.status?.name) && (
                <LoadingButton
                  loading={state.isFormSubmitting}
                  variant="contained"
                  startIcon={<Telegram />}
                  onClick={handleSendMemberVerificationRequest}
                >
                  Request to verify
                </LoadingButton>
              )}
              {state.formData?.status?.name !== "In Review" && (
                <LoadingButton
                  loading={state.isFormSubmitting}
                  type="submit"
                  variant="contained"
                >
                  {state.selectedMemberId ? "Update" : "Create"}
                </LoadingButton>
              )}
            </DialogActions>
          </Box>
        )}
      </GeneralDialog>
      <ApproveOrRejectNhg refetchNhgDetails={refetchNhgDetails} />
      <ApproveOrRejectMember refetchMemberDetails={getMemberList} />
    </PageLayout>
  );
};
