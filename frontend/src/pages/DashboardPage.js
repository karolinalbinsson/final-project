import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { getUserProjects, user } from '../reducers/user';
import Card from '../lib/Card';
import ProjectEditDialog from '../components/ProjectEditDialog';
import ProjectCreateDialog from '../components/ProjectCreateDialog';
import SnackBarComponent from 'lib/SnackBarComponent';
import Navigation from '../lib/Navigation';
import { useMainStyles } from '../styles/Styles';
import BackdropLoader from '../lib/BackdropLoader';

const DashboardPage = () => {
  const classes = useMainStyles();
  const userId = useSelector(store => store.user.login.userId);
  const projects = useSelector(store => store.user.project.createdProjects);

  const numberOfInvitedUsers = useSelector(
    store => store.user.project.invitedUsers
  );
  const isDialogCreateOpen = useSelector(
    store => store.user.login.isDialogCreateOpen
  );
  const isDialogEditOpen = useSelector(
    store => store.user.login.isDialogEditOpen
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserProjects());
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (numberOfInvitedUsers !== 0) {
      dispatch(getUserProjects());
    }
  }, [numberOfInvitedUsers, dispatch]);

  useEffect(() => {
    dispatch(user.actions.setLastCreatedProjectId(null));
    dispatch(user.actions.setLastUpdatedProjectId(null));
    dispatch(user.actions.setDeletedProjects(null));
  }, [dispatch, projects]);

  return (
    <div className={classes.root}>
      <Navigation pageHeader="Dashboard" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <SnackBarComponent />
            <BackdropLoader />
            {projects && (
              <>
                {projects.map(project => (
                  <Grid item xs={12} md={6} lg={3} key={project._id}>
                    <Card
                      creator={project.creator.name}
                      linkTo={`/project/${project._id}`}
                      projectId={project._id}
                      projectTitle={project.projectName}
                      createdAt={moment(project.createdAt).fromNow()}
                      shortDescription={project.projectShortDescription}
                      longDescription={project.projectLongDescription}
                      imageUrl={project.image.imageUrl}
                      invitedUsersEmail={project.invitedUsersEmail}
                      usersInvited={project.usersInvited}
                    />
                  </Grid>
                ))}
              </>
            )}

            {isDialogEditOpen && <ProjectEditDialog />}
            {isDialogCreateOpen && <ProjectCreateDialog />}
          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default DashboardPage;
