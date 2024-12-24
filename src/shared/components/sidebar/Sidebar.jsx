/* eslint-disable react/prop-types */
import * as React from "react";
import clsx from "clsx";
import { animated, useSpring } from "@react-spring/web";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderRounded from "@mui/icons-material/FolderRounded";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import {
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeItem2DragAndDropOverlay } from "@mui/x-tree-view/TreeItem2DragAndDropOverlay";
import { Button, Drawer, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CDS_ITEMS = [
  {
    id: "1.1",
    label: "Wards",
    route: "/cds/wards",
    fileType: "pin",
  },
  {
    id: "1.2",
    label: "ADS List",
    route: "/cds/ads",
    fileType: "pin",
  },
  {
    id: "1.3",
    label: "Monthly Reports",
    route: "/cds/monthly/report",
    fileType: "pin",
  },
  {
    id: "1.4",
    label: "Reports",
    route: "/cds/reports",
    fileType: "pin",
  },
];

const ADS_ITEMS = [
  {
    id: "1.1",
    label: "NHG List",
    route: "/ads/nhg/list",
    fileType: "pin",
  },
  {
    id: "1.2",
    label: "Member List",
    route: "/ads/nhg/memberlist",
    fileType: "pin",
  },
  {
    id: "1.3",
    label: "Requests",
    route: "/ads/nhg/requests",
    fileType: "pin",
  },
  {
    id: "1.4",
    label: "Monthly Reports",
    route: "/ads/nhg/monthly/report",
    fileType: "pin",
  },
  {
    id: "1.5",
    label: "Reports",
    route: "/ads/nhg/reports",
    fileType: "pin",
  },
];
const NHG_ITEMS = [
  {
    id: "1.1",
    label: "Members List",
    route: "/nhg/members/list",
    fileType: "pin",
  },
  {
    id: "1.2",
    label: "Roles",
    route: "/nhg/roles",
    fileType: "pin",
  },
  {
    id: "1.3",
    label: "Meeting Minutes",
    route: "/nhg/minutes",
    fileType: "pin",
  },
  {
    id: "1.4",
    label: "Meeting Agendas",
    route: "/nhg/agendas",
    fileType: "pin",
  },
  {
    id: "1.5",
    label: "Deposits and Refund",
    route: "/nhg/deposit",
    fileType: "pin",
  },
  {
    id: "1.6",
    label: "Membership Fee",
    route: "/nhg/membership",
    fileType: "pin",
  },
  {
    id: "1.7",
    label: "Monthly Reports",
    route: "/nhg/monthly/reports",
    fileType: "pin",
  },
  {
    id: "1.8",
    label: "Reports",
    route: "/nhg/reports",
    fileType: "pin",
  },
];

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: "70%",
        bgcolor: "warning.main",
        display: "inline-block",
        verticalAlign: "middle",
        zIndex: 1,
        mx: 1,
      }}
    />
  );
}

const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.grey[400],
  position: "relative",
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
  },
  ...theme.applyStyles("light", {
    color: theme.palette.grey[800],
  }),
}));

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  flexDirection: "row-reverse",
  borderRadius: theme.spacing(0.7),
  marginBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  fontWeight: 500,
  [`&.Mui-expanded `]: {
    "&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon":
      {
        color: theme.palette.primary.dark,
        ...theme.applyStyles("light", {
          color: theme.palette.primary.main,
        }),
      },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: "16px",
      top: "44px",
      height: "calc(100% - 48px)",
      width: "1.5px",
      backgroundColor: theme.palette.grey[700],
      ...theme.applyStyles("light", {
        backgroundColor: theme.palette.grey[300],
      }),
    },
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: "white",
    ...theme.applyStyles("light", {
      color: theme.palette.primary.main,
    }),
  },
  [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    ...theme.applyStyles("light", {
      backgroundColor: theme.palette.primary.main,
    }),
  },
}));

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

const StyledTreeItemLabelText = styled(Typography)({
  color: "inherit",
  fontFamily: "General Sans",
  fontWeight: 500,
});

function CustomLabel({ icon: Icon, expandable, children, ...other }) {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {Icon && (
        <Box
          component={Icon}
          className="labelIcon"
          color="inherit"
          sx={{ mr: 1, fontSize: "1.2rem" }}
        />
      )}

      <StyledTreeItemLabelText variant="body2">
        {children}
      </StyledTreeItemLabelText>
      {expandable && <DotIcon />}
    </TreeItem2Label>
  );
}

const isExpandable = (reactChildren) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

const getIconFromFileType = (fileType) => {
  switch (fileType) {
    case "image":
      return ImageIcon;
    case "pdf":
      return PictureAsPdfIcon;
    case "doc":
      return ArticleIcon;
    case "video":
      return VideoCameraBackIcon;
    case "folder":
      return FolderRounded;
    case "pinned":
      return FolderOpenIcon;
    case "trash":
      return DeleteIcon;
    default:
      return ArticleIcon;
  }
};

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const expandable = isExpandable(children);
  let icon;
  if (expandable) {
    icon = FolderRounded;
  } else if (item.fileType) {
    icon = getIconFromFileType(item.fileType);
  }

  return (
    <TreeItem2Provider itemId={itemId}>
      <StyledTreeItemRoot {...getRootProps(other)}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              "Mui-expanded": status.expanded,
              "Mui-selected": status.selected,
              "Mui-focused": status.focused,
              "Mui-disabled": status.disabled,
            }),
          })}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <CustomLabel
            {...getLabelProps({
              icon,
              expandable: expandable && status.expanded,
            })}
          />
          <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </CustomTreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </StyledTreeItemRoot>
    </TreeItem2Provider>
  );
});

export const Sidebar = ({ sidebarOpen }) => {
  const [drawerItems, setDrawerItems] = React.useState([]);
  const userType = "ads";
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userType === "cds") {
      setDrawerItems(CDS_ITEMS);
    } else if (userType === "ads") {
      setDrawerItems(ADS_ITEMS);
    } else if (userType === "nhg") {
      setDrawerItems(NHG_ITEMS);
    }
  }, []);

  return (
    <Drawer variant="persistent" anchor="left" open={sidebarOpen}>
      <RichTreeView
        items={drawerItems}
        sx={{
          height: "100vh",
          width: 250,
          borderRadius: 0,
          pt: "64px",
          px: 1,
        }}
        onItemClick={(_, itemId) =>
          navigate(drawerItems.find((item) => item.id === itemId).route)
        }
        slots={{ item: CustomTreeItem }}
      />
      <Stack>
        <Button onClick={() => setDrawerItems(CDS_ITEMS)}>CDS</Button>
        <Button onClick={() => setDrawerItems(ADS_ITEMS)}>ADS</Button>
        <Button onClick={() => setDrawerItems(NHG_ITEMS)}>NHG</Button>
      </Stack>
    </Drawer>
  );
};
