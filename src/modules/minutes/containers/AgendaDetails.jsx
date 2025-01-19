import React from "react";
import { PageLayout } from "../../../shared";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";

export const AgendaDetails = () => {
  const { meetingId } = useParams();
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
      href: `/minutes/${meetingId}/agendas`,
    },
    {
      title: "Agenda",
    },
  ];

  return (
    <PageLayout
      title="Agendas"
      breadcrumbs={breadcrumbs}
      actionSection={
        <Button
          variant="contained"
          startIcon={<SaveOutlined />}
          //   onClick={() => toggleModel("newWard")}
        >
          Update
        </Button>
      }
    ></PageLayout>
  );
};
