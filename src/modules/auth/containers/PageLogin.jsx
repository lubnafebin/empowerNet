import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { InputControl } from "../../../shared";
import Logo from "../../../assets/logo-dark.svg";
import { CONSTANTS } from "../../../utils/constants/constants";
import { Link } from "react-router-dom";
import { usePageSignIn } from "../hooks";

export const PageLogin = () => {
  const { palette } = useTheme();
  const isLargeDevice = useMediaQuery("(min-width:1024px)");
  const slogan = !isLargeDevice
    ? "Welcome to EmpowerNet. Digitalize your work."
    : `Kudumbashree empowers women and families through self-help groups,
            promoting sustainable livelihoods and community development. It
            envisions a society where women actively participate in
            decision-making, driving poverty eradication and enhancing the
            quality of life for marginalized communities in Kerala.`;
  const title = !isLargeDevice ? " Sign In" : CONSTANTS.appName;
  const {
    formValidator,
    handleFormChange,
    handleFormSubmit,
    state,
    togglePassword,
  } = usePageSignIn();

  const helperTexts = {
    email: formValidator.current.message(
      "email",
      state.formData.email,
      "required|email",
    ),
    password: formValidator.current.message(
      "password",
      state.formData.password,
      "required",
    ),
  };
  console.log(helperTexts);
  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        component={Paper}
        variant="shadow"
        flexDirection={isLargeDevice ? "row" : "column"}
        gap={isLargeDevice ? "26px" : "8px"}
        p={isLargeDevice ? 5 : 3}
        elevation={0}
        boxShadow={0}
        // border="1px solid #BCB6B6"
        alignItems="center"
        sx={{ transition: "0.5s all " }}
      >
        <Stack gap={isLargeDevice ? "8px" : "2px"}>
          <Box component="img" src={Logo} height="56px" width="56px" />
          <Typography sx={{ fontSize: "28px", fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: palette.action.active,
              width: isLargeDevice ? "396px" : "250px",
            }}
          >
            {slogan}
          </Typography>
          <Link
            to="/auth/register/nhg"
            style={{
              textDecoration: "none",
              fontSize: "14px",
              color: "#051A34",
              fontWeight: "600",
              display: isLargeDevice ? "block" : "none",
            }}
          >
            Register your NHG?
          </Link>
        </Stack>
        <Stack
          gap="14px"
          component="form"
          onSubmit={handleFormSubmit}
          sx={{ width: isLargeDevice ? 250 : "100%", transition: "0.5s all" }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 500,
              display: isLargeDevice ? "block" : "none",
            }}
          >
            Sign In
          </Typography>
          <InputControl
            name="email"
            label="Email"
            placeholder="cdsemail@gmail.com"
            value={state.formData.email}
            onChange={handleFormChange}
            helperText={helperTexts.email}
            error={Boolean(helperTexts.email)}
          />
          <InputControl
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            showPassword={state.showPassword}
            value={state.formData.password}
            onChange={handleFormChange}
            onClick={togglePassword}
            helperText={helperTexts.password}
            error={Boolean(helperTexts.password)}
          />
          <Stack flexDirection="row" justifyContent="space-between">
            <Link
              to="/auth/reset-password"
              style={{
                textDecoration: "none",
                color: "#051A34",
              }}
            >
              Forgot Password?
            </Link>
            <Link
              to="/auth/register/nhg"
              style={{
                textDecoration: "none",
                color: "#051A34",
                display: isLargeDevice ? "none" : "block",
              }}
            >
              Register your NHG?
            </Link>
          </Stack>
          <Button variant="contained" size="small" type="submit">
            Sign In
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
