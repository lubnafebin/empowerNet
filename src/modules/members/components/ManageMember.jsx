import {
  DialogHeader,
  FileCard,
  GeneralDialog,
  InputControl,
  LoadingButton,
  VisuallyHiddenInput,
} from "../../../shared";
import {
  Avatar,
  Box,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { PictureAsPdf, Telegram } from "@mui/icons-material";
import SignatureIcon from "../../../assets/signature-icon-lite.svg";
import SignatureDarkIcon from "../../../assets/signature-icon-dark.svg";
import AadharIcon from "../../../assets/aadhar-icon-lite.svg";
import AadharDarkIcon from "../../../assets/aadhar-icon-dark.svg";
import propTypes from "prop-types";
import { useUtilFunctions } from "../../../utils";

export const ManageMember = ({
  state,
  handleResetFormData,
  handleFormChange,
  formValidator,
  handleFormSubmit,
  handleSendMemberVerificationRequest,
  dialogValue,
}) => {
  const { checkPermission } = useUtilFunctions();
  const createMemberPermission = checkPermission("member.id.POST");
  const updateMemberPermission = checkPermission("member.id.PUT");
  const verifyMemberPermission = checkPermission("member.VERIFY");

  const theme = useTheme();
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

  return (
    <GeneralDialog
      disableCloseOnBackgroundClick={false}
      dialogValue={dialogValue}
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
                      error={Boolean(helperText.districtId)}
                      helperText={helperText.districtId}
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
                      onDelete={
                        updateMemberPermission
                          ? () =>
                              handleFormChange({
                                target: {
                                  name: "aadharAttachment",
                                  value: null,
                                },
                              })
                          : undefined
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
                      onDelete={
                        updateMemberPermission
                          ? () =>
                              handleFormChange({
                                target: {
                                  name: "signatureAttachment",
                                  value: null,
                                },
                              })
                          : undefined
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
            <>
              {["Draft", "Rejected"].includes(state.formData?.status?.name) &&
                verifyMemberPermission && (
                  <LoadingButton
                    loading={state.isFormSubmitting}
                    variant="contained"
                    startIcon={<Telegram />}
                    onClick={handleSendMemberVerificationRequest}
                  >
                    Request to verify
                  </LoadingButton>
                )}
              {state.formData?.status?.name !== "In Review" &&
                (createMemberPermission || updateMemberPermission) && (
                  <LoadingButton
                    loading={state.isFormSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    {state.selectedMemberId ? "Update" : "Create"}
                  </LoadingButton>
                )}
            </>
          </DialogActions>
        </Box>
      )}
    </GeneralDialog>
  );
};

ManageMember.propTypes = {
  state: propTypes.object,
  handleResetFormData: propTypes.func,
  handleFormChange: propTypes.func,
  formValidator: propTypes.object,
  handleSendMemberVerificationRequest: propTypes.func,
  dialogValue: propTypes.string,
  handleFormSubmit: propTypes.func,
};
