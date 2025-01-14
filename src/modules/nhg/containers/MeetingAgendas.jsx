import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { BasicTable, DialogSlide, InputControl } from "../../../shared";
import { Delete, Edit } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeetingAgendas } from "../hooks/useMeetingAgendas";

export const MeetingAgendas = () => {
  const { state, formValidator, handleFormChange } = useMeetingAgendas();

  const { handleDialogClose, handleOpenCreateDialog, handleOpenUpdateDialog } =
    useDialog();

  const columns = [
    { label: "No", field: "no" },
    { label: "ID", field: "id" },
    { label: "Agenda", field: "agenda" },
    {
      label: "Actions",
      field: "actions",
      cell: () => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleOpenUpdateDialog}>
            <Edit />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const nameHelperText = formValidator.current.message(
    "name",
    state.formData.name,
    "required|alpha_space",
  );

  const noteHelperText = formValidator.current.message(
    "note",
    state.formData.note,
    "required|alpha_space",
  );

  return (
    <Stack spacing={3}>
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
              New Agenda
            </Button>
          </Stack>
        }
        columns={columns}
        rows={state.agendas}
      />
      <DialogSlide
        dialogValue="?create-agenda"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Create New Agenda</DialogTitle>
        <DialogContent sx={{ minWidth: 400, p: 2 }}>
          <Stack spacing={2}>
            <InputControl
              label="Name"
              name="name"
              value={state.formData.name}
              helperText={nameHelperText}
              error={Boolean(nameHelperText)}
              onChange={handleFormChange}
            />
            <TextField
              label="Note"
              name="note"
              value={state.formData.note}
              helperText={noteHelperText}
              error={Boolean(noteHelperText)}
              onChange={handleFormChange}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleDialogClose}>
            Close
          </Button>
          <Button variant="contained">Create</Button>
        </DialogActions>
      </DialogSlide>
      <DialogSlide
        dialogValue="?update-agenda"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Update Agenda</DialogTitle>
        <DialogContent sx={{ minWidth: 400, p: 2 }}>
          <Stack spacing={2}>
            <InputControl
              label="Name"
              name="name"
              value={state.formData.name}
              helperText={nameHelperText}
              error={Boolean(nameHelperText)}
              onChange={handleFormChange}
            />
            <TextField
              label="Note"
              name="note"
              value={state.formData.note}
              helperText={noteHelperText}
              error={Boolean(noteHelperText)}
              onChange={handleFormChange}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleDialogClose}>
            Close
          </Button>
          <Button variant="contained">Update</Button>
        </DialogActions>
      </DialogSlide>
    </Stack>
  );
};

const useDialog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenCreateDialog = () => {
    navigate(location.pathname + "?create-agenda");
  };

  const handleDialogClose = () => {
    navigate(location.pathname, { replace: true });
  };

  const handleOpenUpdateDialog = () => {
    navigate(location.pathname + "?update-agenda");
  };

  return {
    handleDialogClose,
    handleOpenCreateDialog,
    handleOpenUpdateDialog,
  };
};
