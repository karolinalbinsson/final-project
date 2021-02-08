import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, user } from '../reducers/user';
//import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { StoreOutlined } from '@material-ui/icons';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const invitedUserEmail = useSelector(
    store => store.user.project.invitedUserEmail
  );
  // console.log(invitedUserEmail);

  //	const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const snackBarMessage = useSelector(
    store => store.user.project.snackBarMessage
  );
  const open = useSelector(store => store.user.project.snackBarOpen);
  const severity = useSelector(store => store.user.project.snackBarSeverity);

  // console.log("Is snackbar open:?", { open });

  const handleClose = (event, reason) => {
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
