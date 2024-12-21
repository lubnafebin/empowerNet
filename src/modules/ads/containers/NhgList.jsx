import { Stack, IconButton, Chip } from "@mui/material";
import { BasicTable, InputControl } from "../../../shared";
import { ArrowForward } from "@mui/icons-material";
export const NhgList = () => {
  const columns = [
    { label: "No", field: "no" },
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Secretary", field: "secretary" },
    { label: "President", field: "president" },
    { label: "Contact No", field: "contactno" },
    { label: "Total Members", field: "totalmembers" },
    {
      label: "Status",
      field: "status",
      cell(row) {
        return (
          <Chip
            label={row.status}
            color={
              row.status === "In review"
                ? "warning"
                : row.status === "Approved"
                  ? "success"
                  : row.status === "Rejected"
                    ? "error"
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
      name: "Name 1",
      email: "email1@example.com",
      secretary: "Secretary 1",
      president: "President 1",
      contactno: "1234567890",
      totalmembers: 10,
      status: "Approved",
    },
    {
      no: 2,
      name: "Name 2",
      email: "email2@example.com",
      secretary: "Secretary 2",
      president: "President 2",
      contactno: "0987654321",
      totalmembers: 15,
      status: "Rejected",
    },
    {
      no: 3,
      name: "Name 3",
      email: "email3@example.com",
      secretary: "Secretary 3",
      president: "President 3",
      contactno: "1122334455",
      totalmembers: 20,
      status: "Approved",
    },
    {
      no: 4,
      name: "Name 4",
      email: "email4@example.com",
      secretary: "Secretary 4",
      president: "President 4",
      contactno: "2233445566",
      totalmembers: 25,
      status: "Rejected",
    },
    {
      no: 5,
      name: "Name 5",
      email: "email5@example.com",
      secretary: "Secretary 5",
      president: "President 5",
      contactno: "3344556677",
      totalmembers: 30,
      status: "In review",
    },
  ];
  return (
    <BasicTable
      title="NHG List"
      headerAction={
        <InputControl
          type="search"
          placeholder="Search here.."
          sx={{ width: 300 }}
        />
      }
      columns={columns}
      rows={rows}
    />
  );
};
