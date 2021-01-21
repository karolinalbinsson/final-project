import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Nav from '../lib/Nav';
import { getUserProject } from '../reducers/user';

const DashboardPage = () => {
  //const { userId } = useParams();
  const userId = useSelector(store => store.user.login.userId);
  const projects = useSelector(store => store.user.project.createdProjects);
  console.log('dashboardPage', userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserProject());
    }
  }, [userId]);

  return (
    <>
      <Nav />
      <section>
        {projects.map(project => (
          <p>{project.projectName}</p>
        ))}
        <div>This is your dashboard</div>
      </section>
    </>
  );
};
export default DashboardPage;
