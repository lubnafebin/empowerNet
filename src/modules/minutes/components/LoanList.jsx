/* eslint-disable react/prop-types */
import React from "react";
import { ReactTable } from "../../../shared";
import { Chip, Typography } from "@mui/material";
import { ManageLoan } from "./ManageLoan";
import { useLoanList } from "../hooks";

export const LoanList = ({ title, actionSection }) => {
  const { state, reloadTable } = useLoanList();

  const columns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
      },
      {
        header: "Account Holder",
        cell: ({
          row: {
            original: { accountHolder },
          },
        }) => <Typography>{accountHolder.name}</Typography>,
        enableSorting: true,
      },
      {
        header: "Date",
        accessorKey: "transactionDate",
        enableSorting: true,
        meta: { stackStyle: { minWidth: 100 } },
      },
      {
        header: "Time",
        accessorKey: "transactionTime",
        enableSorting: true,
      },
      {
        header: "Recorder By",
        cell: ({
          row: {
            original: { createdBy },
          },
        }) => <Typography fontSize={14}>{createdBy?.name ?? "-"}</Typography>,
        enableSorting: true,
      },
      {
        header: "Status",
        cell: ({
          row: {
            original: { status },
          },
        }) => (
          <Chip
            label={status}
            color={status === "Active" ? "success" : "warning"}
          />
        ),
        enableSorting: true,
      },
      {
        header: "Refund",
        cell: ({
          row: {
            original: { refund },
          },
        }) => (
          <Typography fontSize={14} color="success">
            {refund}
          </Typography>
        ),
        enableSorting: true,
      },
      {
        header: "Remaining",
        cell: ({
          row: {
            original: { remainingAmount },
          },
        }) => (
          <Typography fontSize={14} color="warning">
            {remainingAmount}
          </Typography>
        ),
        enableSorting: true,
      },

      {
        header: "Amount",
        cell: ({
          row: {
            original: { amount },
          },
        }) => (
          <Typography fontSize={14} color="success.main">
            {amount}
          </Typography>
        ),
        enableSorting: true,
      },
    ],
    [],
  );

  return (
    <React.Fragment>
      <ReactTable
        title={title}
        columns={columns}
        data={state.loan.options}
        loading={state.isTableLoading}
        actionSection={actionSection}
      />
      {location.search === "?new-loan" && (
        <ManageLoan reloadTable={reloadTable} />
      )}
    </React.Fragment>
  );
};
