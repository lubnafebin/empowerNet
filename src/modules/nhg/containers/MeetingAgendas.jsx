import { Button, IconButton, Stack } from "@mui/material";
import { BasicTable, InputControl } from "../../../shared";
import { Delete, Edit } from "@mui/icons-material";

export const MeetingAgendas = () => {
  const columns = [
    { label: "No", field: "no" },
    { label: "ID", field: "id" },
    { label: "Agenda", field: "agenda" },
    {
      label: "Actions",
      field: "actions",
      cell: () => (
        <Stack direction="row" spacing={1}>
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
      id: "A001",
      agenda: "റിപ്പോർട്ടിങ്",
    },
    {
      no: 2,
      id: "A002",
      agenda: "സാമ്പത്തിക ഉപസമിതി ",
    },
    {
      no: 3,
      id: "A003",
      agenda: "ആരോഗ്യ വിദ്യാഭ്യാസ ഉപസമിതി",
    },
    {
      no: 4,
      id: "A004",
      agenda: "വരുമാന ദായക ഉപസമിതി ",
    },
    {
      no: 5,
      id: "A005",
      agenda: "റിപ്പോർട്ടിങ്ങിനെ കുറിച്ചുള്ള ചർച്ച ",
    },
    {
      no: 5,
      id: "A005",
      agenda: "ചർച്ചയുടെമേൽ നിലവിലുള്ള തീരുമാനങ്ങൾ ",
    },
  ];
  return (
    <BasicTable
      title="Meeting Minutes"
      headerAction={
        <Stack direction="row" spacing={1}>
          <InputControl
            type="search"
            placeholder="Search here.."
            sx={{ width: 300 }}
          />
          <Button variant="contained">New Meeting</Button>
        </Stack>
      }
      columns={columns}
      rows={rows}
    />
  );
};
