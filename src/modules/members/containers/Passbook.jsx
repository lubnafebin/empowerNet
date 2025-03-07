import React from "react";
import { ReactTable } from "../../../shared";
import { useImmer } from "use-immer";
import { utilFunctions } from "../../../utils";
import { getMemberTransactionsApi } from "../apis";
import { Typography } from "@mui/material";

export const Passbook = () => {
  const { state } = usePassbook();
  const columns = React.useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "transactionDate",
        enableSorting: true,
      },
      {
        header: "Time",
        accessorKey: "transactionTime",
        enableSorting: true,
      },
      {
        header: "Transaction Type",
        accessorKey: "type",
        enableSorting: true,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        enableSorting: true,
        cell: ({
          row: {
            original: { type, amount },
          },
        }) => {
          const credit = ["Deposit", "Refund"].includes(type);
          const debit = ["Withdraw", "Loan"].includes(type);

          return (
            <Typography
              color={
                credit ? "success" : debit ? "error" : "text.primary"
              }
            >
              {credit ? `+₦${amount}` : debit ? `-₦${amount}` : `₦${amount}`}
            </Typography>
          );
        },
      },
      {
        header: "Savings",
        accessorKey: "currentBalance",
        enableSorting: true,
        cell: ({
          row: {
            original: { type, currentBalance },
          },
        }) => {
          const depositOrWithdraw = ["Deposit", "Withdraw"].includes(type);

          return (
            <Typography color="success">
              {depositOrWithdraw ? currentBalance : "-"}
            </Typography>
          );
        },
      },
      {
        header: "Total Refunds",
        accessorKey: "currentBalance",
        enableSorting: true,
        cell: ({
          row: {
            original: { type, currentBalance },
          },
        }) => {
          const refundOrLoan = ["Refund", "Loan"].includes(type);

          return (
            <Typography color="success">
              {refundOrLoan ? currentBalance : "-"}
            </Typography>
          );
        },
      },
    ],
    [],
  );

  return (
    <ReactTable
      title="Transactions"
      disableDefaultSearch
      hideHeader
      columns={columns}
      data={state.transactions.options}
      loading={state.transactions.loading}
    />
  );
};

const usePassbook = () => {
  const [state, setState] = useImmer({
    transactions: { options: [], loading: true },
  });

  const getMemberTransactions = async () => {
    triggerTableLoading(true);
    try {
      const response = await getMemberTransactionsApi();
      const { success, message, data } = response;

      if (success) {
        setState((draft) => {
          draft.transactions.options = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerTableLoading(false);
    }
  };

  const triggerTableLoading = (status) => {
    setState((draft) => {
      draft.transactions.loading = status;
    });
  };

  React.useEffect(() => {
    getMemberTransactions();
  }, []);

  return { state };
};
