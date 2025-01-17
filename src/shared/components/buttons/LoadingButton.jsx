import { Button, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

export const LoadingButton = ({ children, loading = false, ...rest }) => {
  return (
    <Button variant="contained" type="submit" disabled={loading} {...rest}>
      {loading && <CircularProgress size={20} />}
      {children}
    </Button>
  );
};

LoadingButton.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};
