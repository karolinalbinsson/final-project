import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Nav from '../lib/Nav';
//import ProjectThumb from '../components/ProjectThumb';
import { getUserProjects, user } from '../reducers/user';
import Card from '../lib/Card';

const DashboardPage = () => {
  const userId = useSelector(store => store.user.login.userId);
  const projects = useSelector(store => store.user.project.createdProjects);
  const numberOfInvitedUsers = useSelector(
    store => store.user.project.invitedUsers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserProjects());
      dispatch(user.actions.setSingleProject([]));
    }
  }, [userId, dispatch]);

  //to close snackbar when we rerender get all projects
  //första inbjudan visar snackbar sidan laddas om och snackbar försvinner.
  //Om jag bjuder in en till visas inte snackbar
  useEffect(() => {
    if (numberOfInvitedUsers !== 0) {
      dispatch(getUserProjects());
    }
  }, [numberOfInvitedUsers, dispatch]);

  useEffect(() => {
    dispatch(user.actions.setLastCreatedProjectId(null));
    dispatch(user.actions.setLastUpdatedProjectId(null));
    dispatch(user.actions.setDeletedProjects(null));
  }, [dispatch]);

  return (
    <>
      <Nav />
      {/* {projects.map(project => (
        <ProjectThumb
          key={project._id}
          projectId={project._id}
          projectTitle={project.projectName}
          createdAt={moment(project.createdAt).format('dddd, MMMM Do YYYY')}
          shortDescription={project.projectShortDescription}
          longDescription={project.projectLongDescription}
        />
      ))} */}

      {projects.map(project => (
        <Card
          key={project._id}
          creator={project.creator.name}
          linkTo={`/project/${project._id}`}
          projectId={project._id}
          projectTitle={project.projectName}
          createdAt={moment(project.createdAt).format('dddd, MMMM Do YYYY')}
          shortDescription={project.projectShortDescription}
          longDescription={project.projectLongDescription}
        />
      ))}
    </>
  );
};
export default DashboardPage;
