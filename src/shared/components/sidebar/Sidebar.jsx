/* eslint-disable react-hooks/exhaustive-deps */
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

import DashboardDefaultIcon from "../../../assets/dashboard.svg";
import DashboardSelectedIcon from "../../../assets/dashboard-selected.svg";
// import ProfituneDefaultIcon from '../../../assets/icons/profitune.svg';
// import ProfituneSelectedIcon from '../../../assets/icons/profitune-selected.svg';
// import CoachDashboardDefaultIcon from '../../../assets/icons/coach-dashboard.svg';
// import CoachDashboardSelectedIcon from '../../../assets/icons/coach-dashboard-selected.svg';
// import QuestionnaireDefaultIcon from '../../../assets/icons/questionnaire.svg';
// import QuestionnaireSelectedIcon from '../../../assets/icons/questionnaire-selected.svg';
// import ClientsDefaultIcon from '../../../assets/icons/groups.svg';
// import ClientsSelectedIcon from '../../../assets/icons/groups-selected.svg';
// import SettingsDefaultIcon from '../../../assets/icons/settings.svg';
// import SettingsSelectedIcon from '../../../assets/icons/settings-selected.svg';

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
    const filteredItems = drawerItems.filter(({ permission }) =>
      checkPermission(permission),
    );
    setNavigationList(filteredItems);
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
            ({ title, defaultIcon, selectedIcon, href, children }) => {
              const isCollapsed = collapsed[title];
              const ExpandIcon = isCollapsed ? ExpandMore : ExpandLess;
              const isSelected =
                location.pathname === "/"
                  ? href === location.pathname
                  : href.includes(location.pathname.split("/")[1]);

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
                            src={isSelected ? selectedIcon : defaultIcon}
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
                          renderChildItem({ ...child, sidebarOpen }),
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
  defaultIcon: childDefaultIcon,
  selectedIcon: childSelectedIcon,
  href: childHref,
  sidebarOpen,
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
              src={isSelected ? childSelectedIcon : childDefaultIcon}
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

const drawerItems = [
  {
    href: "/",
    title: "Dashboard",
    defaultIcon: DashboardDefaultIcon,
    selectedIcon: DashboardSelectedIcon,
    permission: "dashboard.read",
  },
  {
    href: "/wards",
    title: "Wards",
    defaultIcon: DashboardDefaultIcon,
    selectedIcon: DashboardSelectedIcon,
    permission: "wards.read",
  },
];
