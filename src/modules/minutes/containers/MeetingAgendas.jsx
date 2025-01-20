import React from "react";
import { PageLayout, ReactTable } from "../../../shared";
import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Add, ArrowForwardRounded } from "@mui/icons-material";
import { useMeetingAgendas } from "../hooks";
import { useNavigate } from "react-router-dom";

export const MeetingAgendas = () => {
  const navigate = useNavigate();
  const { state, toggleModel } = useMeetingAgendas();
  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Agenda",
        cell: ({
          row: {
            original: { agenda },
          },
        }) => <Typography fontSize={14}>{agenda.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        placement: "right",
        meta: { width: 70 },
        cell: ({
          row: {
            original: { id },
          },
        }) => (
          <Stack flexDirection="row">
            <Tooltip title="Ward Details" arrow disableInteractive>
              <IconButton size="small" onClick={() => navigate(`${id}/agenda`)}>
                <ArrowForwardRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [],
  );

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Minutes",
      href: "/minutes",
    },
    {
      title: "Agendas",
    },
  ];

  return (
    <PageLayout
      title="Agendas"
      breadcrumbs={breadcrumbs}
      actionSection={
        <Button
          variant="contained"
          startIcon={<Add />}
          //   onClick={() => toggleModel("newWard")}
        >
          New Minute
        </Button>
      }
    >
      <ReactTable
        columns={columns}
        data={state.agendaList.options}
        loading={state.isTableLoading}
        rowClick={(row) => navigate(`${row.id}/agenda`)}
      />
    </PageLayout>
  );
};
