import React, { useState } from 'react';
import { useSelector } from 'react-redux';

//import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

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

const SnackBar = ({ severity, message, openIn }) => {
  const classes = useStyles();

  const invitedUserEmail = useSelector(
    store => store.user.project.invitedUserEmail
  );
  console.log(invitedUserEmail);

  const errorMessage = useSelector(store => store.user.login.errorMessage);

  const [open, setOpen] = useState(openIn);
  console.log({ open });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default SnackBar;
