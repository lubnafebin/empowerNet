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
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  FormHelperText,
  FormLabel,
  Stack,
} from "@mui/material";
import {
  Description,
  PictureAsPdf,
  PrintOutlined,
  Telegram,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useReportList } from "../hooks";

export const ReportList = () => {
  const navigate = useNavigate();
  const {
    formValidator,
    state,
    handleFormSubmit,
    handleFormChange,
    toggleModel,
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
      state.reportForm.startDate,
      "required",
    ),
    endDate: formValidator.current.message(
      "endDate",
      state.reportForm.endDate,
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
        rowClick={(row) => navigate(`reports/${row.id}`)}
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
                    value={state.reportForm.startDate}
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
                    value={state.reportForm.endDate}
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
                    type="number"
                    size="small"
                    value={state.reportForm.totalDeposits}
                    label="Total Deposits"
                    name="totalDeposits"
                    error={Boolean(helperText.totalDeposits)}
                    helperText={helperText.totalDeposits}
                    onChange={handleFormChange}
                  />
                  <InputControl
                    type="number"
                    size="small"
                    value={state.reportForm.totalRefunds}
                    label="Total Refunds"
                    name="totalRefunds"
                    error={Boolean(helperText.totalRefunds)}
                    helperText={helperText.totalRefunds}
                    onChange={handleFormChange}
                  />
                  <InputControl
                    type="number"
                    size="small"
                    value={state.formData.totalMembershipFees}
                    label="Total Membership Fees"
                    name="totalMembershipFees"
                    error={Boolean(helperText.totalMembershipFees)}
                    helperText={helperText.totalMembershipFees}
                    onChange={handleFormChange}
                  />
                </Stack>
                <Stack gap="14px">
                  <FormLabel>Attachments</FormLabel>
                  <Stack>
                    {state.reportForm.depositReport ? (
                      <FileCard
                        fileName={state.reportForm.depositReport}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onDelete={() =>
                          handleFormChange({
                            target: {
                              name: "depositReport",
                              value: null,
                            },
                          })
                        }
                        isFileUploaded={true}
                        onView={() =>
                          window.open(state.formData.signatureAttachment.url)
                        }
                      />
                    ) : (
                      <Box component="label">
                        <VisuallyHiddenInput
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            handleFormChange({
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

                    {helperText.aadharAttachment && (
                      <FormHelperText sx={{ color: "#C60808" }}>
                        {helperText.aadharAttachment}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack>
                    {state.reportForm.refundReport ? (
                      <FileCard
                        fileName={state.reportForm.refundReport}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onDelete={() =>
                          handleFormChange({
                            target: {
                              name: "refundReport",
                              value: null,
                            },
                          })
                        }
                        isFileUploaded={true}
                        onView={() =>
                          window.open(state.formData.signatureAttachment.url)
                        }
                      />
                    ) : (
                      <Box component="label">
                        <VisuallyHiddenInput
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            handleFormChange({
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

                    {helperText.aadharAttachment && (
                      <FormHelperText sx={{ color: "#C60808" }}>
                        {helperText.aadharAttachment}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack>
                    {state.reportForm.membershipFeesReport ? (
                      <FileCard
                        fileName={state.reportForm.membershipFeesReport}
                        icon={<PictureAsPdf fontSize="small" color="error" />}
                        onDelete={() =>
                          handleFormChange({
                            target: {
                              name: "membershipFeesReport",
                              value: null,
                            },
                          })
                        }
                        isFileUploaded={true}
                        onView={() =>
                          window.open(state.formData.signatureAttachment.url)
                        }
                      />
                    ) : (
                      <Box component="label">
                        <VisuallyHiddenInput
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            handleFormChange({
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

                    {helperText.aadharAttachment && (
                      <FormHelperText sx={{ color: "#C60808" }}>
                        {helperText.aadharAttachment}
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
