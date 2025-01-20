import { Paper, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
export const FormCardLayout = ({
  title = null,
  children,
  childrenStyle = {},
  parentStyle = {},
}) => {
  return (
    <Paper
      variant="shadow"
      sx={{
        p: '24px',
        gap: '24px',
        display: { xs: 'block', md: 'flex' },
        justifyContent: 'space-between',
        borderRadius: '16px',
        ...parentStyle,
      }}
      elevation={0}
    >
      {/* flex={1} */}
      {title && (
        <Stack mb="16px" width="257px">
          <Typography fontSize="18px" fontWeight={500}>
            {title}
          </Typography>
        </Stack>
      )}
      <Stack flex={2} gap="12px" sx={childrenStyle}>
        {children}
      </Stack>
    </Paper>
  );
};

FormCardLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  childrenStyle: PropTypes.object,
  parentStyle: PropTypes.object,
};
