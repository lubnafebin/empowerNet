import { Box, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import EmptyDataDark from '../../../assets/empty_data_dark_64x64.png';
import EmptyDataLight from '../../../assets/empty_data_light_64x64.png';

export const EmptyDataPlaceholder = ({
  label,
  minHeight = 200,
  size = '32px',
  fontSize = '12px',
}) => {
  const theme = useTheme();
  return (
    <Stack
      pt={2}
      px={2}
      gap={1}
      width="100%"
      alignItems="center"
      justifyContent="center"
      minHeight={minHeight}
    >
      <Box
        component="img"
        src={theme.palette.mode === 'light' ? EmptyDataDark : EmptyDataLight}
        height={size}
        width={size}
        alt={label + ' placeholder'}
      />
      <Typography variant="subtitle1" color="textSecondary" fontSize={fontSize}>
        {label}
      </Typography>
    </Stack>
  );
};

EmptyDataPlaceholder.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
