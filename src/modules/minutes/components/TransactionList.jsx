/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import React from "react";
import { ReactTable } from "../../../shared";
import { useTransactionList } from "../hooks";
import { ManageDeposit } from "./ManageDeposit";
import { ManageRefund } from "./ManageRefund";
import { ManageMemberFee } from "./ManageMemberFee";
import { ManageWithdraw } from "./ManageWithdraw";

export const TransactionList = ({ title, transactionType, actionSection }) => {
  const { state, reloadTable } = useTransactionList({
    transactionType,
  });

  const columns = React.useMemo(() => {
    const tableColumns = [
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
    ];

    if (transactionType === "deposit") {
      const depositColumns = [
        {
          header: "Deposit",
          accessorKey: "deposit",
          enableSorting: true,
          isVisible: true,
        },
        {
          header: "Total Savings",
          cell: ({
            row: {
              original: { totalDeposit },
            },
          }) => (
            <Typography fontSize={16} fontWeight={500} color="success.light">
              {totalDeposit}
            </Typography>
          ),
          enableSorting: true,
        },
      ];

      tableColumns.push(...depositColumns);
    } else if (transactionType === "refund") {
      const refundColumns = [
        {
          header: "Refund",
          accessorKey: "refund",
          enableSorting: true,
          meta: {
            rowCellStyle: {
              align: "center",
            },
          },
        },
        {
          header: "Total Refund",
          cell: ({
            row: {
              original: { totalRefund },
            },
          }) => (
            <Typography fontSize={16} fontWeight={500} color="success.light">
              {totalRefund}
            </Typography>
          ),
          enableSorting: true,
        },
      ];

      tableColumns.push(...refundColumns);
    } else if (transactionType === "member fee") {
      const memberColumns = [
        {
          header: "Member Fee",
          accessorKey: "memberFee",
        },
        {
          header: "Total Member Fee",
          cell: ({
            row: {
              original: { totalMemberFee },
            },
          }) => (
            <Typography fontSize={16} fontWeight={500} color="success.light">
              {totalMemberFee}
            </Typography>
          ),
          enableSorting: true,
        },
      ];

      tableColumns.push(...memberColumns);
    } else if (transactionType === "withdraw") {
      const withdrawColumns = [
        {
          header: "Amount",
          accessorKey: "withdraw",
        },
        {
          header: "Total Savings",
          cell: ({
            row: {
              original: { totalDeposit },
            },
          }) => (
            <Typography fontSize={16} fontWeight={500} color="success.light">
              {totalDeposit}
            </Typography>
          ),
          enableSorting: true,
        },
      ];
      tableColumns.push(...withdrawColumns);
    }

    return tableColumns;
  }, []);

  return (
    <React.Fragment>
      <ReactTable
        title={title}
        columns={columns}
        data={state.transactions.options}
        loading={state.isTableLoading}
        actionSection={actionSection}
      />
      {location.search === "?new-deposit" && (
        <ManageDeposit reloadTable={reloadTable} />
      )}
      {location.search === "?new-refund" && (
        <ManageRefund reloadTable={reloadTable} />
      )}
      {location.search === "?new-fee" && (
        <ManageMemberFee reloadTable={reloadTable} />
      )}
      {location.search === "?new-withdraw" && (
        <ManageWithdraw reloadTable={reloadTable} />
      )}
    </React.Fragment>
  );
};
