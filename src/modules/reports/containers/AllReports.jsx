import React from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { utilFunctions } from "../../../utils";
import dayjs from "dayjs";
import { PageLayout, ReactTable } from "../../../shared";
import { useNavigate } from "react-router-dom";
import { useAllReports } from "../hooks";

export const AllReports = () => {
  const navigate = useNavigate();
  const { state } = useAllReports();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Nhg",
        cell: ({
          row: {
            original: { nhg },
          },
        }) => {
          return <Typography>{nhg.user.name}</Typography>;
        },
        enableSorting: true,
      },
      {
        header: "Report Duration",
        cell: ({
          row: {
            original: { startDate, endDate },
          },
        }) => {
          return (
            <Typography>
              {dayjs(startDate).format("DD MMM YYYY")} to
              {dayjs(endDate).format("DD MMM YYYY")}
            </Typography>
          );
        },
        enableSorting: true,
        meta: { cellStyle: { width: 230 } },
      },
      {
        header: "Created At",
        cell: () => utilFunctions.formatDate(),
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Deposit",
        accessorKey: "totalDeposits",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Refund",
        accessorKey: "totalRefunds",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Membership Fees",
        accessorKey: "totalMembershipFees",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Approved By ADS",
        cell: ({
          row: {
            original: { verifiedByAds },
          },
        }) => {
          return (
            <Typography>
              {verifiedByAds ? verifiedByAds.name : "-"}
            </Typography>
          );
        },
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Approved By CDS",
        cell: ({
          row: {
            original: { verifiedByCds },
          },
        }) => {
          return (
            <Typography>
              {verifiedByCds ? verifiedByCds.name : "-"}
            </Typography>
          );
        },
        enableSorting: true,
        placement: "right",
      },

      {
        header: "Status",
        cell: ({
          row: {
            original: { status },
          },
        }) => {
          const color = utilFunctions.getChipColor(status.name);
          return <Chip label={status.name} color={color} />;
        },
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Action",
        cell: ({
          row: {
            original: { id, status },
          },
        }) => (
          <Stack
            flexDirection="row"
            onClick={(event) => event.stopPropagation()}
          >
            {/* <Tooltip title="Report Details" arrow disableInteractive>
              <IconButton size="small" onClick={() => navigate(`${id}`)}>
                <ArrowForward fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow disableInteractive>
              <IconButton
                size="small"
                disabled={status?.name.toLowerCase() !== "draft"}
                onClick={() => handleDeleteReport(id)}
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
  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/ads",
    },
    {
      title: "All Reports",
    },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} title="All Reports">
      <ReactTable
        columns={columns}
        data={state.reports.options}
        loading={state.reports.loading}
        rowClick={(row) => navigate(`${row.id}`)}
      />
    </PageLayout>
  );
};
