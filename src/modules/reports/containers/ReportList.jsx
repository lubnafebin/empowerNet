import React from "react";
import {
  InputControl,
  LoadingButton,
  PageLayout,
  ReactTable,
} from "../../../shared";
import { Box, Button, Stack } from "@mui/material";
import { PrintOutlined, Telegram } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useReportList } from "../hooks";

export const ReportList = () => {
  const navigate = useNavigate();
  const { formValidator, state, handleFormSubmit, handleFormChange } =
    useReportList();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Report Duration",
        accessorKey: "date",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Deposit",
        accessorKey: "deposit",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Refund",
        accessorKey: "refund",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Membership Fees",
        accessorKey: "memberFee",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Approved By",
        accessorKey: "approvedBy",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Status",
        accessorKey: "status",
        enableSorting: true,
        placement: "right",
      },
    ],
    [],
  );

  const helperText = {
    startDate: formValidator.current.message(
      "startDate",
      state.formData.startDate,
      "required",
    ),
    endDate: formValidator.current.message(
      "endDate",
      state.formData.endDate,
      "required",
    ),
  };

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Reports",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      title="Reports"
      actionSection={
        <Stack
          flexDirection={{ md: "row", xs: "column" }}
          gap="14px"
          component="form"
          onSubmit={handleFormSubmit}
        >
          <Stack width={250}>
            <InputControl
              type="select"
              size="small"
              name="transactionType"
              label="Transaction Type"
              optionValues={state.transactionTypes}
              onChange={handleFormChange}
              value={state.formData.transactionType}
            />
          </Stack>
          <InputControl
            type="date"
            size="small"
            value={state.formData.startDate}
            label="Start Date"
            name="startDate"
            error={Boolean(helperText.startDate)}
            helperText={helperText.startDate}
            onChange={(newValue) =>
              handleFormChange({
                target: { name: "startDate", value: newValue },
              })
            }
          />
          <InputControl
            type="date"
            size="small"
            value={state.formData.endDate}
            label="End Date"
            name="endDate"
            error={Boolean(helperText.endDate)}
            helperText={helperText.endDate}
            onChange={(newValue) =>
              handleFormChange({
                target: { name: "endDate", value: newValue },
              })
            }
          />
          <LoadingButton
            startIcon={<PrintOutlined />}
            loading={state.generateReportButtonLoading}
          >
            Generate Report
          </LoadingButton>
        </Stack>
      }
    >
      <ReactTable
        columns={columns}
        data={[]}
        loading={false}
        customHeader={
          <Stack p="14px">
            <Box sx={{ ml: "auto" }}>
              <Button variant="contained" startIcon={<Telegram />}>
                Upload Report
              </Button>
            </Box>
          </Stack>
        }
        rowClick={(row) => navigate(`reports/${row.id}`)}
      />
    </PageLayout>
  );
};
