import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  updateProject,
  user,
  getSingleProject,
  createNewProject,
  getUserProjects,
} from '../reducers/user';
import { useFormProjectStyles } from '../styles/Styles';

const ProjectDialog = () => {
  const classes = useFormProjectStyles();
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const isDialogCreateOpen = useSelector(
    store => store.user.login.isDialogCreateOpen
  );
  const isDialogEditOpen = useSelector(
    store => store.user.login.isDialogEditOpen
  );
  const isDialogOpen = useSelector(store => store.user.login.isDialogOpen);

  const singleProjectId = useSelector(
    store => store.user.project.singleProjectId
  );
  console.log('singId', singleProjectId);
  const singleProject = useSelector(store => store.user.project.singleProject);
  console.log('ett projekt', singleProject);

  //Predefined value if edit, empty value if create
  const [projectName, setProjectName] = useState(
    singleProject ? singleProject.projectName : ''
  );
  const [projectShortDescription, setProjectShortDescription] = useState(
    singleProject ? singleProject.projectShortDescription : ''
  );
  const [projectLongDescription, setProjectLongDescription] = useState(
    singleProject ? singleProject.projectLongDescription : ''
  );

  //different dispatch depending on if I click edit or create project
  const toggleDialog = () => {
    dispatch(user.actions.toggleDialog());
    dispatch(user.actions.setSingleProjectId(null));
  };

  useEffect(() => {
    if (singleProjectId) {
      dispatch(getSingleProject(singleProjectId));
    }
  }, [singleProjectId]);

  const handleEditSubmit = () => {
    dispatch(
      updateProject(
        projectName,
        projectShortDescription,
        projectLongDescription,
        singleProjectId
      )
    );
    setProjectName('');
    setProjectShortDescription('');
    setProjectLongDescription('');
    toggleDialog();
    dispatch(getSingleProject(singleProjectId));
  };

  const handleCreateSubmit = () => {
    //event.preventDefault();
    dispatch(
      createNewProject(
        projectName,
        projectShortDescription,
        projectLongDescription
      )
    );
    setProjectName('');
    setProjectShortDescription('');
    setProjectLongDescription('');
    toggleDialog();
    dispatch(getUserProjects()); //kan detta bli ett problem timewise?
    //window.location.reload(); //är detta ok att göra?
  };

  return (
    <div>
      {singleProject ? (
        <Dialog
          open={isDialogOpen}
          onClose={() => toggleDialog()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit project</DialogTitle>
          <DialogContent>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={projectName}
                    onChange={event => setProjectName(event.target.value)}
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
              onClick={singleProjectId ? handleEditSubmit : handleCreateSubmit}
              disabled={!projectName}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={isDialogOpen}
          onClose={() => toggleDialog()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create project</DialogTitle>
          <DialogContent>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={projectName}
                    onChange={event => setProjectName(event.target.value)}
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
              onClick={singleProjectId ? handleEditSubmit : handleCreateSubmit}
              disabled={!projectName}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
export default ProjectDialog;
