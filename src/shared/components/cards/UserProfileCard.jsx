import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useAppStateContext } from '../../hooks';

export const UserProfileCard = () => {
  const {
    appState: { authentication },
  } = useAppStateContext();
  const { firstName, lastName, emailAddress } = authentication.user;
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
            backgroundColor: 'primary.main',
          }}
        >
          {firstName[0]?.toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={firstName + ' ' + lastName}
        secondary={emailAddress}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.2,
          width: 220,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        secondaryTypographyProps={{
          fontSize: 13,
          lineHeight: 1.2,
          color: 'text.secondary',
          fontWeight: 400,
          width: 220,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      />
    </ListItemButton>
  );
};
