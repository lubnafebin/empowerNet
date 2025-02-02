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
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  AssignmentOutlined,
  CurrencyRupeeRounded,
  DeleteOutlineRounded,
} from "@mui/icons-material";
import { useMinuteList } from "../hooks";
import { useNavigate } from "react-router-dom";
import { utilFunctions } from "../../../utils";

export const MinuteList = () => {
  const navigate = useNavigate();
  const {
    state,
    formValidator,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
  } = useMinuteList();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Date",
        accessorKey: "date",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Place",
        accessorKey: "place",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Participants",
        cell: ({
          row: {
            original: { participants },
          },
        }) => {
          return (
            <Typography fontWeight={400} fontSize={14}>
              {participants.length}
            </Typography>
          );
        },
        enableSorting: true,
        placement: "right",
        meta: { align: "center" },
      },
      {
        header: "Meeting No",
        accessorKey: "meetingNo",
        enableSorting: true,
        placement: "center",
        meta: { align: "center" },
      },
      {
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        placement: "right",
        meta: { cellStyle: { width: 70 } },
        cell: ({
          row: {
            original: { id, date },
          },
        }) => (
          <Stack flexDirection="row">
            <Tooltip title="Agendas" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => navigate(`${id}/agendas`)}
              >
                <AssignmentOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Transactions" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() =>
                  navigate(`${id}/transactions`, {
                    state: { minuteDate: utilFunctions.formatDate(date) },
                  })
                }
              >
                <CurrencyRupeeRounded fontSize="small" />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Delete Meeting" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => toggleModel({ type: "deleteWard", id })}
              >
                <DeleteOutlineRounded fontSize="small" />
              </IconButton>
            </Tooltip> */}
          </Stack>
        ),
      },
    ],
    [],
  );

  const helperText = {
    date: formValidator.current.message(
      "date",
      state.formData.date,
      "required",
    ),
    place: formValidator.current.message(
      "place",
      state.formData.place,
      "required",
    ),
  };

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Minutes",
    },
  ];

  return (
    <PageLayout
      title="Minutes"
      breadcrumbs={breadcrumbs}
      actionSection={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => toggleModel("new-minute")}
        >
          New Minute
        </Button>
      }
    >
      <ReactTable
        columns={columns}
        data={state.minuteList.options}
        loading={state.isTableLoading}
      />

      <GeneralDialog dialogValue={"?new-minute"}>
        <DialogHeader title="New Minute" />
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
                  label="Date"
                  type="date"
                  name="date"
                  value={state.formData.date}
                  onChange={(newValue) =>
                    handleFormChange({
                      target: { name: "date", value: newValue },
                    })
                  }
                  error={Boolean(helperText.date)}
                  helperText={helperText.date}
                />
                <InputControl
                  required
                  multiline
                  minRows={1}
                  maxRows={2}
                  size="small"
                  label="Place"
                  value={state.formData.place}
                  name="place"
                  error={Boolean(helperText.place)}
                  helperText={helperText.place}
                  onChange={handleFormChange}
                />
                <InputControl
                  type="dropdown"
                  multiple
                  size="small"
                  options={state.membersList.options}
                  isOptionEqualToValue={(option, current) => {
                    return option.id === current.id;
                  }}
                  getOptionLabel={(option) => option.user.name}
                  disableCloseOnSelect
                  onChange={(_, value) =>
                    handleFormChange({
                      target: { name: "participantsIds", value },
                    })
                  }
                  value={state.formData.participantsIds ?? []}
                  renderOption={(props, option) => {
                    // eslint-disable-next-line react/prop-types
                    const { key, ...optionProps } = props;
                    return (
                      <ListItem
                        key={key}
                        {...optionProps}
                        sx={{ gap: "8px", display: "flex" }}
                      >
                        <Avatar
                          src={option.user.profile?.url}
                          alt="avatar"
                          sx={{ width: 36, height: 36, fontSize: 14 }}
                        >
                          {option.user.name[0]}
                        </Avatar>
                        <ListItemText
                          primary={option.user.name}
                          secondary={option.user.email}
                        />
                      </ListItem>
                    );
                  }}
                  renderInput={(props) => (
                    <TextField
                      label="Participants"
                      {...props}
                      placeholder="Select Participants"
                    />
                  )}
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
