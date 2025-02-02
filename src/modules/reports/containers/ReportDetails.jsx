import {
  DialogHeader,
  FileCard,
  GeneralDialog,
  InputControl,
  LoadingButton,
  PageLayout,
  VisuallyHiddenInput,
} from "../../../shared";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  DialogActions,
  DialogContent,
  Divider,
  FormHelperText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Description,
  PictureAsPdf,
  PrintOutlined,
  Telegram,
} from "@mui/icons-material";
import {
  globalGap,
  globalPadding,
  useUtilFunctions,
  utilFunctions,
} from "../../../utils";
import { useReportDetails } from "../hooks";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { ApproveOrRejectReport } from "../components";

export const ReportDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    state,
    handleFormSubmit,
    handleFormChange,
    handleConsolidateReportUpload,
    formValidator,
    deleteConsolidateReport,
    handleSendRequestToVerifyReport,
    getReportDetails,
  } = useReportDetails();

  const { checkPermission, getLoggedInUser } = useUtilFunctions();
  const { role } = getLoggedInUser();

  const deleteReportPermission = checkPermission("report.id.DELETE");
  const createReportPermission = checkPermission("report.id.POST");
  const reportApprovePermission = checkPermission("allReports.id.APPROVE");

  const title = `Report ${dayjs(state.report.details.startDate).format("MMM DD, YYYY to ")}
            ${dayjs(state.report.details.endDate).format("MMM DD, YYYY")} `;

  const status = state.report.details?.status?.name;

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Monthly Reports",
      href: "/reports",
    },
    {
      title,
    },
  ];

  const helperText = {
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
    monthlyThriftTotal: formValidator.current.message(
      "monthlyThriftTotal",
      state.formData.monthlyThriftTotal,
      "required",
    ),
    thriftSplit1: formValidator.current.message(
      "thriftSplit1",
      state.formData.thriftSplit1,
      "required",
    ),
    thriftSplit2: formValidator.current.message(
      "thriftSplit2",
      state.formData.thriftSplit2,
      "required",
    ),
    monthlyThriftShadowDeposits: formValidator.current.message(
      "monthlyThriftShadowDeposits",
      state.formData.monthlyThriftShadowDeposits,
      "required",
    ),
    amountWithdrawn: formValidator.current.message(
      "amountWithdrawn",
      state.formData.amountWithdrawn,
      "required",
    ),
    cashTransactionAmount: formValidator.current.message(
      "cashTransactionAmount",
      state.formData.cashTransactionAmount,
      "required",
    ),
    remainingBalance: formValidator.current.message(
      "remainingBalance",
      state.formData.remainingBalance,
      "required",
    ),
  };

  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      title={
        <Stack flexDirection="row" gap="8px" alignItems="center">
          <Typography component="h1" variant="h5" fontWeight="bold">
            Report
          </Typography>
          <Chip
            label={status}
            color={utilFunctions.getChipColor(status)}
            size="small"
          />
        </Stack>
      }
      actionSection={
        <Stack gap="14px" flexDirection="row" flexWrap="wrap">
          {["Draft", "Rejected"].includes(status) && createReportPermission && (
            <React.Fragment>
              <Button
                variant="contained"
                startIcon={<Telegram />}
                onClick={handleSendRequestToVerifyReport}
              >
                Forward To ADS
              </Button>
              <Button
                variant="contained"
                startIcon={<PrintOutlined />}
                onClick={() =>
                  navigate("?create-report-consolidate", {
                    state: location.state,
                  })
                }
              >
                Generate Report Consolidate
              </Button>
            </React.Fragment>
          )}
          {(["In Review", "Rejected"].includes(status) &&
            reportApprovePermission &&
            role.name === "ADS" &&
            state.report.details?.verifiedByAdsId === null) ||
            (["In Review"].includes(status) &&
              reportApprovePermission &&
              role.name === "CDS" &&
              state.report.details?.verifiedByAdsId !== null && (
                <React.Fragment>
                  <Button
                    variant="contained"
                    startIcon={<Telegram />}
                    onClick={() =>
                      navigate("?verify-report", { state: location.state })
                    }
                  >
                    Verify Report
                  </Button>
                </React.Fragment>
              ))}
        </Stack>
      }
    >
      <Container maxWidth="xl" disableGutters>
        {state.report.loading ? (
          <Stack
            justifyContent="center"
            width="100%"
            flexDirection="row"
            alignItems="center"
            minHeight="calc(100vh - 250px)"
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Stack>
            {state.report.details.reports.length > 0 && (
              <Stack
                component={Paper}
                variant="shadow"
                flexDirection={{ xs: "column", md: "row" }}
                gap={globalGap}
                p={globalPadding}
                justifyContent="flex-start"
                borderRadius="16px"
                flexWrap="wrap"
              >
                {state.report.details.reports.map((report) => {
                  const fileName = report.url.split("/uploads/")[1];
                  const isConsolidateReport = fileName.includes("consolidate");
                  return (
                    <FileCard
                      key={report.id}
                      fileName={fileName}
                      icon={<PictureAsPdf color="error" fontSize="large" />}
                      isFileUploaded
                      onView={() => window.open(report.url)}
                      onDelete={
                        isConsolidateReport &&
                        deleteReportPermission &&
                        (status === "Draft" || status === "Rejected")
                          ? () =>
                              deleteConsolidateReport({
                                reportAttachmentId: report.id,
                              })
                          : undefined
                      }
                    />
                  );
                })}
              </Stack>
            )}
            {state.report.details.reports.length <= 3 && (
              <Stack
                component={Paper}
                variant="shadow"
                flexDirection={{ xs: "column", md: "row" }}
                gap={globalGap}
                p={globalPadding}
                sx={{
                  borderRadius: "16px",
                  mt: globalPadding,
                  justifyContent: "space-between",
                }}
              >
                <Stack flexGrow={1}>
                  <Stack>
                    {state.report?.consolidateReport?.name ? (
                      <FileCard
                        fileName={state.report.consolidateReport?.name}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onDelete={() => {
                          handleConsolidateReportUpload({
                            target: {
                              name: "consolidateReport",
                              value: null,
                            },
                          });
                        }}
                        isFileUploaded={true}
                      />
                    ) : (
                      <Box component="label">
                        <VisuallyHiddenInput
                          type="file"
                          accept="application/pdf"
                          onChange={(event) => {
                            handleConsolidateReportUpload({
                              target: {
                                name: "consolidateReport",
                                value: event,
                              },
                            });
                          }}
                        />
                        <FileCard
                          fileName=""
                          icon={<Description />}
                          isFileUploaded={false}
                          fileNotUploadText="Click to upload consolidate report"
                        />
                      </Box>
                    )}

                    {helperText.depositReport && (
                      <FormHelperText sx={{ color: "#C60808" }}>
                        {helperText.depositReport}
                      </FormHelperText>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Stack>
        )}
      </Container>

      <GeneralDialog
        dialogValue={"?create-report-consolidate"}
        disableCloseOnBackgroundClick={false}
      >
        <DialogHeader title="New Consolidate Report" />
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
            onSubmit={handleFormSubmit}
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
                    fullWidth
                    required
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
                </Stack>
                <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.formData.monthlyThriftTotal}
                    label="തന്മസ ത്രിഫ്റ്റ്"
                    name="monthlyThriftTotal"
                    error={Boolean(helperText.monthlyThriftTotal)}
                    helperText={helperText.monthlyThriftTotal}
                    onChange={handleFormChange}
                  />
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.formData.thriftSplit1}
                    label="ത്രിഫ്റ്റ് 1"
                    name="thriftSplit1"
                    error={Boolean(helperText.thriftSplit1)}
                    helperText={helperText.thriftSplit1}
                    onChange={handleFormChange}
                  />
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.formData.thriftSplit2}
                    label="ത്രിഫ്റ്റ് 2"
                    name="thriftSplit2"
                    error={Boolean(helperText.thriftSplit2)}
                    helperText={helperText.thriftSplit2}
                    onChange={handleFormChange}
                  />
                </Stack>
                <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.formData.monthlyThriftShadowDeposits}
                    label="തന്മസ ത്രിഫ്റ്റ തിരിച്ചു നൽകിയത്"
                    name="monthlyThriftShadowDeposits"
                    error={Boolean(helperText.monthlyThriftShadowDeposits)}
                    helperText={helperText.monthlyThriftShadowDeposits}
                    onChange={handleFormChange}
                  />
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.formData.amountWithdrawn}
                    label="മടക്കി എടുത്ത പണം"
                    name="amountWithdrawn"
                    error={Boolean(helperText.amountWithdrawn)}
                    helperText={helperText.amountWithdrawn}
                    onChange={handleFormChange}
                  />
                </Stack>
                <Stack flexDirection={{ xs: "column", md: "row" }} gap="14px">
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.formData.cashTransactionAmount}
                    label="കൈവശമുളള പണം"
                    name="cashTransactionAmount"
                    error={Boolean(helperText.cashTransactionAmount)}
                    helperText={helperText.cashTransactionAmount}
                    onChange={handleFormChange}
                  />
                  <InputControl
                    required
                    type="number"
                    size="small"
                    value={state.formData.remainingBalance}
                    label="ബാങ്കിൽ ഉള്ള പണം"
                    name="remainingBalance"
                    error={Boolean(helperText.remainingBalance)}
                    helperText={helperText.remainingBalance}
                    onChange={handleFormChange}
                  />
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
      <ApproveOrRejectReport refetchReportDetails={getReportDetails} />
    </PageLayout>
  );
};
