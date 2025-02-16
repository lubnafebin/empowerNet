import { PageLayout, TabPanel } from "../../../shared";
import { Button, Paper, Tab, Tabs } from "@mui/material";
import { useTransactions } from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { LoanList, TransactionList } from "../components";

export const Transactions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tab, handleTabChange } = useTransactions();

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/nhg/",
    },
    {
      title: "Minutes",
      href: `/nhg/minutes`,
    },
    {
      title: location.state?.minuteDate ?? "",
    },
  ];

  return (
    <PageLayout
      title={"Transactions on " + location.state?.minuteDate}
      breadcrumbs={breadcrumbs}
      sx={{ p: 0 }}
    >
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="transactions"
        component={Paper}
        elevation={0}
        variant="standard"
      >
        <Tab label="Deposits" />
        <Tab label="Refunds" />
        <Tab label="Member Fee" />
        <Tab label="Loans" />
        <Tab label="Withdraws" />
      </Tabs>

      {[
        {
          label: "Deposits",
          searchParam: "?new-deposit",
          button: "New Deposit",
          transactionType: "deposit",
        },
        {
          label: "Refunds",
          searchParam: "?new-refund",
          button: "New Refund",
          transactionType: "refund",
        },
        {
          label: "Membership Fees",
          searchParam: "?new-fee",
          button: "New Fee",
          transactionType: "member fee",
        },
        {
          label: "Loans",
          searchParam: "?new-loan",
          button: "New Loan",
          transactionType: "loan",
        },
        {
          label: "Withdraws",
          searchParam: "?new-withdraw",
          button: "New Withdraw",
          transactionType: "withdraw",
        },
      ].map((type, index) => {
        return (
          <TabPanel key={index} value={tab} index={index} sx={{ p: 3 }}>
            {type.transactionType === "loan" ? (
              <LoanList
                title={type.label}
                actionSection={
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      navigate(type.searchParam, { state: location.state })
                    }
                  >
                    {type.button}
                  </Button>
                }
              />
            ) : (
              <TransactionList
                title={type.label}
                transactionType={type.transactionType}
                actionSection={
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      navigate(type.searchParam, { state: location.state })
                    }
                  >
                    {type.button}
                  </Button>
                }
              />
            )}
          </TabPanel>
        );
      })}
    </PageLayout>
  );
};
