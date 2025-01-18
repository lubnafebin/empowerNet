import { ArrowForward, Visibility } from "@mui/icons-material";
import { BasicTable, DialogSlide, InputControl } from "../../../shared";
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeetingMinutes } from "../hooks";

export const MeetingMinutes = () => {
  const {
    state,
    handleFormChange,
    formValidator,
    handleCreate,
    handleNavigate,
  } = useMeetingMinutes();
  const { handleDialogClose, handleOpenCreateDialog, handleOpenUpdateDialog } =
    useDialog();

  const columns = [
    { label: "Id", field: "id" },
    { label: "Date", field: "date" },
    { label: "Place", field: "place" },
    {
      label: "Total Selected Participants",
      field: "totalSelectedParticipants",
      cell: (row) => row.participants.length,
    },
    { label: "Current Meeting No", field: "meetingNo" },
    {
      label: "Actions",
      field: "actions",
      cell: () => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleOpenUpdateDialog}>
            <Visibility />
          </IconButton>
          <IconButton onClick={handleNavigate()}>
            <ArrowForward />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const meetingNoHelperText = formValidator.current.message(
    "no",
    state.formData.wardNo,
    "required|numeric",
  );
  // const dateHelperText = formValidator.current.message(
  //   "date",
  //   state.formData.date,
  //   "",
  // );

  const placeHelperText = formValidator.current.message(
    "place",
    state.formData.place,
    "required|alpha_space",
  );
  const participantHelperText = formValidator.current.message(
    "totalparticipants",
    state.formData.totalparticipants,
    "required|numeric",
  );

  return (
    <Stack>
      <BasicTable
        title="Meeting Minutes"
        headerAction={
          <Stack direction="row" spacing={1}>
            <InputControl
              type="search"
              placeholder="Search here.."
              sx={{ width: 300 }}
            />
            <Button variant="contained" onClick={handleOpenCreateDialog}>
              New Meeting
            </Button>
          </Stack>
        }
        columns={columns}
        rows={state.minutes}
      />
      <DialogSlide
        dialogValue="?create-meeting"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Create New Meeting</DialogTitle>
        <DialogContent sx={{ minWidth: 500, p: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                type="date"
                name="date"
                value={state.formData.date}
                // helperText={dateHelperText}
                // error={Boolean(dateHelperText)}
                onChange={handleFormChange}
                fullWidth
              />
              <InputControl
                label="Meeting No"
                name="meetingNo"
                value={state.formData.meetingNo || ""}
                helperText={meetingNoHelperText}
                error={Boolean(meetingNoHelperText)}
                onChange={handleFormChange}
              />
            </Stack>
            <InputControl
              label="Place"
              name="place"
              value={state.formData.place || ""}
              helperText={placeHelperText}
              error={Boolean(placeHelperText)}
              onChange={handleFormChange}
            />
            <Autocomplete
              multiple
              value={state.formData.participants || []}
              onChange={(event, newValue) =>
                handleFormChange({
                  target: { name: "participants", value: newValue },
                })
              }
              getOptionLabel={(option) => option.name || ""}
              options={state.members}
              disableClearable
              getOptionSelected={(option, value) => option.id === value.id} // Make sure option selection is based on unique ID
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Participants"
                  error={Boolean(participantHelperText)}
                  helperText={participantHelperText}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDialogClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </DialogSlide>
      <DialogSlide
        dialogValue="?update-meeting"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Update Meeting</DialogTitle>
        <DialogContent sx={{ minWidth: 500, p: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <InputControl
                type="date"
                name="date"
                value={state.formData.date || ""}
                // helperText={dateHelperText}
                // error={Boolean(dateHelperText)}
                onChange={handleFormChange}
              />
              <InputControl
                label="Meeting No"
                name="meetingNo"
                value={state.formData.meetingNo || ""}
                helperText={meetingNoHelperText}
                error={Boolean(meetingNoHelperText)}
                onChange={handleFormChange}
              />
            </Stack>
            <InputControl
              label="Place"
              name="place"
              value={state.formData.place || ""}
              helperText={placeHelperText}
              error={Boolean(placeHelperText)}
              onChange={handleFormChange}
            />
            <Autocomplete
              multiple
              value={state.formData.participants || []}
              onChange={(event, newValue) =>
                handleFormChange({
                  target: { name: "participants", value: newValue },
                })
              }
              getOptionLabel={(option) => option.name || ""}
              options={state.members}
              disableClearable
              getOptionSelected={(option, value) => option.id === value.id} // Make sure option selection is based on unique ID
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Participants"
                  error={Boolean(participantHelperText)}
                  helperText={participantHelperText}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDialogClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </DialogSlide>
    </Stack>
  );
};
const useDialog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenCreateDialog = () => {
    navigate(location.pathname + "?create-meeting");
  };

  const handleDialogClose = () => {
    navigate(location.pathname, { replace: true });
  };

  const handleOpenUpdateDialog = () => {
    navigate(location.pathname + "?update-meeting");
  };

  return {
    handleDialogClose,
    handleOpenCreateDialog,
    handleOpenUpdateDialog,
  };
};
