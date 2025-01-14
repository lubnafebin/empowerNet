import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import {
  AlertRowAction,
  BasicTable,
  DialogSlide,
  useAlertDialogContext,
} from "../../../shared";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useRoles } from "../hooks";

export const Roles = () => {
  const { deleteRoleHandler } = useRoles();
  const { handleDialogClose, handleOpenCreateDialog, handleDeleteRole } =
    useDialog(deleteRoleHandler);

  const columns = [
    { label: "No", field: "no" },
    { label: "Role ID", field: "roleId" },
    { label: "Role Name", field: "roleName" },
    { label: "Created At", field: "createdAt" },
    {
      label: "Actions",
      field: "actions",
      cell: () => (
        <Stack direction="row" spacing={1}>
          <IconButton>
            <Visibility />
          </IconButton>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton onClick={handleDeleteRole}>
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];
  const rows = [
    {
      no: 1,
      roleId: 1,
      roleName: "Member",
      createdAt: "2021-10-12",
    },
    {
      no: 2,
      roleId: 2,
      roleName: "President",
      createdAt: "2021-10-12",
    },
    {
      no: 3,
      roleId: 3,
      roleName: "Secretary",
      createdAt: "2021-10-12",
    },
    {
      no: 4,
      roleId: 4,
      roleName: "Secretary",
      createdAt: "2021-10-12",
    },
    {
      no: 5,
      roleId: 5,
      roleName: "Secretary",
      createdAt: "2021-10-12",
    },
    {
      no: 6,
      roleId: 6,
      roleName: "Secretary",
      createdAt: "2021-10-12",
    },
  ];
  return (
    <Stack>
      <BasicTable
        title="Roles"
        headerAction={
          <Button variant="contained" onClick={handleOpenCreateDialog}>
            New Role
          </Button>
        }
        columns={columns}
        rows={rows}
      />
      <DialogSlide
        dialogValue="?create-role"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent sx={{ minWidth: 500, p: 2 }}>
          <Stack spacing={2}>
            <TextField label="Role" variant="outlined" fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleDialogClose}>
            Close
          </Button>
          <Button variant="contained">Create</Button>
        </DialogActions>
      </DialogSlide>
    </Stack>
  );
};

const useDialog = (deleteRoleHandler) => {
  const { setAlert } = useAlertDialogContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDeleteRole = (row) => {
    setAlert((draft) => {
      draft.open = true;
      draft.title = "Delete Role?";
      draft.description = "Are you sure?  Do you want to delete the role?";
      draft.dialogValue = "?deleteRole";
      draft.rowAction = (
        <AlertRowAction
          onClick={async () => {
            await deleteRoleHandler(row.id);
          }}
        />
      );
    });
  };

  const handleOpenCreateDialog = () => {
    navigate(location.pathname + "?create-role");
  };

  const handleDialogClose = () => {
    navigate(location.pathname, { replace: true });
  };

  return {
    handleDialogClose,
    handleOpenCreateDialog,
    handleDeleteRole,
  };
};
