import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import EditProject from './EditProject';
import { user, getSingleProject } from '../reducers/user';

const EditProjectPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(store => store.user.project.singleProject);

  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch(user.actions.setLastUpdatedProjectId(null));
  }, [dispatch]);

  return (
    <>
      {project && (
        <EditProject
          projectId={project[0]._id}
          projectTitle={project[0].projectName}
          createdAt={moment(project[0].createdAt).fromNow()}
          description={project[0].projectShortDescription}
          longDescription={project[0].projectLongDescription}
          usersInvited={project[0].usersInvited}
          creator={project[0].creator.name}
          updatedAt={moment(project[0].updatedAt).fromNow()}
        />
      )}
    </>
  );
};
export default EditProjectPage;
