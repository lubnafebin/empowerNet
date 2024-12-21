import {  Stack, Button,  IconButton } from "@mui/material";
import { BasicTable } from "../../../shared/components/tables/BasicTable";
import { Delete, Edit, Visibility } from "@mui/icons-material";

export const PageWards = () => {
  const columns = [
    { label: "No", field: "no" },
    { label: "Ward No", field: "wardNo" },
    { label: "Ward", field: "ward" },
    { label: "Created At", field: "createdAt" },
    { label: "ADS Name", field: "ADSname" },
    {
      label: "Actions",
      field: "actions",
      cell: () => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" size="small">
            Update Ads
          </Button>
          <IconButton>
            <Visibility />
          </IconButton>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];
  const rows = [
    {
      no: 1,
      wardNo: 1,
      ward: "Ward 1",
      createdAt: "2021-10-12",
      ADSname: "ADS 1",
    },
    {
      no: 2,
      wardNo: 2,
      ward: "Ward 2",
      createdAt: "2021-10-12",
      ADSname: "ADS 2",
    },
    {
      no: 3,
      wardNo: 3,
      ward: "Ward 3",
      createdAt: "2021-10-12",
      ADSname: "ADS 3",
    },
    {
      no: 4,
      wardNo: 4,
      ward: "Ward 4",
      createdAt: "2021-10-12",
      ADSname: "ADS 4",
    },
    {
      no: 5,
      wardNo: 5,
      ward: "Ward 5",
      createdAt: "2021-10-12",
      ADSname: "ADS 5",
    },
    {
      no: 6,
      wardNo: 6,
      ward: "Ward 6",
      createdAt: "2021-10-12",
      ADSname: "ADS 6",
    },
    {
      no: 7,
      wardNo: 7,
      ward: "Ward 7",
      createdAt: "2021-10-12",
      ADSname: "ADS 7",
    },
    {
      no: 8,
      wardNo: 8,
      ward: "Ward 8",
      createdAt: "2021-10-12",
      ADSname: "ADS 8",
    },
    {
      no: 9,
      wardNo: 9,
      ward: "Ward 9",
      createdAt: "2021-10-12",
      ADSname: "ADS 9",
    },
    {
      no: 10,
      wardNo: 10,
      ward: "Ward 10",
      createdAt: "2021-10-12",
      ADSname: "ADS 10",
    },
  ];
  return (
    <BasicTable
      title="Wards"
      headerAction={<Button variant="contained">New Wards</Button>}
      columns={columns}
      rows={rows}
    />
  );
};
