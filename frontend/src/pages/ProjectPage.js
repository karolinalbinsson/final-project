import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getSingleProject } from '../reducers/user';

const ProjectPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(store => store.user.project.singleProject);
  console.log(project);

  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [projectId, dispatch]);

  return <div>This is the projectDetail page</div>;
};
export default ProjectPage;
