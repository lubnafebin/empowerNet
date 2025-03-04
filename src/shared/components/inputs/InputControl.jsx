import React from "react";
import PropTypes from "prop-types";
import { CalendarMonth, Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export const InputControl = React.forwardRef(function InputControl(
  {
    onMouseDown,
    onClick,
    showPassword,
    label = "",
    type = "",
    value,
    width,
    onClear,
    inputLabel,
    inputType,
    rows = 4,
    helperText = "",
    autofill = undefined,
    optionValues = [],
    ...rest
  },
  ref,
) {
  let inputElement = null;

  switch (type) {
    case "textarea":
      inputElement = (
        <FormControl>
          <TextField
            fullWidth
            label={label}
            error={Boolean(helperText)}
            type={type}
            multiline
            rows={rows}
            value={value}
            {...rest}
            ref={ref}
          />
          <FormHelperText component="div" sx={{ color: "#C60808" }}>
            {helperText}
          </FormHelperText>
        </FormControl>
      );
      break;
    case "dropdown":
      inputElement = (
        <FormControl fullWidth variant="outlined">
          <Autocomplete fullWidth value={value} {...rest} ref={ref} />
          <FormHelperText sx={{ color: "#C60808", ml: 0 }} component="div">
            {helperText}
          </FormHelperText>
        </FormControl>
      );
      break;
    case "password":
      inputElement = (
        <FormControl fullWidth variant="outlined" size={rest?.size}>
          <InputLabel
            id={label + "-input"}
            htmlFor={rest?.id || rest?.name}
            shrink={autofill}
          >
            {label}
          </InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            label={label}
            value={value}
            {...rest}
            ref={ref}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClick}
                  onMouseDown={onMouseDown}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText sx={{ color: "#C60808", ml: 0 }} component="div">
            {helperText}
          </FormHelperText>
        </FormControl>
      );
      break;
    case "outlinedInput":
      inputElement = (
        <FormControl fullWidth variant="outlined">
          {inputLabel && (
            <InputLabel
              id="outlined-input"
              htmlFor={rest?.id || rest?.name}
              shrink={autofill}
            >
              {label}
            </InputLabel>
          )}
          <OutlinedInput
            type={inputType}
            label={label}
            value={value}
            onWheel={(e) => e.target.blur()}
            {...rest}
            ref={ref}
            fullWidth
          />
          <FormHelperText sx={{ color: "#C60808", ml: 0 }} component="div">
            {helperText}
          </FormHelperText>
        </FormControl>
      );
      break;
    case "select":
      inputElement = (
        <FormControl sx={{ width: width || "100%" }} fullWidth>
          <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={value}
            input={<OutlinedInput label={label} size={rest?.size} />}
            MenuProps={{
              style: {
                maxHeight: 250,
              },
            }}
            {...rest}
          >
            {optionValues.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: "#C60808" }} component="div">
            {rest.helperText}
          </FormHelperText>
        </FormControl>
      );
      break;
    case "search":
      inputElement = (
        <FormControl fullWidth={rest.fullWidth}>
          <OutlinedInput
            value={value}
            {...rest}
            startAdornment={
              <InputAdornment sx={{ p: 0, m: 0 }} position="start">
                <SearchIcon size="small" />
              </InputAdornment>
            }
            endAdornment={
              value &&
              onClear && (
                <InputAdornment
                  sx={{ cursor: "pointer" }}
                  onClick={onClear}
                  position="end"
                >
                  <CloseIcon size="large" />
                </InputAdornment>
              )
            }
          />
        </FormControl>
      );
      break;
    case "date":
      inputElement = (
        <FormControl fullWidth={rest.fullWidth}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...rest}
              label={label}
              value={value}
              slots={{
                openPickerIcon: CalendarMonth, // Use your custom icon here
              }}
              slotProps={{
                openPickerButton: {
                  size: rest.size,
                },
                textField: {
                  size: rest?.size,
                  required: rest?.required,
                },
              }}
            />
            <FormHelperText sx={{ color: "#C60808" }} component="div">
              {helperText}
            </FormHelperText>
          </LocalizationProvider>
        </FormControl>
      );
      break;
    default:
      inputElement = (
        <FormControl variant="outlined" sx={{ width: width || "100%" }}>
          <TextField
            size="medium"
            fullWidth
            type={type}
            label={label}
            value={value}
            onWheel={(e) => e.target.blur()}
            {...rest}
            ref={ref}
          />
          <FormHelperText sx={{ color: "#C60808", m: 0 }} component="div">
            {helperText}
          </FormHelperText>
        </FormControl>
      );
      break;
  }

  return <React.Fragment>{inputElement}</React.Fragment>;
});

// Define prop types for InputControl
InputControl.propTypes = {
  onMouseDown: PropTypes.func,
  onClick: PropTypes.func,
  showPassword: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any, // You can be more specific based on the expected value type
  width: PropTypes.string,
  onClear: PropTypes.func,
  inputLabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  inputType: PropTypes.string,
  rows: PropTypes.number,
  helperText: PropTypes.any,
  optionValues: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ),
  autofill: PropTypes.bool,
};
