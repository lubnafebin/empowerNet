import { InputControl, LoadingButton, PageLayout } from "../../../shared";
import { useImmer } from "use-immer";
import React from "react";
import { useParams } from "react-router-dom";
import { utilFunctions } from "../../../utils";
import { getMeetingAgendaDetailsApi, updateAgendaApi } from "../apis";
import { CircularProgress, Stack } from "@mui/material";
import { enqueueSnackbar } from "notistack";

export const ManageAgenda = () => {
  const { state, handleFormChange, handleUpdate } = useManageAgenda();
  const { meetingId } = useParams();

  const breadcrumbs = [
    { title: "Dashboard", href: "/" },
    { title: "Minutes", href: "/nhg/minutes" },
    { title: "Agendas", href: `/nhg/minutes/${meetingId}/agendas` },
    { title: state.agenda.details.name },
  ];

  return (
    <PageLayout
      title={state.agenda.details.name}
      breadcrumbs={breadcrumbs}
      actionSection={
        <LoadingButton
          loading={state.updateButtonLoading}
          onClick={handleUpdate}
        >
          Update
        </LoadingButton>
      }
    >
      {state.agenda.loading ? (
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="center"
          height="calc(100vh - 300px)"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <InputControl
          type="textarea"
          size="small"
          label="Agenda Description"
          value={state.agenda.details.note}
          name="description"
          placeholder="Enter meeting description here..."
          rows={20}
          onChange={handleFormChange}
        />
      )}
    </PageLayout>
  );
};

const useManageAgenda = () => {
  const [state, setState] = useImmer({
    agenda: { details: { name: "Update Agenda", note: "" }, loading: true },
    updateButtonLoading: false,
  });

  const { meetingId, agendaId } = useParams();

  const getAgenda = async ({ agendaId, meetingId }) => {
    triggerAgendaDetailsLoading(true);
    try {
      const response = await getMeetingAgendaDetailsApi({
        agendaId,
        meetingId,
      });
      const { success, message, data } = response;
      if (success) {
        const {
          id,
          agenda: { name },
          note,
        } = data;
        setState((draft) => {
          draft.agenda.details.id = id;
          draft.agenda.details.name = name;
          draft.agenda.details.note = note;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerAgendaDetailsLoading(false);
    }
  };

  const updateAgenda = async ({ agendaId, meetingId, note }) => {
    try {
      const response = await updateAgendaApi({
        agendaId,
        meetingId,
        note,
      });

      const { success, message } = response;

      if (success) {
        enqueueSnackbar({ message, variant: "success" });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerUpdateButtonLoading(false);
    }
  };

  const triggerUpdateButtonLoading = (loading) => {
    setState((draft) => {
      draft.updateButtonLoading = loading;
    });
  };

  const triggerAgendaDetailsLoading = (loading) => {
    setState((draft) => {
      draft.agenda.loading = loading;
    });
  };

  const handleFormChange = (event) => {
    setState((draft) => {
      draft.agenda.details.note = event.target.value;
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await updateAgenda({
      agendaId,
      meetingId,
      note: state.agenda.details.note,
    });
  };
  React.useEffect(() => {
    getAgenda({ meetingId, agendaId });
  }, []);

  return { state, handleFormChange, handleUpdate };
};
