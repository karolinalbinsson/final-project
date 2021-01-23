import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Nav from '../lib/Nav';
import ProjectThumb from '../components/ProjectThumb';
import { getUserProjects, user } from '../reducers/user';
import SnackBar from '../lib/SnackBar';

const DashboardPage = () => {
  //const { userId } = useParams();
  const userId = useSelector(store => store.user.login.userId);
  const projects = useSelector(store => store.user.project.createdProjects);
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const invitedUserEmail = useSelector(
    store => store.user.project.invitedUserEmail
  );
  const numberOfInvitedUsers = useSelector(
    store => store.user.project.invitedUsers
  );
  //console.log(numberOfInvitedUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserProjects());
    }
  }, [userId, dispatch]);

  useEffect(() => {
    console.log('reset last invitedUserEmail');
    dispatch(user.actions.setLastInvitedUserEmail(null));
  }, []);

  //to close snackbar when we rerender get all projects
  //första inbjudan visar snackbar sidan laddas om och snackbar försvinner.
  //Om jag bjuder in en till visas inte snackbar
  useEffect(() => {
    if (numberOfInvitedUsers != 0) {
      console.log('in use effect');
      const timeout = setTimeout(() => {
        dispatch(getUserProjects());
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [numberOfInvitedUsers]);

  return (
    <>
      <Nav />
      {projects.map(project => (
        <ProjectThumb
          key={project._id}
          projectId={project._id}
          projectTitle={project.projectName}
          createdAt={moment(project.createdAt).format('dddd, MMMM Do YYYY')}
          description={project.projectDescription}
        />
      ))}
      {invitedUserEmail && (
        <SnackBar
          severity="success"
          message={`Successfully invited: ${invitedUserEmail}`}
        />
      )}
      {errorMessage && <SnackBar severity="error" message={errorMessage} />}
    </>
  );
};
export default DashboardPage;
