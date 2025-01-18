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
  const { state, formValidator, handleFormChange, handleUpdate } =
    useMeetingAgendas();

  const { handleDialogClose, handleOpenUpdateDialog } = useDialog();

  const columns = [
    { label: "No", field: "no" },
    { label: "ID", field: "id" },
    { label: "Agenda", field: "name", cell: (row) => row.agenda.name },
    {
      label: "Actions",
      field: "actions",
      cell: (row) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleOpenUpdateDialog(row)}>
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
        title="Meeting Agendas"
        headerAction={
          <InputControl
            type="search"
            placeholder="Search here.."
            sx={{ width: 300 }}
          />
        }
        columns={columns}
        rows={state.agendas}
      />
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
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </DialogSlide>
    </Stack>
  );
};

const useDialog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDialogClose = () => {
    navigate(location.pathname, { replace: true });
  };

  const handleOpenUpdateDialog = () => {
    navigate(location.pathname + "?update-agenda");
  };

  return {
    handleDialogClose,
    handleOpenUpdateDialog,
  };
};
