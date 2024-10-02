import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import { InputControl } from "../../../shared";
import Logo from "../../../assets/logo-dark.svg";
import { Link } from "react-router-dom";

export const PageSignUp = () => {
  const { palette } = useTheme();

  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        px={{ xs: "20px", md: "30px" }}
        py="40px"
        gap="16px"
        component={Paper}
        elevation={0}
        boxShadow="none"
        outline={{ md: "0.5px solid #BCB6B6", xs: "none" }}
        sx={{ transition: "0.5s all" }}
      >
        <Stack>
          <Box component="img" src={Logo} height="56px" width="56px" />
          <Typography sx={{ fontSize: "32px", fontWeight: 500 }}>
            Get Started
          </Typography>
          <Typography sx={{ fontSize: "14px", color: palette.action.active }}>
            Welcome to EmpowerNet. Digitalize your work.
          </Typography>
        </Stack>
        <Stack
          gap="14px"
          sx={{ width: { md: 300, sx: "100%" }, transition: "0.5s all" }}
        >
          <InputControl label="CDS" placeholder="Enter CDS name" />
          <InputControl label="Email" placeholder="cdsemail@gmail.com" />
          <InputControl
            label="Password"
            type="password"
            placeholder="Enter your password"
            showPassword={true}
          />
          <InputControl
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            showPassword={true}
          />

          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontSize: "14px",
              color: "#051A34",
              fontWeight: "600",
            }}
          >
            <span style={{ color: "dimgray" }}>Have an account</span> Login?
          </Link>
          <Button variant="contained" size="small">
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
