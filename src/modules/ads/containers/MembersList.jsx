import { Avatar, IconButton } from "@mui/material";
import { BasicTable, InputControl } from "../../../shared";
import { Visibility } from "@mui/icons-material";

export  const  MembersList=()=> {
    const columns = [
        { label: "No", field: "no" },
        {
          label: "Profile",
          field: "profile",
          cell: (row) => {
            return (
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt="Profile"
                src={row.profile}
              >
                {row.name[0]}{" "}
              </Avatar>
            );
          },
        },
        { label: "Name", field: "name" },
        { label: "Email", field: "email" },
        { label: "Adhar No", field: "adharno" },
        { label: "Contact No", field: "contactno" },
        { label: "Address", field: "address" },
        { label: "Signature", field: "signature" },
        { label: "Role", field: "role" },
        {
          label: "Actions",
          field: "actions",
          cell: () => (
              <IconButton>
                <Visibility />
              </IconButton>
          ),
        },
      ];
    const rows = [
        {
            no: 1,
            profile:
                "https://imgs.search.brave.com/iJBoiY_0vHi669DsczKJJ2BL6xWFWggzstl0ZlXJyEc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZGJj/ZG4uYi1jZG4ubmV0/L2ltZy9uZXcvYXZh/dGFycy8yLndlYnA",
            name: "Name 1",
            email: "email1@example.com",
            adharno: "1234",
            contactno: "1234567890",
            address: "Address 1",
            signature: "Signature 1",
            role: "Member",
        },
        {
            no: 2,
            profile: "Profile 2",
            name: "Name 2",
            email: "email2@example.com",
            adharno: "5678",
            contactno: "0987654321",
            address: "Address 2",
            signature: "Signature 2",
            role: "President",
        },
        {
            no: 3,
            profile: "https://imgs.search.brave.com/iJBoiY_0vHi669DsczKJJ2BL6xWFWggzstl0ZlXJyEc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZGJj/ZG4uYi1jZG4ubmV0/L2ltZy9uZXcvYXZh/dGFycy8yLndlYnA",
            name: "Same 3",
            email: "email3@example.com",
            adharno: "9101",
            contactno: "1122334455",
            address: "Address 3",
            signature: "Signature 3",
            role: "secretory",
        },
        {
            no: 4,
            profile: "Profile 4",
            name: "Lame 4",
            email: "email4@example.com",
            adharno: "1121",
            contactno: "2233445566",
            address: "Address 4",
            signature: "Signature 4",
            role: "Member",
        },
        {
            no: 5,
            profile: "Profile 5",
            name: "Kame 5",
            email: "email5@example.com",
            adharno: "3141",
            contactno: "3344556677",
            address: "Address 5",
            signature: "Signature 5",
            role: "Member",
        },
        {
            no: 6,
            profile: "https://imgs.search.brave.com/iJBoiY_0vHi669DsczKJJ2BL6xWFWggzstl0ZlXJyEc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZGJj/ZG4uYi1jZG4ubmV0/L2ltZy9uZXcvYXZh/dGFycy8yLndlYnA",
            name: "Name 6",
            email: "email6@example.com",
            adharno: "5161",
            contactno: "4455667788",
            address: "Address 6",
            signature: "Signature 6",
            role: "Secretory",
        },
        {
            no: 7,
            profile: "https://imgs.search.brave.com/iJBoiY_0vHi669DsczKJJ2BL6xWFWggzstl0ZlXJyEc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZGJj/ZG4uYi1jZG4ubmV0/L2ltZy9uZXcvYXZh/dGFycy8yLndlYnA",
            name: "Name 7",
            email: "email7@example.com",
            adharno: "7181",
            contactno: "5566778899",
            address: "Address 7",
            signature: "Signature 7",
            role: "Member",
        },
        {
            no: 8,
            profile: "https://imgs.search.brave.com/iJBoiY_0vHi669DsczKJJ2BL6xWFWggzstl0ZlXJyEc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZGJj/ZG4uYi1jZG4ubmV0/L2ltZy9uZXcvYXZh/dGFycy8yLndlYnA",
            name: "Name 8",
            email: "email8@example.com",
            adharno: "9202",
            contactno: "6677889900",
            address: "Address 8",
            signature: "Signature 8",
            role: "Member",
        },
        {
            no: 9,
            profile: "https://imgs.search.brave.com/iJBoiY_0vHi669DsczKJJ2BL6xWFWggzstl0ZlXJyEc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZGJj/ZG4uYi1jZG4ubmV0/L2ltZy9uZXcvYXZh/dGFycy8yLndlYnA",
            name: "Name 9",
            email: "email9@example.com",
            adharno: "1222",
            contactno: "7788990011",
            address: "Address 9",
            signature: "Signature 9",
            role: "Member",
        },
        {
            no: 10,
            profile: "https://imgs.search.brave.com/iJBoiY_0vHi669DsczKJJ2BL6xWFWggzstl0ZlXJyEc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZGJj/ZG4uYi1jZG4ubmV0/L2ltZy9uZXcvYXZh/dGFycy8yLndlYnA",
            name: "Name 10",
            email: "email10@example.com",
            adharno: "3242",
            contactno: "8899001122",
            address: "Address 10",
            signature: "Signature 10",
            role: "Member",
        },
    ];
      return (
        <BasicTable
          title="Members "
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
}
