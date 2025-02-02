import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
  Collapse,
  Stack,
  Typography,
  useMediaQuery,
  Drawer as MuiDrawer,
} from "@mui/material";
import { Drawer as CustomDrawer } from "./Drawer";
import { DrawerHeader } from "./DrawerHeader";
import LogoDark from "../../../assets/logo-dark.svg";
import LogoLight from "../../../assets/logo-dark.svg";

import { ExpandLess, ExpandMore, Menu, MenuOpen } from "@mui/icons-material";
import PropsTypes from "prop-types";
import React from "react";
import { useImmer } from "use-immer";
import { version } from "../../../../package.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useUtilFunctions } from "../../../utils";

import DashboardLightModeIcon from "../../../assets/dashboard-icon-dark.svg";
import DashboardDarkModeIcon from "../../../assets/dashboard-icon-light.svg";
import DashboardSelectedIcon from "../../../assets/dashboard-icon-selected.svg";

import WardsLightModeIcon from "../../../assets/list-icon-light.svg";
import WardsDarkModeIcon from "../../../assets/list-icon-dark.svg";
import WardsSelectedIcon from "../../../assets/list-icon-selected.svg";

import ReportsLightModeIcon from "../../../assets/reports-icon-dark.svg";
import ReportsDarkModeIcon from "../../../assets/reports-icon-light.svg";
import ReportsSelectedIcon from "../../../assets/reports-icon-selected.svg";

import MembersLightModeIcon from "../../../assets/members-icon-dark.svg";
import MembersDarkModeIcon from "../../../assets/members-icon-light.svg";
import MembersSelectedIcon from "../../../assets/members-icon-selected.svg";

import ListLightModeIcon from "../../../assets/list-icon-light.svg";
import ListDarkModeIcon from "../../../assets/list-icon-dark.svg";
import ListSelectedIcon from "../../../assets/list-icon-selected.svg";

export const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useImmer({});
  const [navigationList, setNavigationList] = React.useState([]);
  const largeDevice = useMediaQuery(theme.breakpoints.up("md"));
  const smallDevice = useMediaQuery("(max-width: 425px)");
  const Drawer = largeDevice ? CustomDrawer : MuiDrawer;

  const { checkPermission } = useUtilFunctions();

  const handleCollapseToggle = (title, children, href) => {
    if (!children) navigate(href);
    if (!sidebarOpen) toggleSidebar();

    setCollapsed((draft) => {
      draft[title] = !draft[title];
    });
  };

  React.useLayoutEffect(() => {
    const permittedItems = drawerItems.filter(({ permission }) =>
      checkPermission(permission),
    );

    if (location.pathname.split("/")[1].includes("ads")) {
      const adsRoutes = permittedItems.filter(
        (item) => item.href.split("/")[1].includes("ads") || item.href === "/",
      );
      setNavigationList(
        [
          {
            href: "/ads",
            title: "Dashboard",
            lightModeIcon: DashboardLightModeIcon,
            darkModeIcon: DashboardDarkModeIcon,
            selectedIcon: DashboardSelectedIcon,
            permission: "dashboard.GET",
          },
        ].concat(adsRoutes),
      );
    } else if (location.pathname.split("/")[1].includes("nhg")) {
      const nhgRoutes = permittedItems.filter(
        (item) => item.href.split("/")[1].includes("nhg") || item.href === "/",
      );
      setNavigationList(
        [
          {
            href: "/nhg",
            title: "Dashboard",
            lightModeIcon: DashboardLightModeIcon,
            darkModeIcon: DashboardDarkModeIcon,
            selectedIcon: DashboardSelectedIcon,
            permission: "dashboard.GET",
          },
        ].concat(nhgRoutes),
      );
    } else if (location.pathname.split("/")[1].includes("cds")) {
      const cdsRoutes = permittedItems.filter(
        (item) => item.href.split("/")[1].includes("cds") || item.href === "/",
      );
      setNavigationList(
        [
          {
            href: "/cds",
            title: "Dashboard",
            lightModeIcon: DashboardLightModeIcon,
            darkModeIcon: DashboardDarkModeIcon,
            selectedIcon: DashboardSelectedIcon,
            permission: "dashboard.GET",
          },
        ].concat(cdsRoutes),
      );
    } else {
      const memberRoutes = permittedItems.filter(
        (item) =>
          !["cds", "ads", "nhg"].includes(item.href.split("/")[1]) ||
          item.href === "/",
      );
      setNavigationList(
        [
          {
            href: "/",
            title: "Dashboard",
            lightModeIcon: DashboardLightModeIcon,
            darkModeIcon: DashboardDarkModeIcon,
            selectedIcon: DashboardSelectedIcon,
            permission: "dashboard.GET",
          },
        ].concat(memberRoutes),
      );
    }
  }, []);

  return (
    <Drawer
      variant={largeDevice ? "permanent" : "temporary"}
      open={sidebarOpen}
      onClose={largeDevice ? undefined : toggleSidebar}
      PaperProps={{
        sx: {
          px: 1,
          border: theme.palette.mode === "dark" ? "none" : "",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: smallDevice ? "100%" : largeDevice ? "auto" : "260px",
        },
      }}
    >
      <DrawerHeader>
        <Stack
          flexDirection="row"
          gap="8px"
          display={sidebarOpen ? "flex" : "none"}
          transition="0.5s all ease-in-out"
        >
          <Box
            component="img"
            src={theme.palette.mode === "dark" ? LogoDark : LogoLight}
            width="24px"
            height="24px"
          />
          <Typography
            fontWeight={500}
            fontSize="16px"
            color="text.primary"
            fontFamily="sans-serif"
          >
            EmpowerNet
          </Typography>
        </Stack>

        <Tooltip
          title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          arrow
          placement="right"
          disableInteractive
        >
          <IconButton
            onClick={toggleSidebar}
            size="small"
            sx={
              {
                // color: '#ffffff',
                // display: sidebarOpen ? 'inline-flex' : 'none',
              }
            }
          >
            {sidebarOpen ? <Menu /> : <MenuOpen />}
          </IconButton>
        </Tooltip>
      </DrawerHeader>
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {navigationList.map(
            ({
              title,
              lightModeIcon,
              darkModeIcon,
              selectedIcon,
              href,
              children,
            }) => {
              const isCollapsed = collapsed[title];
              const ExpandIcon = isCollapsed ? ExpandMore : ExpandLess;
              const isSelected =
                location.pathname === "/"
                  ? href === location.pathname
                  : href.includes(location.pathname.split("/")[2]);

              return (
                <React.Fragment key={title}>
                  <ListItem
                    disablePadding
                    dense
                    sx={{
                      display: "flex",
                      // color: "#ffffff",
                    }}
                    onClick={() => handleCollapseToggle(title, children, href)}
                  >
                    <ListItemButton
                      selected={isSelected}
                      dense
                      sx={{
                        px: 1.5,
                        // justifyContent: sidebarOpen ? 'initial' : 'center',
                        // "&.Mui-selected": {
                        // backgroundColor: 'primary.main',
                        // color:
                        //   theme.palette.mode === "dark"
                        //     ? "#000"
                        //     : "primary.main",
                        // },
                        // "&.Mui-selected:hover": {
                        //   backgroundColor: 'primary.main',
                        // },
                      }}
                    >
                      <Tooltip
                        title={sidebarOpen ? "" : title}
                        arrow
                        placement="right-end"
                        disableInteractive
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            justifyContent: "center",
                            color: "inherit",
                            mr: 2,
                          }}
                        >
                          <Box
                            component="img"
                            src={
                              isSelected
                                ? selectedIcon
                                : theme.palette.mode === "light"
                                  ? darkModeIcon
                                  : lightModeIcon
                            }
                          />
                        </ListItemIcon>
                      </Tooltip>
                      <ListItemText primary={title} />
                      {children && sidebarOpen && (
                        <ExpandIcon fontSize="small" />
                      )}
                    </ListItemButton>
                  </ListItem>
                  {children && isCollapsed && (
                    <Collapse
                      in={isCollapsed}
                      timeout="auto"
                      easing="ease-in-out"
                      unmountOnExit
                    >
                      <List
                        disablePadding
                        dense
                        sx={{
                          display: sidebarOpen ? "block" : "none",
                          ml: 2,
                        }}
                      >
                        {children.map((child) =>
                          renderChildItem({ ...child, sidebarOpen, theme }),
                        )}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            },
          )}
        </List>
      </Box>
      <Stack
        width="100%"
        position="sticky"
        bottom={0}
        background={theme.palette.primary.main}
        alignItems="center"
        justifyContent="center"
        flexDirection={sidebarOpen ? "row" : "column"}
        transition="all 0.3s ease-in-out"
        columnGap={1}
      >
        <Typography variant="subtitle2" textAlign="center">
          {sidebarOpen ? "Version " : "V "}
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          {version}
        </Typography>
      </Stack>
    </Drawer>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropsTypes.bool.isRequired,
  toggleSidebar: PropsTypes.func.isRequired,
};

const renderChildItem = ({
  title: childTitle,
  lightModeIcon,
  darkModeIcon,
  selectedIcon,
  href: childHref,
  sidebarOpen,
  theme,
}) => {
  const isSelected = childHref === "/";
  return (
    <ListItem
      key={childTitle}
      disablePadding
      dense
      sx={{ display: "flex", color: "#ffffff" }}
    >
      <ListItemButton
        selected={isSelected}
        dense
        sx={{
          px: 2.5,
          borderRadius: 2,
          justifyContent: sidebarOpen ? "initial" : "center",
        }}
      >
        <Tooltip
          title={sidebarOpen ? "" : childTitle}
          arrow
          placement="right-end"
          disableInteractive
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              // color: 'inherit',
              mr: sidebarOpen ? 3 : "auto",
            }}
          >
            <Box
              component="img"
              src={
                isSelected
                  ? selectedIcon
                  : theme.palette.mode === "dark"
                    ? darkModeIcon
                    : lightModeIcon
              }
            />
          </ListItemIcon>
        </Tooltip>
        <ListItemText
          primary={childTitle}
          sx={{
            opacity: sidebarOpen ? 1 : 0,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
// #006BD6
const drawerItems = [
  {
    href: "/cds/wards",
    title: "Wards",
    lightModeIcon: WardsLightModeIcon,
    darkModeIcon: WardsDarkModeIcon,
    selectedIcon: WardsSelectedIcon,
    permission: "ward.all.GET",
  },
  {
    href: "/nhg/members",
    title: "Members",
    lightModeIcon: MembersLightModeIcon,
    darkModeIcon: MembersDarkModeIcon,
    selectedIcon: MembersSelectedIcon,
    permission: "member.all.GET",
  },
  {
    href: "/nhg/minutes",
    title: "Minutes",
    lightModeIcon: ListLightModeIcon,
    darkModeIcon: ListDarkModeIcon,
    selectedIcon: ListSelectedIcon,
    permission: "meeting.all.GET",
  },
  {
    href: "/cds/roles",
    title: "Roles",
    lightModeIcon: DashboardLightModeIcon,
    darkModeIcon: DashboardDarkModeIcon,
    selectedIcon: DashboardSelectedIcon,
    permission: "roles.GET",
  },
  {
    href: "/nhg/reports",
    title: "Reports",
    lightModeIcon: ReportsLightModeIcon,
    darkModeIcon: ReportsDarkModeIcon,
    selectedIcon: ReportsSelectedIcon,
    permission: "report.all.GET",
  },

  // ads routes
  {
    href: "/ads/nhgs",
    title: "NHGs",
    lightModeIcon: ListLightModeIcon,
    darkModeIcon: ListDarkModeIcon,
    selectedIcon: ListSelectedIcon,
    permission: "nhgs.all",
  },
  {
    href: "/ads/report/all",
    title: "All Reports",
    lightModeIcon: ReportsLightModeIcon,
    darkModeIcon: ReportsDarkModeIcon,
    selectedIcon: ReportsSelectedIcon,
    permission: "allReports.all.GET",
  },
  // {
  //   href: "/ads/member/all",
  //   title: "All Members",
  //   lightModeIcon: MembersLightModeIcon,
  //   darkModeIcon: MembersDarkModeIcon,
  //   selectedIcon: MembersSelectedIcon,
  //   permission: "report.verify",
  // },
  {
    href: "/cds/report/all",
    title: "All Reports",
    lightModeIcon: ReportsLightModeIcon,
    darkModeIcon: ReportsDarkModeIcon,
    selectedIcon: ReportsSelectedIcon,
    permission: "allReports.all.GET",
  },
  // {
  //   href: "/cds/member/all",
  //   title: "All Members",
  //   lightModeIcon: MembersLightModeIcon,
  //   darkModeIcon: MembersDarkModeIcon,
  //   selectedIcon: MembersSelectedIcon,
  //   permission: "allMembers.all.GET",
  // },
];
