import React from "react";
import {
  DialogHeader,
  FileCard,
  GeneralDialog,
  InputControl,
  LoadingButton,
  PageLayout,
  ReactTable,
  VisuallyHiddenInput,
} from "../../../shared";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  FormHelperText,
  FormLabel,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  DeleteOutlineRounded,
  Description,
  PictureAsPdf,
  PrintOutlined,
  Telegram,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useReportList } from "../hooks";
import { utilFunctions } from "../../../utils";
import dayjs from "dayjs";

export const ReportList = () => {
  const navigate = useNavigate();
  const {
    formValidator,
    reportFormValidator,
    state,
    handleFormSubmit,
    handleFormChange,
    toggleModel,
    handleReportFormChange,
    handleReportFormSubmit,
    handleDeleteReport,
  } = useReportList();

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
            <Typography>{verifiedByAds ? verifiedByAds.name : "-"}</Typography>
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
            <Typography>{verifiedByCds ? verifiedByCds.name : "-"}</Typography>
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
          const color = utilFunctions.getChipColor(status?.name);
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
            <Tooltip title="Report Details" arrow disableInteractive>
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
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [],
  );

  const helperText = {
    startDate: reportFormValidator.current.message(
      "Start date",
      state.reportForm.startDate,
      "required",
    ),
    endDate: reportFormValidator.current.message(
      "End date",
      state.reportForm.endDate,
      "required",
    ),
    totalDeposits: reportFormValidator.current.message(
      "Total deposits",
      state.reportForm.totalDeposits,
      "required",
    ),
    totalRefunds: reportFormValidator.current.message(
      "Total refunds",
      state.reportForm.totalRefunds,
      "required",
    ),
    totalMembershipFees: reportFormValidator.current.message(
      "Total membership fees",
      state.reportForm.totalMembershipFees,
      "required",
    ),
    depositReport: reportFormValidator.current.message(
      "Deposit Report",
      state.reportForm.depositReport,
      "required",
    ),
    refundReport: reportFormValidator.current.message(
      "Refund report",
      state.reportForm.refundReport,
      "required",
    ),
    membershipFeesReport: reportFormValidator.current.message(
      "Membership fee report",
      state.reportForm.membershipFeesReport,
      "required",
    ),
  };

  const generateReportHelperText = {
    startDate: formValidator.current.message(
      "Start date",
      state.formData.startDate,
      "required",
    ),
    endDate: formValidator.current.message(
      "End date",
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
      title: "Monthly Reports",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      title="Monthly Reports"
      actionSection={
        <Stack
          flexDirection={{ md: "row", xs: "column" }}
          gap="14px"
          component="form"
          onSubmit={handleFormSubmit}
        >
          <Stack width={150}>
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
            error={Boolean(generateReportHelperText.startDate)}
            helperText={generateReportHelperText.startDate}
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
            error={Boolean(generateReportHelperText.endDate)}
            helperText={generateReportHelperText.endDate}
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
        data={state.reports.options}
        loading={state.reports.loading}
        customHeader={
          <Stack p="14px">
            <Box sx={{ ml: "auto" }}>
              <Button
                variant="contained"
                startIcon={<Telegram />}
                onClick={() => toggleModel({})}
              >
                Upload Report
              </Button>
            </Box>
          </Stack>
        }
        rowClick={(row) => navigate(`${row.id}`)}
      />

      <GeneralDialog dialogValue={"?new-report"}>
        <DialogHeader title="New Report" />
        <Divider variant="fullWidth" orientation="horizontal" />
        {state.isFormLoading && state.selectedWardId ? (
          <Stack
            sx={{ width: { md: 700, xs: "100%" }, height: 190 }}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Box
            component="form"
            onSubmit={handleReportFormSubmit}
            sx={{ width: { md: 700, xs: "100%" } }}
          >
            <DialogContent>
              <Stack gap="14px">
                <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                  <InputControl
                    type="date"
                    size="small"
                    fullWidth
                    required
                    value={state.reportForm.startDate}
                    label="Start Date"
                    name="startDate"
                    error={Boolean(helperText.startDate)}
                    helperText={helperText.startDate}
                    onChange={(newValue) =>
                      handleReportFormChange({
                        target: { name: "startDate", value: newValue },
                      })
                    }
                  />
                  <InputControl
                    type="date"
                    size="small"
                    fullWidth
                    required
                    value={state.reportForm.endDate}
                    label="End Date"
                    name="endDate"
                    error={Boolean(helperText.endDate)}
                    helperText={helperText.endDate}
                    onChange={(newValue) =>
                      handleReportFormChange({
                        target: { name: "endDate", value: newValue },
                      })
                    }
                  />
                </Stack>
                <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.reportForm.totalDeposits}
                    label="Total Deposits"
                    name="totalDeposits"
                    error={Boolean(helperText.totalDeposits)}
                    helperText={helperText.totalDeposits}
                    onChange={handleReportFormChange}
                  />
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.reportForm.totalRefunds}
                    label="Total Refunds"
                    name="totalRefunds"
                    error={Boolean(helperText.totalRefunds)}
                    helperText={helperText.totalRefunds}
                    onChange={handleReportFormChange}
                  />
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.formData.totalMembershipFees}
                    label="Total Membership Fees"
                    name="totalMembershipFees"
                    error={Boolean(helperText.totalMembershipFees)}
                    helperText={helperText.totalMembershipFees}
                    onChange={handleReportFormChange}
                  />
                </Stack>
                <Stack gap="14px">
                  <FormLabel>Attachments</FormLabel>
                  <Stack>
                    {state.reportForm.depositReport ? (
                      <FileCard
                        fileName={state.reportForm.depositReport.name}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onDelete={() =>
                          handleReportFormChange({
                            target: {
                              name: "depositReport",
                              value: null,
                            },
                          })
                        }
                        isFileUploaded={true}
                      />
                    ) : (
                      <Box component="label">
                        <VisuallyHiddenInput
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            handleReportFormChange({
                              target: {
                                name: "depositReport",
                                value: event,
                              },
                            })
                          }
                        />
                        <FileCard
                          fileName=""
                          icon={<Description fontSize="small" />}
                          isFileUploaded={false}
                          fileNotUploadText="Click to upload the deposit report"
                        />
                      </Box>
                    )}

                    {helperText.depositReport && (
                      <FormHelperText sx={{ color: "#C60808" }}>
                        {helperText.depositReport}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack>
                    {state.reportForm.refundReport ? (
                      <FileCard
                        fileName={state.reportForm.refundReport.name}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onDelete={() =>
                          handleReportFormChange({
                            target: {
                              name: "refundReport",
                              value: null,
                            },
                          })
                        }
                        isFileUploaded={true}
                      />
                    ) : (
                      <Box component="label">
                        <VisuallyHiddenInput
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            handleReportFormChange({
                              target: {
                                name: "refundReport",
                                value: event,
                              },
                            })
                          }
                        />
                        <FileCard
                          fileName=""
                          icon={<Description fontSize="small" />}
                          isFileUploaded={false}
                          fileNotUploadText="Click to upload the refund report"
                        />
                      </Box>
                    )}

                    {helperText.refundReport && (
                      <FormHelperText sx={{ color: "#C60808" }}>
                        {helperText.refundReport}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack>
                    {state.reportForm.membershipFeesReport ? (
                      <FileCard
                        fileName={state.reportForm.membershipFeesReport.name}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onDelete={() =>
                          handleReportFormChange({
                            target: {
                              name: "membershipFeesReport",
                              value: null,
                            },
                          })
                        }
                        isFileUploaded={true}
                      />
                    ) : (
                      <Box component="label">
                        <VisuallyHiddenInput
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            handleReportFormChange({
                              target: {
                                name: "membershipFeesReport",
                                value: event,
                              },
                            })
                          }
                        />
                        <FileCard
                          fileName=""
                          icon={<Description fontSize="small" />}
                          isFileUploaded={false}
                          fileNotUploadText="Click to upload the membership fee report"
                        />
                      </Box>
                    )}

                    {helperText.membershipFeesReport && (
                      <FormHelperText sx={{ color: "#C60808" }}>
                        {helperText.membershipFeesReport}
                      </FormHelperText>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </DialogContent>
            <Divider />
            <DialogActions>
              <LoadingButton
                size="small"
                loading={state.reportFormButtonLoading}
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
