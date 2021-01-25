import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Nav from '../lib/Nav';
import ProjectThumb from '../components/ProjectThumb';
import { getUserProjects, user } from '../reducers/user';
//import SnackBar from '../lib/SnackBar';

const DashboardPage = () => {
  //const { userId } = useParams();
  const userId = useSelector(store => store.user.login.userId);
  const projects = useSelector(store => store.user.project.createdProjects);
  //const errorMessage = useSelector(store => store.user.login.errorMessage);
  // const invitedUserEmail = useSelector(
  //   store => store.user.project.invitedUserEmail
  // );

  const numberOfInvitedUsers = useSelector(
    store => store.user.project.invitedUsers
  );
  //console.log(numberOfInvitedUsers);
  // const [openSnackBar, setOpenSnackBar] = useState(false);
  // console.log({ openSnackBar });

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserProjects());
      console.log('dashboard rerender');
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
    //console.log('i useeffect');
    dispatch(user.actions.setLastCreatedProjectId(null));
    dispatch(user.actions.setLastUpdatedProjectId(null));
    dispatch(user.actions.setDeletedProjects(null));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('reset last invitedUserEmail');
  //   dispatch(user.actions.setLastInvitedUserEmail(null));
  // }, [dispatch]);

  return (
    <>
      <Nav />
      {projects.map(project => (
        <ProjectThumb
          key={project._id}
          projectId={project._id}
          projectTitle={project.projectName}
          createdAt={moment(project.createdAt).format('dddd, MMMM Do YYYY')}
          shortDescription={project.projectShortDescription}
          longDescription={project.projectLongDescription}
        />
      ))}
      {/* {invitedUserEmail && ( */}
      {/* <SnackBar
        severity="success"
        message={`Successfully invited: ${invitedUserEmail}`}
        openIn={openSnackBar}
      /> */}
      {/* )} */}

      {/* {errorMessage && ( */}
      {/* <SnackBar
        severity="error"
        message={errorMessage}
        openIn={!openSnackBar}
      /> */}
      {/* )} */}
    </>
  );
};
export default DashboardPage;
