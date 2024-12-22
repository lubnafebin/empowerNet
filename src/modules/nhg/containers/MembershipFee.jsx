import { Button, Stack } from "@mui/material";
import { BasicTable, InputControl } from "../../../shared";

export const MembershipFee = () => {
  const columns = [
    { label: "No", field: "no" },
    { label: "Date", field: "date" },
    { label: "Name", field: "name" },
    { label: "Created At", field: "createdat" },
    { label: "Created By", field: "createdby" },
    { label: "Total Savings", field: "totalsavings" },
  ];
  const rows = [
    {
      no: 1,
      date: "2023-01-01",
      name: "John Doe",
      createdat: "2023-01-01",
      createdby: "Admin",
      totalsavings: 10,
    },
    {
      no: 2,
      date: "2023-02-01",
      name: "Jane Smith",
      createdat: "2023-02-01",
      createdby: "Admin",
      totalsavings: 15,
    },
    {
      no: 3,
      date: "2023-03-01",
      name: "Alice Johnson",
      createdat: "2023-03-01",
      createdby: "Admin",
      totalsavings: 20,
    },
    {
      no: 4,
      date: "2023-04-01",
      name: "Bob Brown",
      createdat: "2023-04-01",
      createdby: "Admin",
      totalsavings: 25,
    },
    {
      no: 5,
      date: "2023-05-01",
      name: "Charlie Davis",
      createdat: "2023-05-01",
      createdby: "Admin",
      totalsavings: 30,
    },
    {
        no: 6,
        date: "2023-06-01",
        name: "David Wilson",
        createdat: "2023-06-01",
        createdby: "Admin",
        totalsavings: 35,
        },
        {
        no: 7,
        date: "2023-07-01",
        name: "Eve Miller",
        createdat: "2023-07-01",
        createdby: "Admin",
        totalsavings: 40,
        },
        {
        no: 8,
        date: "2023-08-01",
        name: "Frank White",
        createdat: "2023-08-01",
        createdby: "Admin",
        totalsavings: 45,
        },
        {
        no: 9,
        date: "2023-09-01",
        name: "Grace Martinez",
        createdat: "2023-09-01",
        createdby: "Admin",
        totalsavings: 50,
        },
        {
        no: 10,
        date: "2023-10-01",
        name: "Harry Lee",
        createdat: "2023-10-01",
        createdby: "Admin",
        totalsavings: 55,
        },
  ];
  const totalSavings = rows.reduce((acc, row) => acc + row.totalsavings, 0);
    rows.push({
        no: "Total",
        date: "",
        name: "",
        createdat: "",
        createdby: "",
        totalsavings: <strong>{totalSavings}</strong>,
    });
  return (
    <BasicTable
      title="Membership Fee"
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
