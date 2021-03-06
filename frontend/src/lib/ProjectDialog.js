import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DropzoneArea } from 'material-ui-dropzone';

import {
  updateProject,
  getSingleProject,
  createNewProject,
} from '../reducers/user';
import { useFormProjectStyles } from '../styles/Styles';

const ProjectDialog = ({ dialogTitle, toggleDialog, mode, open }) => {
  const singleProject = useSelector(store => store.user.project.singleProject);
  const dispatch = useDispatch();
  const classes = useFormProjectStyles();

  const [projectName, setProjectName] = useState(
    singleProject ? singleProject.projectName : ''
  );
  const [projectShortDescription, setProjectShortDescription] = useState(
    singleProject ? singleProject.projectShortDescription : ''
  );
  const [projectLongDescription, setProjectLongDescription] = useState(
    singleProject ? singleProject.projectLongDescription : ''
  );
  const [file, setFile] = useState('');

  const handleEditSubmit = () => {
    dispatch(
      updateProject(
        projectName,
        projectShortDescription,
        projectLongDescription,
        singleProject._id
      )
    );
    setProjectName('');
    setProjectShortDescription('');
    setProjectLongDescription('');
    toggleDialog();
    dispatch(getSingleProject(singleProject._id));
  };

  const handleCreateSubmit = () => {
    dispatch(
      createNewProject(
        projectName,
        projectShortDescription,
        projectLongDescription,
        file
      )
    );
    setProjectName('');
    setProjectShortDescription('');
    setProjectLongDescription('');
    toggleDialog();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => toggleDialog()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
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
            {mode !== 'edit' && (
              <DropzoneArea
                maxFileSize={8000000}
                onChange={files => setFile(files)}
              />
            )}
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
            onClick={mode === 'edit' ? handleEditSubmit : handleCreateSubmit}
            disabled={!projectName}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ProjectDialog;
