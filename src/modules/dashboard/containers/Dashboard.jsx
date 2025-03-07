import { Box, Skeleton, Stack } from "@mui/material";
import { PageLayout } from "../../../shared";
import { useDashboard } from "../hooks";
import { CountCard } from "../components";
import { Passbook } from "../../members/containers";
import { useLocation } from "react-router-dom";

export const Dashboard = () => {
  const location = useLocation();
  const { state } = useDashboard();
  const { dashboardCards, contentLoading } = state;

  const isMember = location.pathname === "/";

  return (
    <PageLayout title="Dashboard">
      <Stack flexDirection="row" gap={{ xs: 1, md: 3 }} flexWrap="wrap">
        {contentLoading
          ? dashboardCards.map((card) => {
              return (
                <Box key={card.accessor} width={{ xs: "100%", md: "286.5px" }}>
                  <Skeleton
                    width="100%"
                    height="100px"
                    variant="rounded"
                    animation="pulse"
                  />
                </Box>
              );
            })
          : dashboardCards.map((card) => {
              return <CountCard key={card.accessor} {...card} />;
            })}
      </Stack>

      {isMember && (
        <Stack mt={3}>
          <Passbook />
        </Stack>
      )}
    </PageLayout>
  );
};
