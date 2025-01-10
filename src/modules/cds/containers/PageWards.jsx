import {
  Stack,
  Button,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { BasicTable } from "../../../shared/components/tables/BasicTable";
import { Delete, Edit } from "@mui/icons-material";
import { useAlertDialogContext } from "../../../shared/hooks";
import { AlertRowAction, DialogSlide, InputControl } from "../../../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { usePageWards } from "../hooks";

export const PageWards = () => {
  const {
    handleUpdate,
    handleCreate,
    state,
    setState,
    formValidator,
    handleFormChange,
    deleteWardHandler,
  } = usePageWards();

  const nameHelperText = formValidator.current.message(
    "name",
    state.formData.name,
    "required|alpha_space",
  );
  const wardNoHelperText = formValidator.current.message(
    "wardNo",
    state.formData.wardNo,
    "required|numeric",
  );

  const {
    handleDeleteWard,
    handleOpenCreateDialog,
    handleDialogClose,
    handleOpenUpdateDialog,
  } = usePageWardsDialog(deleteWardHandler, setState);

  const columns = [
    { label: "Id", field: "id" },
    { label: "Ward No", field: "wardNo" },
    { label: "Ward", field: "name" },
    { label: "Created At", field: "createdAt" },
    { label: "ADS Name", field: "adsId" },
    {
      label: "Actions",
      field: "actions",
      cell: (row) => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" size="small">
            Update Ads
          </Button>
          <IconButton onClick={() => handleOpenUpdateDialog(row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteWard(row)}>
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Stack>
      <BasicTable
        title="Wards"
        headerAction={
          <Button variant="contained" onClick={handleOpenCreateDialog}>
            New Wards
          </Button>
        }
        columns={columns}
        rows={state.wards}
      />
      <DialogSlide
        dialogValue="?create-ward"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Create New Ward</DialogTitle>
        <DialogContent sx={{ minWidth: 400, p: 2 }}>
          <Stack spacing={2}>
            <InputControl
              label="Name"
              name="name"
              value={state.formData.name || ""}
              helperText={nameHelperText}
              error={Boolean(nameHelperText)}
              onChange={handleFormChange}
            />
            <InputControl
              label="No"
              name="wardNo"
              value={state.formData.wardNo || ""}
              helperText={wardNoHelperText}
              error={Boolean(wardNoHelperText)}
              onChange={handleFormChange}
            />
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
        dialogValue="?update-ward"
        disableCloseOnBackgroundClick={false}
      >
        <DialogTitle>Update Ward Details</DialogTitle>
        <DialogContent sx={{ minWidth: 400, p: 2 }}>
          <Stack spacing={2}>
            <InputControl
              label="Name"
              name="name"
              value={state.formData.name}
              helperText={nameHelperText}
              error={Boolean(nameHelperText)}
              onChange={(e) =>
                setState((draft) => {
                  draft.formData.name = e.target.value; // Update state
                })
              }
            />
            <InputControl
              label="No"
              name="wardNo"
              value={state.formData.wardNo}
              helperText={wardNoHelperText}
              error={Boolean(wardNoHelperText)}
              onChange={(e) =>
                setState((draft) => {
                  draft.formData.wardNo = e.target.value; // Update state
                })
              }
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

const usePageWardsDialog = (deleteWardHandler, setState) => {
  const { setAlert } = useAlertDialogContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDeleteWard = (row) => {
    setAlert((draft) => {
      draft.open = true;
      draft.title = "Delete Ward?";
      draft.description = "Are you sure?  Do you want to delete the ward?";
      draft.dialogValue = "?deleteWard";
      draft.rowAction = (
        <AlertRowAction
          onClick={async () => {
            await deleteWardHandler(row.id);
          }}
        />
      );
    });
  };

  const handleOpenCreateDialog = () => {
    navigate(location.pathname + "?create-ward");
  };

  const handleOpenUpdateDialog = (row) => {
    setState((draft) => {
      draft.formData = {
        name: row.name || "", // Populate name from row
        wardNo: row.wardNo || "", // Populate wardNo from row
      };
      draft.selectedWardId = row.id;
    });

    navigate(location.pathname + "?update-ward");
  };

  const handleDialogClose = () => {
    navigate(location.pathname, { replace: true });
  };

  return {
    handleDeleteWard,
    handleOpenCreateDialog,
    handleDialogClose,
    handleOpenUpdateDialog,
  };
};
