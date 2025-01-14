import { Edit, Visibility } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BasicTable, DialogSlide, InputControl } from "../../../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useMembersListContainer } from "../hooks/useMembersListContainer";

export const MembersList = () => {
  const {
    handleUpdate,
    handleCreate,
    handleFileChange,
    handleInputChange,
    state,
    setState,
    formValidator,
  } = useMembersListContainer();

  const {
    handleDialogClose,
    handleOpenCreateDialog,
    handleOpenUpdateDialog,
    handleOpenMemberViewDialog,
  } = useDialog(setState);

  const nameHelperText = formValidator.current.message(
    "name",
    state.formData.name,
    "required|alpha_space",
  );

  const emailHelperText = formValidator.current.message(
    "email",
    state.formData.email,
    "required|email",
  );

  const contactNoHelperText = formValidator.current.message(
    "contactno",
    state.formData.contactNo,
    "required|phone",
  );

  const aadhaarNoHelperText = formValidator.current.message(
    "adharno",
    state.formData.aadharNo,
    "required|numeric",
  );

  const addressHelperText = formValidator.current.message(
    "address",
    state.formData.addressLine1,
    "required",
  );

  const profileHelperText = formValidator.current.message(
    "profile",
    state.formData.profile,
    "required",
  );

  const aadharAttachmentHelperText = formValidator.current.message(
    "aadharAttachment",
    state.formData.aadharAttachment,
    "required",
  );

  const signatureAttachmentHelperText = formValidator.current.message(
    "signatureAttachment",
    state.formData.signatureAttachment,
    "required",
  );

  const districtHelperText = formValidator.current.message(
    "district",
    state.formData.districtId,
    "required",
  );

  const postcodeHelperText = formValidator.current.message(
    "postcode",
    state.formData.postcode,
    "required|numeric",
  );
  const columns = [
    { label: "Id", field: "id" },
    {
      label: "Profile",
      field: "profile",
      cell: (row) => {
        const profileUrl =
          row.attachments.find((att) => att.id === row.user.profileId)?.url ||
          "";
        return (
          <Avatar
            sx={{ bgcolor: "primary.main" }}
            alt="Profile"
            src={profileUrl}
          >
            {row.user.name[0]}
          </Avatar>
        );
      },
    },
    {
      label: "Name",
      field: "name",
      cell: (row) => row.user?.name || "N/A",
    },
    {
      label: "Email",
      field: "email",
      cell: (row) => row.user?.email || "N/A",
    },
    {
      label: "Aadhaar No",
      field: "aadharNo",
      cell: (row) => row.address?.aadharNo || "N/A",
    },
    {
      label: "Contact No",
      field: "contactNo",
      cell: (row) => row.address?.contactNo || "N/A",
    },
    {
      label: "Address",
      field: "address",
      cell: (row) => row.address?.addressLine1 || "N/A",
    },
    {
      label: "Signature",
      field: "signatureAttachment",
      cell: (row) => {
        const signatureUrl =
          row.attachments.find((att) => att.url.includes("signatureattachment"))
            ?.url || "";
        return signatureUrl ? (
          <a href={signatureUrl} target="_blank" rel="noopener noreferrer">
            View Signature
          </a>
        ) : (
          "No Signature"
        );
      },
    },
    {
      label: "Role",
      field: "role",
      cell: (row) => row.role?.name || "N/A",
    },
    {
      label: "Status",
      field: "status.name",
      cell: (row) => (
        <Chip
          label={row.status.name}
          color={
            row.status.name === "Not Verified"
              ? "warning"
              : row.status.name === "Approved"
                ? "success"
                : "error"
          }
        />
      ),
    },
    {
      label: "Actions",
      field: "actions",
      cell: (row) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleOpenMemberViewDialog(row)}>
            <Visibility />
          </IconButton>
          <IconButton onClick={() => handleOpenUpdateDialog(row)}>
            <Edit />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Stack>
      <BasicTable
        title="Members "
        headerAction={
          <Stack direction="row" spacing={1}>
            <InputControl
              type="search"
              placeholder="Search here.."
              sx={{ width: 300 }}
            />
            <Button variant="contained">Request for ADS verification</Button>
            <Button variant="contained" onClick={handleOpenCreateDialog}>
              New Member
            </Button>
          </Stack>
        }
        columns={columns}
        rows={state.members}
      />
      <DialogSlide
        dialogValue="?create-member"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Create New Member</DialogTitle>
        <DialogContent sx={{ minWidth: 500, p: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <InputControl
                label="Name"
                name="name"
                value={state.formData.name}
                helperText={nameHelperText}
                error={Boolean(nameHelperText)}
                onChange={handleInputChange}
              />
              <InputControl
                label="Email"
                name="email"
                value={state.formData.email}
                helperText={emailHelperText}
                error={Boolean(emailHelperText)}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <InputControl
                label="Contact No"
                name="contactNo"
                value={state.formData.contactNo}
                helperText={contactNoHelperText}
                error={Boolean(contactNoHelperText)}
                onChange={handleInputChange}
              />
              <InputControl
                label="Aadhaar No"
                name="aadharNo"
                value={state.formData.aadharNo}
                helperText={aadhaarNoHelperText}
                error={Boolean(aadhaarNoHelperText)}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Autocomplete
                value={
                  Array.isArray(state.districts)
                    ? state.districts.find(
                        (district) => district.id === state.formData.districtId,
                      ) || null
                    : null
                }
                onChange={(event, newValue) =>
                  handleInputChange({
                    target: { name: "districtId", value: newValue?.id || "" },
                  })
                }
                getOptionLabel={(option) => (option ? option.name : "")}
                options={Array.isArray(state.districts) ? state.districts : []}
                disableClearable
                noOptionsText="No districts available"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Districts"
                    error={Boolean(districtHelperText)}
                    helperText={districtHelperText}
                    sx={{ width: "100%" }}
                  />
                )}
              />
              <InputControl
                label="Postcode"
                name="postcode"
                value={state.formData.postcode}
                helperText={postcodeHelperText}
                error={Boolean(postcodeHelperText)}
                onChange={handleInputChange}
                sx={{ width: "100%" }}
              />
            </Stack>
            <InputControl
              label="Address"
              name="addressLine1"
              value={state.formData.addressLine1}
              helperText={addressHelperText}
              error={Boolean(addressHelperText)}
              onChange={handleInputChange}
            />
            <InputControl
              label="Address"
              name="addressLine2"
              value={state.formData.addressLine2}
              helperText={addressHelperText}
              error={Boolean(addressHelperText)}
              onChange={handleInputChange}
            />
            <Stack spacing={2}>
              <h4>Attachments</h4>
              <TextField
                type="file"
                name="aadharAttachment"
                // helperText={aadharAttachmentHelperText}
                // error={Boolean(aadharAttachmentHelperText)}
                onChange={handleFileChange}
              />
              <TextField
                type="file"
                name="signatureAttachment"
                // helperText={signatureAttachmentHelperText}
                // error={Boolean(signatureAttachmentHelperText)}
                onChange={handleFileChange}
              />
              <TextField
                type="file"
                name="profile"
                // helperText={profileHelperText}
                // error={Boolean(profileHelperText)}
                onChange={handleFileChange}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleDialogClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </DialogSlide>
      <DialogSlide
        dialogValue="?update-member"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Update Member</DialogTitle>
        <DialogContent sx={{ minWidth: 500, p: 2 }}>
          <Stack spacing={2}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 80,
                height: 80,
                fontSize: 24,
              }}
              alt="Profile"
              src={
                state.formData.profile instanceof File
                  ? URL.createObjectURL(state.formData.profile)
                  : state.formData.profile
              }
            >
              {state.formData.name?.[0] || ""}
            </Avatar>
            <Stack direction="row" spacing={2}>
              <InputControl
                label="Name"
                name="name"
                value={state.formData.name}
                helperText={nameHelperText}
                error={Boolean(nameHelperText)}
                onChange={(e) =>
                  setState((draft) => {
                    draft.formData.name = e.target.value;
                  })
                }
              />
              <InputControl
                label="Email"
                name="email"
                value={state.formData.email}
                helperText={emailHelperText}
                error={Boolean(emailHelperText)}
                onChange={(e) =>
                  setState((draft) => {
                    draft.formData.email = e.target.value;
                  })
                }
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <InputControl
                label="Contact No"
                name="contactNo"
                value={state.formData.contactNo}
                helperText={contactNoHelperText}
                error={Boolean(contactNoHelperText)}
                onChange={(e) =>
                  setState((draft) => {
                    draft.formData.contactNo = e.target.value;
                  })
                }
              />
              <InputControl
                label="Aadhaar No"
                name="aadharNo"
                value={state.formData.aadharNo}
                helperText={aadhaarNoHelperText}
                error={Boolean(aadhaarNoHelperText)}
                onChange={(e) =>
                  setState((draft) => {
                    draft.formData.aadharNo = e.target.value;
                  })
                }
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Autocomplete
                value={
                  Array.isArray(state.districts)
                    ? state.districts.find(
                        (district) => district.id === state.formData.districtId,
                      ) || null
                    : null
                }
                onChange={(event, newValue) =>
                  handleInputChange({
                    target: { name: "districtId", value: newValue?.id || "" },
                  })
                }
                getOptionLabel={(option) => (option ? option.name : "")}
                options={Array.isArray(state.districts) ? state.districts : []}
                disableClearable
                noOptionsText="No districts available"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Districts"
                    error={Boolean(districtHelperText)}
                    helperText={districtHelperText}
                    sx={{ width: "100%" }}
                  />
                )}
                loading={state.districts.length === 0}
              />
              <InputControl
                label="Postcode"
                name="postcode"
                value={state.formData.postcode}
                helperText={postcodeHelperText}
                error={Boolean(postcodeHelperText)}
                onChange={(e) =>
                  setState((draft) => {
                    draft.formData.postcode = e.target.value;
                  })
                }
                sx={{ width: "100%" }}
              />
            </Stack>
            <InputControl
              label="Address"
              name="addressLine1"
              value={state.formData.addressLine1}
              helperText={addressHelperText}
              error={Boolean(addressHelperText)}
              onChange={(e) =>
                setState((draft) => {
                  draft.formData.addressLine1 = e.target.value;
                })
              }
            />
            <InputControl
              label="Address"
              name="addressLine2"
              value={state.formData.addressLine2}
              helperText={addressHelperText}
              error={Boolean(addressHelperText)}
              onChange={(e) =>
                setState((draft) => {
                  draft.formData.addressLine2 = e.target.value;
                })
              }
            />
            <Stack spacing={2}>
              <h4>Attachments</h4>
              <TextField
                type="file"
                name="aadharAttachment"
                helperText={aadharAttachmentHelperText}
                error={Boolean(aadharAttachmentHelperText)}
                // onChange={handleFileChange}
              />
              <TextField
                type="file"
                name="signatureAttachment"
                helperText={signatureAttachmentHelperText}
                error={Boolean(signatureAttachmentHelperText)}
                // onChange={handleFileChange}
              />
              <TextField
                type="file"
                name="profile"
                helperText={profileHelperText}
                error={Boolean(profileHelperText)}
                // onChange={handleFileChange}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleDialogClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </DialogSlide>
      <DialogSlide
        dialogValue="?view-member"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Member Details</DialogTitle>
        <DialogContent sx={{ minWidth: 500, p: 2 }}>
          <Stack spacing={2}>
            {/* Profile Picture */}
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 80,
                height: 80,
                fontSize: 24,
              }}
              alt="Profile"
              src={
                state.formData.profile instanceof File
                  ? URL.createObjectURL(state.formData.profile)
                  : state.formData.profile
              }
            >
              {state.formData.name?.[0] || ""}
            </Avatar>

            {/* Name and Email */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Name"
                value={state.formData.name}
                disabled
                fullWidth
              />
              <TextField
                label="Email"
                value={state.formData.email}
                disabled
                fullWidth
              />
            </Stack>

            {/* Contact No and Aadhaar No */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Contact No"
                value={state.formData.contactNo}
                disabled
                fullWidth
              />
              <TextField
                label="Aadhaar No"
                value={state.formData.aadharNo}
                disabled
                fullWidth
              />
            </Stack>

            {/* District and Postcode */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="District"
                value={
                  Array.isArray(state.districts)
                    ? state.districts.find(
                        (district) => district.id === state.formData.districtId,
                      )?.name || ""
                    : ""
                }
                disabled
                fullWidth
              />
              <TextField
                label="Postcode"
                value={state.formData.postcode}
                disabled
                fullWidth
              />
            </Stack>

            {/* Address */}
            <TextField
              label="Address Line 1"
              value={state.formData.addressLine1}
              disabled
              fullWidth
            />
            <TextField
              label="Address Line 2"
              value={state.formData.addressLine2}
              disabled
              fullWidth
            />

            {/* Attachments */}
            <Stack spacing={2}>
              <h4>Attachments</h4>
              <Typography variant="body2">
                <strong>Aadhaar Attachment:</strong>{" "}
                {state.formData.aadharAttachment || "No file uploaded"}
              </Typography>
              <Typography variant="body2">
                <strong>Signature Attachment:</strong>{" "}
                {state.formData.signatureAttachment || "No file uploaded"}
              </Typography>
              <Typography variant="body2">
                <strong>Profile:</strong>{" "}
                {state.formData.profile || "No file uploaded"}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </DialogSlide>
    </Stack>
  );
};

const useDialog = (setState) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenCreateDialog = () => {
    navigate(location.pathname + "?create-member");
  };

  const handleDialogClose = () => {
    navigate(location.pathname, { replace: true });
  };

  const handleOpenUpdateDialog = (row) => {
    setState((draft) => {
      draft.formData = {
        name: row.user?.name || "",
        email: row.user?.email || "",
        contactNo: row.address?.contactNo || "",
        aadharNo: row.address?.aadharNo || "",
        addressLine1: row.address?.addressLine1 || "",
        addressLine2: row.address?.addressLine2 || "",
        districtId: row.address?.districtId || "",
        postcode: row.address?.postcode || "",
        profile:
          row.attachments.find((att) => att.id === row.user.profileId)?.url ||
          "",
        aadharAttachment:
          row.attachments.find((att) => att.url.includes("aadharattachment"))
            ?.url || "",
        signatureAttachment:
          row.attachments.find((att) => att.url.includes("signatureattachment"))
            ?.url || "",
      };
      draft.selectedMemberId = row.id;
    });
    navigate(location.pathname + "?update-member");
  };

  const handleOpenMemberViewDialog = (row) => {
    setState((draft) => {
      draft.formData = {
        name: row.user?.name || "",
        email: row.user?.email || "",
        contactNo: row.address?.contactNo || "",
        aadharNo: row.address?.aadharNo || "",
        addressLine1: row.address?.addressLine1 || "",
        addressLine2: row.address?.addressLine2 || "",
        districtId: row.address?.districtId || "",
        postcode: row.address?.postcode || "",
        profile:
          row.attachments.find((att) => att.id === row.user.profileId)?.url ||
          "",
        aadharAttachment:
          row.attachments.find((att) => att.url.includes("aadharattachment"))
            ?.url || "",
        signatureAttachment:
          row.attachments.find((att) => att.url.includes("signatureattachment"))
            ?.url || "",
      };
    });
    navigate(location.pathname + "?view-member");
  };

  return {
    handleDialogClose,
    handleOpenCreateDialog,
    handleOpenUpdateDialog,
    handleOpenMemberViewDialog,
  };
};
