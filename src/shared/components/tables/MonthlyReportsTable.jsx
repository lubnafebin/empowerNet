import { ArrowForward } from "@mui/icons-material";
import { BasicTable, InputControl } from "../../../shared";
import { Chip, IconButton, Stack, TextField } from "@mui/material";
import PropTypes from "prop-types";

export const MonthlyReportsTable = ({ hideMonthFilter = true }) => {
  const columns = [
    { label: "No", field: "no" },
    { label: "ID", field: "id" },
    { label: "Report (Month)", field: "report" },
    { label: "Date Range", field: "daterange" },
    { label: "Created At", field: "createdat" },
    { label: "Deposit", field: "deposit" },
    { label: "Refund", field: "refund" },
    { label: "Subscription", field: "subscription" },
    { label: "Approved By", field: "approvedby" },
    {
      label: "Status",
      field: "status",
      cell(row) {
        return (
          <Chip
            label={row.status}
            color={
              row.status === "New"
                ? "warning"
                : row.status === "Verified"
                  ? "success"
                  : "default"
            }
          />
        );
      },
    },
    {
      label: "Actions",
      field: "actions",
      cell: () => (
        <Stack direction="row" spacing={1}>
          <IconButton>
            <ArrowForward />
          </IconButton>
        </Stack>
      ),
    },
  ];
  const rows = [
    {
      no: 1,
      id: "A001",
      report: "January",
      daterange: "2023-01-01 to 2023-01-31",
      createdat: "2023-01-01",
      deposit: 1000,
      refund: 200,
      subscription: 50,
      approvedby: "CDS",
      status: "Verified",
    },
    {
      no: 2,
      id: "A002",
      report: "February",
      daterange: "2023-02-01 to 2023-02-28",
      createdat: "2023-02-01",
      deposit: 1500,
      refund: 300,
      subscription: 60,
      approvedby: "CDS",
      status: "New",
    },
  ];
  return (
    <BasicTable
      title="Monthly Reports"
      columns={columns}
      rows={rows}
      headerAction={
        hideMonthFilter ? null : (
          <InputControl
            sx={{ minWidth: "300px" }}
            label="Month"
            placeholder="Select Month"
            type="dropdown"
            options={["January", "February", "March", "April", "May"]}
            value="January"
            renderInput={(params) => <TextField {...params} />}
          />
        )
      }
    />
  );
};

MonthlyReportsTable.propTypes = {
  hideMonthFilter: PropTypes.bool,
};
