import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = ({
  open,
  handleClose,
  handleDelete,
  projectName,
  projectId,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete project'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{projectName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            variant="outlined"
            color="secondary"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete()}
            variant="contained"
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
