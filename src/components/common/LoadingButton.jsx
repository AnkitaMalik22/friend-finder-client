import { Button, CircularProgress } from '@mui/material';

const LoadingButton = ({ loading, children, ...props }) => (
  <Button disabled={loading} {...props}>
    {loading ? <CircularProgress size={24} /> : children}
  </Button>
);

export default LoadingButton;