import { Telegram } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { ReportCard } from "../../../shared";
import pdfIcon from "../../../assets/icons/pdf.png";
import { useLocation } from "react-router-dom";

export const PageReports = () => {
  const location = useLocation();
  const pdfImage = <img src={pdfIcon} alt="placeholder" width="32px" />;
  const reports = [
    {
      title: "Report 1",
      date: "2021-09-01",
      icon: pdfImage,
    },
    {
      title: "Report 2",
      date: "2021-09-02",
      icon: pdfImage,
    },
    {
      title: "Report 3",
      date: "2021-09-03",
      icon: pdfImage,
    },
    {
      title: "Report 4",
      date: "2021-09-04",
      icon: pdfImage,
    },
  ];
  const isApproved = !location.pathname.includes("/nhg");
  const isForwarded = location.pathname.includes("/nhg");
  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Reports</Typography>
        {isApproved && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Telegram />}
          >
            Approve Report
          </Button>
        )}
        {isForwarded && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Telegram />}
          >
            Forward Report
          </Button>
        )}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        // sx={{ width: "100%" }}
        gap={2}
      >
        {reports.map((report, index) => (
          <ReportCard
            key={index}
            title={report.title}
            date={report.date}
            icon={report.icon}
            sx={{ width: "100%", p: 2 }}
          />
        ))}
      </Stack>
    </Stack>
  );
};
