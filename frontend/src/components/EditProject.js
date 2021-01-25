import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { getSingleProject, user } from 'reducers/user';
import { updateProject } from '../reducers/user';
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditProject = ({
  projectTitle,
  createdAt,
  description,
  projectId,
  longDescription,
  usersInvited,
  creator,
  updatedAt,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //const projectId = useParams();
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  // const project = useSelector(store => store.user.project.singleProject);
  // console.log({ project });
  // // const projectId = useSelector(
  // //   store => store.user.project.singleProject[0]._id
  // // );
  const updatedProjectId = useSelector(
    store => store.user.project.lastUpdatedProjectId
  );

  const [projectName, setProjectName] = useState(projectTitle);
  //console.log(projectName);
  const [projectShortDescription, setProjectShortDescription] = useState(
    description
  );
  const [projectLongDescription, setProjectLongDescription] = useState(
    longDescription
  );
  //const [projectId, setProjectId] = useState(project[0]._id);
  // useEffect(() => {
  //   dispatch(getSingleProject(projectId));
  // }, [dispatch]);

  const handleSubmit = event => {
    event.preventDefault();
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
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create project
        </Typography>
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!projectName}
            //onClick={handleSubmit}
          >
            Save project
          </Button>
        </form>
      </div>
      {/*projectID && <Link to={`/project/${projectID}`}>View the project!</Link>*/}
      {updatedProjectId && <Redirect to={`/dashboard`} />}
    </Container>
  );
};
export default EditProject;
