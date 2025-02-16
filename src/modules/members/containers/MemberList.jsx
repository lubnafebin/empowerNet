import React from "react";
import { AlertBlock, PageLayout, ReactTable } from "../../../shared";
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  CancelRounded,
  CheckCircle,
  DeleteOutlineRounded,
  InfoOutlined,
  Telegram,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useMemberList } from "../hooks";
import dayjs from "dayjs";
import { useLocation, useParams } from "react-router-dom";
import { useUtilFunctions, utilFunctions } from "../../../utils";
import {
  ApproveOrRejectMember,
  ApproveOrRejectNhg,
  ManageMember,
} from "../components";

export const MemberList = () => {
  const {
    state,
    formValidator,
    getMemberList,
    refetchNhgDetails,
    sendRequestVerification,
    toggleModel,
    handleFormChange,
    handleFormSubmit,
    handleResetFormData,
    handleSendMemberVerificationRequest,
  } = useMemberList();
  const { checkPermission } = useUtilFunctions();
  const approveNhgPermission = checkPermission("nhgs.id.APPROVE");
  const createMemberPermission = checkPermission("member.id.POST");
  const updateNhgPermission = checkPermission("nhg.PUT");
  const deleteMemberPermission = checkPermission("member.id.DELETE");
  const approveMemberPermission = checkPermission("allMembers.id.APPROVE");

  const { nhgId, wardId } = useParams();
  const location = useLocation();

  const columns = React.useMemo(
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
              {user?.name?.[0]}
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
        }) => <Typography fontSize="14px">{user?.name}</Typography>,
        enableSorting: true,
        placement: "right",
      },
      {
        header: "Email",
        cell: ({
          row: {
            original: { user },
          },
        }) => <Typography fontSize="14px">{user?.email}</Typography>,
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
        }) => {
          return (
            <Chip
              label={status.name}
              color={utilFunctions.getChipColor(status.name)}
            />
          );
        },
        enableSorting: true,
      },
      {
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        meta: { rowCellStyle: { width: 100 } },
        cell: ({
          row: {
            original: { id, status, user },
          },
        }) => {
          const isVerified = status?.name === "Verified";
          const isRejected = status?.name === "Rejected";
          return (
            <Stack flexDirection="row">
              {approveMemberPermission && (
                <Tooltip
                  title={isVerified ? "Verified" : "Verify"}
                  arrow
                  disableInteractive
                >
                  {isVerified || isRejected ? (
                    <IconButton size="small" disableFocusRipple disableRipple>
                      {isVerified ? (
                        <CheckCircle fontSize="small" color="success" />
                      ) : (
                        <CancelRounded fontSize="small" color="error" />
                      )}
                    </IconButton>
                  ) : (
                    <IconButton
                      size="small"
                      onClick={() =>
                        toggleModel({
                          type: "approve-or-reject-member",
                          id,
                        })
                      }
                      sx={{
                        visibility: ["Draft"].includes(status.name)
                          ? "hidden"
                          : "visible",
                      }}
                    >
                      <CheckCircle fontSize="small" color="warning" />
                    </IconButton>
                  )}
                </Tooltip>
              )}
              <Tooltip title="Member Details" arrow disableInteractive>
                <IconButton
                  size="small"
                  onClick={() => toggleModel({ type: "memberDetails", id })}
                >
                  <VisibilityOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
              {deleteMemberPermission && (
                <Tooltip title="Delete Member" arrow disableInteractive>
                  <>
                    <IconButton
                      size="small"
                      onClick={() =>
                        toggleModel({ type: "deleteMember", id: user?.id })
                      }
                      disabled={!["Rejected", "Draft"].includes(status.name)}
                    >
                      <DeleteOutlineRounded fontSize="small" />
                    </IconButton>
                  </>
                </Tooltip>
              )}
            </Stack>
          );
        },
      },
    ],
    [],
  );

  const breadcrumbs = nhgId
    ? [
        {
          title: "Dashboard",
          href: "/cds",
        },
        {
          title: "Wards",
          href: "/cds/wards",
        },
        {
          title: location.state.ward,
          href: `/cds/wards/${wardId}/nhgs`,
        },
        {
          title: "Members",
        },
      ]
    : [
        {
          title: "Dashboard",
          href: "/",
        },
        {
          title: "Members",
        },
      ];

  const isDraftMode = state.nhgDetails.status.name === "Draft";
  const isInReviewMode = state.nhgDetails.status.name === "In Review";

  const isAdsRequestDisabled = state.memberList.options.length <= 4;

  return (
    <PageLayout
      title={
        <Stack flexDirection="row" gap="8px" alignItems="center">
          {state.nhgDetailsFetching ? (
            <React.Fragment>
              <Skeleton width="250px" height="30px" variant="rounded" />
              <Skeleton width="80px" height="30px" variant="rounded" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography component="h1" variant="h5" fontWeight="bold">
                {state.nhgDetails.user.name}
              </Typography>
              <Chip
                label={state.nhgDetails.status.name}
                color={utilFunctions.getChipColor(state.nhgDetails.status.name)}
              />
            </React.Fragment>
          )}
        </Stack>
      }
      breadcrumbs={breadcrumbs}
      actionSection={
        <Stack flexDirection="row" gap="14px">
          {approveNhgPermission && isInReviewMode && (
            <Button
              variant="contained"
              onClick={() => toggleModel({ type: "approve/reject" })}
              disabled={isAdsRequestDisabled}
            >
              Approve/Reject
            </Button>
          )}
          {updateNhgPermission &&
            ["Draft", "Rejected"].includes(state.nhgDetails.status.name) && (
              <Button
                variant="contained"
                startIcon={<Telegram />}
                onClick={sendRequestVerification}
                disabled={isAdsRequestDisabled}
              >
                Send Verification Request
              </Button>
            )}
          {createMemberPermission && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => toggleModel({ type: "newMember" })}
            >
              New Member
            </Button>
          )}
        </Stack>
      }
    >
      {isDraftMode && !state.nhgDetailsFetching && (
        <AlertBlock>
          <InfoOutlined fontSize="small" />
          Add your members and complete your NHG registration by requesting ADS
          verification. A minimum of three members, along with a president and a
          secretary, is required to register an NHG.
        </AlertBlock>
      )}
      <ReactTable
        title="Members"
        columns={columns}
        data={state.memberList.options}
        loading={state.memberList.loading}
      />

      <ManageMember
        {...{
          dialogValue: "?member",
          formValidator,
          handleFormChange,
          handleFormSubmit,
          handleResetFormData,
          handleSendMemberVerificationRequest,
          state,
        }}
      />

      <ManageMember
        {...{
          dialogValue: "?new-member",
          formValidator,
          handleFormChange,
          handleFormSubmit,
          handleResetFormData,
          handleSendMemberVerificationRequest,
          state,
        }}
      />
      <ApproveOrRejectNhg refetchNhgDetails={refetchNhgDetails} />
      <ApproveOrRejectMember refetchMemberDetails={getMemberList} />
    </PageLayout>
  );
};
