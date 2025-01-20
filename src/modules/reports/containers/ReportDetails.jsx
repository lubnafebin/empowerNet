import { FileCard, PageLayout } from "../../../shared";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { PictureAsPdf, PrintOutlined, Telegram } from "@mui/icons-material";
import { globalGap, globalPadding } from "../../../utils";
import { useReportDetails } from "../hooks";
import dayjs from "dayjs";

export const ReportDetails = () => {
  const { state } = useReportDetails();

  const title = `Report ${dayjs(state.report.details.startDate).format("MMM DD, YYYY to ")}
            ${dayjs(state.report.details.endDate).format("MMM DD, YYYY")} `;

  const status = state.report.details?.status?.name.toLowerCase();

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
            color={status === "draft" ? "primary" : "success"}
            size="small"
          />
        </Stack>
      }
      actionSection={
        <Button variant="contained" startIcon={<PrintOutlined />}>
          Generate Report Consolidate
        </Button>
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
                  return (
                    <FileCard
                      key={report.id}
                      fileName={fileName}
                      icon={<PictureAsPdf color="error" fontSize="large" />}
                      isFileUploaded
                      onView={() => window.open(report.url)}
                    />
                  );
                })}
              </Stack>
            )}
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
              <Typography fontWeight={500} my="auto">
                Report Consolidate
              </Typography>
              <Stack flexGrow={1}>
                <FileCard
                  fileName="Consolidate Report.pdf"
                  icon={<PictureAsPdf color="error" fontSize="small" />}
                  isFileUploaded={true}
                  onView={() => {}}
                  fileNotUploadText="Click to upload the consolidate"
                />
              </Stack>
              <Button variant="contained" startIcon={<Telegram />}>
                Forward To ADS
              </Button>
            </Stack>
          </Stack>
        )}
      </Container>
    </PageLayout>
  );
};
