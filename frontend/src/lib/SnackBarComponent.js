import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { user } from '../reducers/user';
import { useSnackBarStyles } from '../styles/Styles';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackBar = () => {
  const classes = useSnackBarStyles();
  const dispatch = useDispatch();
  const snackBarMessage = useSelector(
    store => store.user.project.snackBarMessage
  );
  const open = useSelector(store => store.user.project.snackBarOpen);
  const severity = useSelector(store => store.user.project.snackBarSeverity);

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(user.actions.setSnackBarOpen(false));
  };

  useEffect(() => {
    'Render snackbar';
  }, []);

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default SnackBar;
