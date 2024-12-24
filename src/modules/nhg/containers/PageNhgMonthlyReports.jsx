import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { InputControl, MonthlyReportsTable } from "../../../shared";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

export const PageNhgMonthlyReports = () => {
  const newDate = new Date();
  return (
    <Stack gap={1} px={2}>
      <Typography variant="h5" gutterBottom>
        Reports
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          gap: 2,
          elevation: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <InputControl
          label="Report"
          placeholder="Select Report"
          type="dropdown"
          options={["January", "February", "March", "April", "May"]}
          value="January"
          renderInput={(params) => <TextField {...params} />}
        />
        <InputControl type="date" label="Date Range" value={newDate} />
        <Button variant="contained" startIcon={<TextSnippetIcon />} fullWidth>
          Generate Report
        </Button>
      </Paper>
      <MonthlyReportsTable />;
    </Stack>
  );
};
