import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { updateProject, user, getUserProjects } from '../reducers/user';
import { useFormProjectStyles } from '../styles/Styles';

const EditProject = ({
  projectTitle,
  description,
  projectId,
  longDescription,
}) => {
  const classes = useFormProjectStyles();
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const updatedProjectId = useSelector(
    store => store.user.project.lastUpdatedProjectId
  );
  const isDialogeOpen = useSelector(store => store.user.login.isDialogOpen);

  const [projectName, setProjectName] = useState(projectTitle);
  const [projectShortDescription, setProjectShortDescription] = useState(
    description
  );
  const [projectLongDescription, setProjectLongDescription] = useState(
    longDescription
  );

  const toggleDialog = () => {
    dispatch(user.actions.toggleDialog());
  };

  const handleSubmit = () => {
    dispatch(
      updateProject(
        projectName,
        projectShortDescription,
        projectLongDescription,
        projectId
      )
    );
    setProjectName('');
    setProjectShortDescription('');
    setProjectLongDescription('');
    toggleDialog();
    dispatch(getUserProjects());
  };

  return (
    <div>
      <Dialog
        open={isDialogeOpen}
        onClose={() => toggleDialog()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit project</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={projectName}
                  onChange={event => setProjectName(event.target.value)}
                  //autoComplete="fname"
                  name="projectTitle"
                  variant="outlined"
                  required
                  fullWidth
                  id="projectTitle"
                  label="Project Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={projectShortDescription}
                  onChange={event =>
                    setProjectShortDescription(event.target.value)
                  }
                  //autoComplete="fname"
                  name="shortDescription"
                  variant="outlined"
                  fullWidth
                  minLength="5"
                  maxLength="100"
                  id="shortDescription"
                  label="Short description"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={projectLongDescription}
                  onChange={event =>
                    setProjectLongDescription(event.target.value)
                  }
                  //autoComplete="fname"
                  name="longDescription"
                  variant="outlined"
                  multiline
                  rows={6}
                  fullWidth
                  minLength="5"
                  maxLength="500"
                  id="longDescription"
                  label="Long description"
                />
              </Grid>
            </Grid>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => toggleDialog()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            //onClick={() => handleSubmit()}
            onClick={handleSubmit}
            //className={classes.submit}
            disabled={!projectTitle}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {updatedProjectId && <Redirect to={`/dashboard`} />}
    </div>
  );
};
export default EditProject;
