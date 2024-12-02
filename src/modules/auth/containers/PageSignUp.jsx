import { Box, Button, FormControl, Paper, Stack, Typography, useTheme, Autocomplete, TextField } from "@mui/material";
import { InputControl } from "../../../shared";
import Logo from "../../../assets/logo-dark.svg";
import { usePageSignUp } from "../hooks";
import { Link } from "react-router-dom";

export const PageSignUp = ({ loginType }) => {
  console.log('loginType:', loginType);
  const { palette } = useTheme();
  const { handleFormChange, handleSignUp, handlePasswordToggle, state, formValidator } = usePageSignUp();

  const cdsHelperText = formValidator.current.message("cds", state.formData.cds, "required|alpha_space")
  const emailHelperText = formValidator.current.message("email", state.formData.email, "required|email")
  const passwordHelperText = formValidator.current.message("password", state.formData.password, "required")
  const confirmPasswordHelperText = formValidator.current.message("confirm password", { password: state.formData.password, confirmPassword: state.formData.confirmPassword }, "required|confirmPassword");

  const wardHelperText = formValidator.current.message("ward", state.formData.ward, "required");
  const nhgHelperText = formValidator.current.message("nhg", state.formData.nhg, "required|alpha_space");
  const usernameHelperText = formValidator.current.message("username", state.formData.username, "required");



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
        outline="0.5px solid #BCB6B6"
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
          component="form"
          sx={{ width: { md: 300, sx: "100%" }, transition: "0.5s all" }}
          onSubmit={handleSignUp}
        >
          {loginType === 'cds' ? (
            <>
              <InputControl
                label="CDS"
                placeholder="Enter CDS name"
                name="cds"
                value={state.formData.cds}
                onChange={handleFormChange}
                helperText={cdsHelperText}
                error={Boolean(cdsHelperText)} />
              <InputControl
                label="Email"
                placeholder="cdsemail@gmail.com"
                name="email"
                value={state.formData.email}
                onChange={handleFormChange}
                helperText={emailHelperText}
                error={Boolean(emailHelperText)}
              />
            </>
          ) : (
            <>
              <Autocomplete
                value={state.formData.ward}
                onChange={(event, newValue) => handleFormChange({ target: { name: 'ward', value: newValue } })}
                options={["Ward 1", "Ward 2", "Ward 3", "Ward 4"]}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ward"
                    error={Boolean(wardHelperText)}
                    helperText={wardHelperText}
                  />
                )}
              />
              <InputControl
                label="NHG"
                placeholder="Enter NHG Name"
                name="nhg"
                value={state.formData.nhg}
                onChange={handleFormChange}
                helperText={nhgHelperText}
                error={Boolean(nhgHelperText)} />

              <InputControl
                label="User name"
                placeholder="jhone@gmail.com"
                name="username"
                value={state.formData.username}
                onChange={handleFormChange}
                helperText={usernameHelperText}
                error={Boolean(usernameHelperText)} />
            </>
          )}
          <InputControl
            label="Password"
            type="password"
            placeholder="Enter your password"
            showPassword={state.showPassword}
            name="password"
            value={state.formData.password}
            onChange={handleFormChange}
            onClick={() => handlePasswordToggle("showPassword")}
            helperText={passwordHelperText}
            error={Boolean(passwordHelperText)}
          />
          <InputControl
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            showPassword={state.showConfirmPassword}
            name="confirmPassword"
            value={state.formData.confirmPassword}
            onChange={handleFormChange}
            onClick={() => handlePasswordToggle("showConfirmPassword")}
            helperText={confirmPasswordHelperText}
            error={Boolean(confirmPasswordHelperText)}
          />
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#051A34",
            }}
          >
            Already have an account?
          </Link>

          <Button type="submit" variant="contained" size="small">
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
