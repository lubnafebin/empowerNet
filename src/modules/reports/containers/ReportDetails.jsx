import { FileCard, PageLayout } from "../../../shared";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { PictureAsPdf, PrintOutlined, Telegram } from "@mui/icons-material";
import { globalGap, globalPadding } from "../../../utils";

export const ReportDetails = () => {
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
        <Button variant="contained" startIcon={<PrintOutlined />}>
          Generate Report Consolidate
        </Button>
      }
    >
      <Container maxWidth="xl" disableGutters>
        <Stack flexDirection="row" gap={globalGap} justifyContent="stretch">
          <FileCard
            fileName="Deposit Report.pdf"
            icon={<PictureAsPdf color="error" fontSize="large" />}
            isFileUploaded
            onView={() => {}}
          />
          <FileCard
            fileName="Deposit Report.pdf"
            icon={<PictureAsPdf color="error" fontSize="large" />}
            isFileUploaded
            onView={() => {}}
          />
          <FileCard
            fileName="Deposit Report.pdf"
            icon={<PictureAsPdf color="error" fontSize="large" />}
            isFileUploaded
            onView={() => {}}
          />
        </Stack>
        <Stack
          component={Paper}
          variant="shadow"
          flexDirection="row"
          gap={globalGap}
          p={globalPadding}
          sx={{
            borderRadius: "16px",
            mt: globalPadding,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Report Consolidate</Typography>
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
      </Container>
    </PageLayout>
  );
};
