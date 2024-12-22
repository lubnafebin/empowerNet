import { ArrowForward, Visibility } from "@mui/icons-material";
import { BasicTable, InputControl } from "../../../shared";
import { Button, IconButton, Stack } from "@mui/material";

export const MeetingMinutes = () => {
    const columns = [
        { label: "No", field: "no" },
        { label: "Date", field: "date" },
        { label: "Place", field: "place" },
        { label: "Total Participants", field: "totalparticipants" },
        { label: "Current Meeting No", field: "currentmeetingno" },
        {
          label: "Actions",
          field: "actions",
          cell: () => (
            <Stack direction="row" spacing={1}>
              <IconButton>
                <Visibility />
              </IconButton>
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
          date: "2023-01-01",
          place: "Place 1",
          totalparticipants: 10,
          currentmeetingno: 1,
        },
        {
          no: 2,
          date: "2023-02-01",
          place: "Place 2",
          totalparticipants: 15,
          currentmeetingno: 2,
        },
        {
          no: 3,
          date: "2023-03-01",
          place: "Place 3",
          totalparticipants: 20,
          currentmeetingno: 3,
        },
        {
          no: 4,
          date: "2023-04-01",
          place: "Place 4",
          totalparticipants: 25,
          currentmeetingno: 4,
        },
        {
          no: 5,
          date: "2023-05-01",
          place: "Place 5",
          totalparticipants: 30,
          currentmeetingno: 5,
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
