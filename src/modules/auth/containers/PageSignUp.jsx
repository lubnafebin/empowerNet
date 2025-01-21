import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { InputControl, LoadingButton } from "../../../shared";
import Logo from "../../../assets/logo-dark.svg";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { usePageSignUp } from "../hooks";

export const PageSignUp = () => {
  const { palette } = useTheme();
  const { accountType } = useParams();
  const {
    state,
    formValidator,
    handleFormChange,
    togglePassword,
    handleFormSubmit,
  } = usePageSignUp();

  const helperTexts = {
    name: formValidator.current.message(
      "name",
      state.formData.name,
      "required",
    ),
    email: formValidator.current.message(
      "email",
      state.formData.email,
      "required|email",
    ),
    password: formValidator.current.message(
      "password",
      {
        password: state.formData.password,
        confirmPassword: state.formData.confirmPassword,
      },
      "required|matchPassword",
    ),
    confirmPassword: formValidator.current.message(
      "confirmPassword",
      {
        password: state.formData.password,
        confirmPassword: state.formData.confirmPassword,
      },
      "required|matchPassword",
    ),
  };

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
        variant="shadow"
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
          onSubmit={handleFormSubmit}
          sx={{ width: { md: 300, sx: "100%" }, transition: "0.5s all" }}
        >
          {accountType === "nhg" && (
            <React.Fragment>
              <InputControl
                type="dropdown"
                options={state.cdsList.options}
                isOptionEqualToValue={(option, current) => {
                  return option.id === current.id;
                }}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) =>
                  handleFormChange({ target: { name: "cds", value } })
                }
                value={state.formData.cds}
                renderInput={(props) => (
                  <TextField label="CDS" {...props} placeholder="Select CDS" />
                )}
              />
              <InputControl
                type="dropdown"
                disabled={Boolean(!state.formData.cds)}
                options={state.wardList.options}
                isOptionEqualToValue={(option, current) => {
                  return option.id === current.id;
                }}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) =>
                  handleFormChange({ target: { name: "ward", value } })
                }
                value={state.formData.ward}
                renderInput={(props) => (
                  <TextField
                    label="Ward"
                    {...props}
                    placeholder="Select Ward"
                  />
                )}
              />
            </React.Fragment>
          )}
          <InputControl
            name="name"
            type="text"
            label={accountType.toUpperCase()}
            placeholder="Enter name"
            value={state.formData.name}
            onChange={handleFormChange}
            helperText={helperTexts.name}
            error={Boolean(helperTexts.name)}
          />
          <InputControl
            name="email"
            label="Email"
            placeholder="sample@gmail.com"
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
            onClick={() => togglePassword({ field: "Password" })}
            helperText={helperTexts.password}
            error={Boolean(helperTexts.password)}
          />
          <InputControl
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={state.formData.confirmPassword}
            showPassword={state.showConfirmPassword}
            onChange={handleFormChange}
            onClick={() => togglePassword({ field: "ConfirmPassword" })}
            helperText={helperTexts.confirmPassword}
            error={Boolean(helperTexts.confirmPassword)}
          />
          <Link
            to="/auth/login"
            style={{
              textDecoration: "none",
              fontSize: "14px",
              color: "#051A34",
              fontWeight: "600",
              // display: isLargeDevice ? "block" : "none",
            }}
          >
            Already have an account?
          </Link>
          <LoadingButton loading={state.submitButtonLoading}>
            Sign Up
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
