import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useUtilFunctions } from "../../../utils";

export const UserProfileCard = () => {
  const { getLoggedInUser } = useUtilFunctions();
  const { name, email } = getLoggedInUser();
  return (
    <ListItemButton
      disableRipple
      selected
      sx={{
        mx: 2,
        mt: 1,
      }}
    >
      <ListItemAvatar
        sx={{
          minWidth: 44,
        }}
      >
        <Avatar
          alt="Profile Picture"
          sx={{
            width: 36,
            height: 36,
            backgroundColor: "primary.main",
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={email}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.2,
          width: 220,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        secondaryTypographyProps={{
          fontSize: 13,
          lineHeight: 1.2,
          color: "text.secondary",
          fontWeight: 400,
          width: 220,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      />
    </ListItemButton>
  );
};
