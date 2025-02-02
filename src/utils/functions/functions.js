import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

export const utilFunctions = {
  formatDateAndTime: (date) => dayjs(date).format("ddd DD, MMM YYYY, hh:mm A"),
  formatDate: (date) => dayjs(date).format("ddd DD, MMM YYYY"),
  displayError: (exception) => {
    const { message, error } = exception.response.data.data;
    message && enqueueSnackbar({ message, variant: "error" });

    error.fieldErrors.forEach((fieldError) => {
      fieldError.message &&
        enqueueSnackbar({ message: fieldError.message, variant: "error" });

      fieldError.messages.forEach((msg) =>
        enqueueSnackbar({ message: msg, variant: "error" }),
      );
    });
  },
  getChipColor: (status) => {
    return status === "Draft"
      ? "info"
      : ["In Review"].includes(status)
        ? "warning"
        : ["Rejected", "Inactive"].includes(status)
          ? "error"
          : ["Registered", "Verified", "Active"].includes(status)
            ? "success"
            : "default";
  },
};
