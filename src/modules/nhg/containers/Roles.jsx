import { Button, IconButton, Stack } from "@mui/material";
import { BasicTable } from "../../../shared";
import { Delete, Edit, Visibility } from "@mui/icons-material";

export const Roles=()=> {
    const columns = [
        { label: "No", field: "no" },
        { label: "Role ID", field: "roleId" },
        { label: "Role Name", field: "roleName" },
        { label: "Created At", field: "createdAt" },
        {
          label: "Actions",
          field: "actions",
          cell: () => (
            <Stack direction="row" spacing={1}>
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
        roleId: 1,
        roleName: "Member",
        createdAt: "2021-10-12",
      },
      {
        no: 2,
        roleId: 2,
        roleName: "President",
        createdAt: "2021-10-12",
      },
      {
        no: 3,
        roleId: 3,
        roleName: "Secretary",
        createdAt: "2021-10-12",
      },
      {
        no: 4,
        roleId: 4,
        roleName: "Secretary",
        createdAt: "2021-10-12",
      },
      {
        no: 5,
        roleId: 5,
        roleName: "Secretary",
        createdAt: "2021-10-12",
      },
      {
        no: 6,
        roleId: 6,
        roleName: "Secretary",
        createdAt: "2021-10-12",
      },
    ];
      return (
        <BasicTable
          title="Roles"
          headerAction={<Button variant="contained">New Role</Button>}
          columns={columns}
          rows={rows}
        />
      );
}
