import React from "react";
import { PageLayout, ReactTable, TabPanel } from "../../../shared";
import { useImmer } from "use-immer";
import { useParams } from "react-router-dom";
import { getNhgDetailsApi } from "../apis/wardApis";
import { utilFunctions } from "../../../utils";
import {
  Avatar,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useMemberList } from "../../members/hooks";
import { useReportList } from "../../reports/hooks";

export const NhgOverview = () => {
  const { state } = useNhgOverview();
  const memberListState = useMemberList();
  const reportListState = useReportList();

  const breadcrumbs = [
    { title: "Dashboard", href: "/ads" },
    { title: "Nhg List", href: "/ads/nhgs" },
    { title: state.nhg.details?.user?.name ?? "" },
  ];
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const memberColumns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Profile",
        cell: ({
          row: {
            original: { attachments, user },
          },
        }) => {
          const url = "http://localhost:5000/" + attachments[2]?.url;
          return (
            <Avatar
              src={url}
              sx={{
                width: "24px",
                height: "24px",
                fontSize: 14,
                backgroundColor: "primary.main",
              }}
            >
              {user.name[0]}
            </Avatar>
          );
        },
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Name",
        cell: ({
          row: {
            original: { user },
          },
        }) => <Typography fontSize="14px">{user.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Email",
        cell: ({
          row: {
            original: { user },
          },
        }) => <Typography fontSize="14px">{user.email}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Aadhar No",
        cell: ({
          row: {
            original: { address },
          },
        }) => <Typography fontSize="14px">{address.aadharNo}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Contact No",
        cell: ({
          row: {
            original: { address },
          },
        }) => <Typography fontSize="14px">{address.contactNo}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Created At",
        cell: ({
          row: {
            original: { createdAt },
          },
        }) => {
          return dayjs(createdAt).format("ddd DD, MMM YYYY, hh:mm A");
        },
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Role",
        cell: ({
          row: {
            original: { role },
          },
        }) => <Typography fontSize="14px">{role.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Status",
        cell: ({
          row: {
            original: { status },
          },
        }) => (
          <Chip
            label={status.name}
            color={status.name === "Not Verified" ? "warning" : "success"}
          />
        ),
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        placement: "right",
        meta: { width: 150 },
        cell: ({
          row: {
            original: { id },
          },
        }) => (
          <Stack flexDirection="row">
            {/* <Tooltip title="Member Details" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => toggleModel({ type: "memberDetails", id })}
              >
                <VisibilityOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Member" arrow disableInteractive>
              <IconButton
                size="small"
                onClick={() => toggleModel({ type: "deleteMember", id })}
              >
                <DeleteOutlineRounded fontSize="small" />
              </IconButton>
            </Tooltip> */}
          </Stack>
        ),
      },
    ],
    [],
  );

  const reportColumns = React.useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Report Duration",
        cell: ({
          row: {
            original: { startDate, endDate },
          },
        }) => {
          return (
            <Typography>
              {dayjs(startDate).format("DD MMM YYYY")} to
              {dayjs(endDate).format("DD MMM YYYY")}
            </Typography>
          );
        },
        enableSorting: true,
        meta: { cellStyle: { width: 230 } },
      },
      {
        header: "Created At",
        cell: () => utilFunctions.formatDate(),
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Deposit",
        accessorKey: "totalDeposits",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Refund",
        accessorKey: "totalRefunds",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Total Membership Fees",
        accessorKey: "totalMembershipFees",
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Approved By ADS",
        cell: ({
          row: {
            original: { verifiedByAds },
          },
        }) => {
          return (
            <Typography>
              {verifiedByAds?.user ? verifiedByAds.user.name : "-"}
            </Typography>
          );
        },
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Approved By CDS",
        cell: ({
          row: {
            original: { verifiedByCds },
          },
        }) => {
          return (
            <Typography>
              {verifiedByCds?.user ? verifiedByCds.user.name : "-"}
            </Typography>
          );
        },
        enableSorting: true,
        placement: "right",
      },

      {
        header: "Status",
        cell: ({
          row: {
            original: { status },
          },
        }) => {
          const statusLabel = status?.name?.toLowerCase();

          const color = statusLabel === "draft" ? "info" : "success";
          return <Chip label={statusLabel} color={color} />;
        },
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Action",
        cell: () => (
          // {
          // row: {
          //   original: { id, status },
          // },
          // },
          <Stack
            flexDirection="row"
            onClick={(event) => event.stopPropagation()}
          >
            {/* <Tooltip title="Report Details" arrow disableInteractive>
              <IconButton size="small" onClick={() => navigate(`${id}`)}>
                <ArrowForward fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow disableInteractive>
              <IconButton
                size="small"
                disabled={status?.name.toLowerCase() !== "draft"}
                onClick={() => handleDeleteReport(id)}
              >
                <DeleteOutlineRounded fontSize="small" />
              </IconButton>
            </Tooltip> */}
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <PageLayout
      title={
        state.nhg.details?.user ? (
          <Stack flexDirection="row" alignItems="center" gap="8px">
            <Typography component="h1" variant="h5" fontWeight="bold">
              {state.nhg.details?.user?.name}
            </Typography>
            <Chip
              label={state.nhg.details?.status?.name}
              color={
                state.nhg.details?.status?.name === "Registered"
                  ? "success"
                  : state.nhg.details?.status?.name === "Draft"
                    ? "primary"
                    : "warning"
              }
            />
          </Stack>
        ) : (
          <Skeleton height="40px" width="150px" />
        )
      }
      breadcrumbs={breadcrumbs}
      p={0}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
        component={Paper}
        elevation={0}
        variant="standard"
      >
        <Tab label="Members" />
        <Tab label="Reports" />
      </Tabs>
      <TabPanel value={value} index={0} sx={{ p: 3 }}>
        <ReactTable
          columns={memberColumns}
          data={memberListState.state.memberList.options}
          loading={memberListState.state.memberList.loading}
        />
      </TabPanel>
      <TabPanel value={value} index={1} sx={{ p: 3 }}>
        <ReactTable
          columns={reportColumns}
          data={reportListState.state.reports.options}
          loading={reportListState.state.reports.loading}
        />
      </TabPanel>
    </PageLayout>
  );
};

const useNhgOverview = () => {
  const [state, setState] = useImmer({
    nhg: { details: {}, loading: true },
  });
  const { nhgId } = useParams();

  const getNhgDetails = async (nhgId) => {
    triggerNhgDetailsLoading(true);
    try {
      const response = await getNhgDetailsApi(nhgId);

      const { success, message, data } = response;

      if (success) {
        setState((draft) => {
          draft.nhg.details = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerNhgDetailsLoading(false);
    }
  };

  const triggerNhgDetailsLoading = (loading) => {
    setState((draft) => {
      draft.nhg.loading = loading;
    });
  };

  React.useEffect(() => {
    getNhgDetails(nhgId);
  }, []);

  return { state };
};
