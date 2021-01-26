import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getSingleProject } from '../reducers/user';
import ProjectLarge from '../components/ProjectLarge';
import Card from '../lib/Card';

const ProjectPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(store => store.user.project.singleProject);
  const numberOfInvitedUsers = useSelector(
    store => store.user.project.invitedUsers
  );

  useEffect(() => {
    if (numberOfInvitedUsers !== 0) {
      dispatch(getSingleProject(projectId));
    }
  }, [numberOfInvitedUsers, dispatch]);

  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [projectId, dispatch]);

  return (
    <>
      {/* {project && (
        <ProjectLarge
          projectId={project[0]._id}
          projectTitle={project[0].projectName}
          createdAt={moment(project[0].createdAt).fromNow()}
          description={project[0].projectShortDescription}
          longDescription={project[0].projectLongDescription}
          usersInvited={project[0].usersInvited}
          creator={project[0].creator.name}
          updatedAt={moment(project[0].updatedAt).fromNow()}
        />
      )} */}
      {project && (
        <Card
          projectId={project[0]._id}
          projectTitle={project[0].projectName}
          createdAt={moment(project[0].createdAt).fromNow()}
          shortDescription={project[0].projectShortDescription}
          longDescription={project[0].projectLongDescription}
          usersInvited={project[0].usersInvited}
          creator={project[0].creator.name}
          updatedAt={moment(project[0].updatedAt).fromNow()}
        />
      )}
    </>
  );
};
export default ProjectPage;
