import { Button, Stack } from "@mui/material";
import { BasicTable, InputControl } from "../../../shared";

export const DepositsandRefund = () => {
  const columns = [
    { label: "No", field: "no" },
    { label: "Date", field: "date" },
    { label: "Account Holder", field: "accountholder" },
    { label: "Created At", field: "createdat" },
    { label: "Created By", field: "createdby" },
    { label: "Deposit", field: "deposit" },
    { label: "Total Savings", field: "totalsavings" },
    { label: "Refunds", field: "refunds" },
    { label: "Remaining Loan", field: "remainingloan" },
  ];
  const rows = [
    {
      no: 1,
      date: "2023-01-01",
      accountholder: "John Doe",
      createdat: "2023-01-01",
      createdby: "Admin",
      deposit: 1000,
      totalsavings: 5000,
      refunds: 200,
      remainingloan: 3000,
    },
    {
      no: 2,
      date: "2023-02-01",
      accountholder: "Jane Smith",
      createdat: "2023-02-01",
      createdby: "Admin",
      deposit: 1500,
      totalsavings: 7000,
      refunds: 300,
      remainingloan: 2000,
    },
    {
      no: 3,
      date: "2023-03-01",
      accountholder: "Alice Johnson",
      createdat: "2023-03-01",
      createdby: "Admin",
      deposit: 2000,
      totalsavings: 9000,
      refunds: 400,
      remainingloan: 1000,
    },
    {
      no: 4,
      date: "2023-04-01",
      accountholder: "Bob Brown",
      createdat: "2023-04-01",
      createdby: "Admin",
      deposit: 2500,
      totalsavings: 11000,
      refunds: 500,
      remainingloan: 500,
    },
    {
      no: 5,
      date: "2023-05-01",
      accountholder: "Charlie Davis",
      createdat: "2023-05-01",
      createdby: "Admin",
      deposit: 3000,
      totalsavings: 13000,
      refunds: 600,
      remainingloan: 0,
    },
    {
      no: 6,
      date: "2023-05-01",
      accountholder: "Charlie Davis",
      createdat: "2023-05-01",
      createdby: "Admin",
      deposit: 3000,
      totalsavings: 13000,
      refunds: 600,
      remainingloan: 0,
    },
    {
      no: 7,
      date: "2023-05-01",
      accountholder: "Charlie Davis",
      createdat: "2023-05-01",
      createdby: "Admin",
      deposit: 3000,
      totalsavings: 13000,
      refunds: 600,
      remainingloan: 0,
    },
  ];
  const totalDeposit = rows.reduce((acc, row) => acc + row.deposit, 0);
  const totalSavings = rows.reduce((acc, row) => acc + row.totalsavings, 0);
  const totalRefunds = rows.reduce((acc, row) => acc + row.refunds, 0);
  const totalRemainingLoan = rows.reduce(
    (acc, row) => acc + row.remainingloan,
    0,
  );
  rows.push({
    no: "Total",
    date: "",
    accountholder: "",
    createdat: "",
    createdby: "",
    deposit: <strong>{totalDeposit}</strong>,
    totalsavings: <strong>{totalSavings}</strong>,
    refunds: <strong>{totalRefunds}</strong>,
    remainingloan: <strong>{totalRemainingLoan}</strong>,
  });
  return (
    <BasicTable
      title="Deposits & Loan Refunds"
      headerAction={
        <Stack direction="row" spacing={1}>
          <InputControl
            type="search"
            placeholder="Search here.."
            sx={{ width: 300 }}
          />
          <Button variant="contained">New Entry</Button>
        </Stack>
      }
      columns={columns}
      rows={rows}
    />
  );
};
