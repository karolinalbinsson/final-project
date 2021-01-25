import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getSingleProject } from '../reducers/user';
import ProjectLarge from '../components/ProjectLarge';

const ProjectPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(store => store.user.project.singleProject);
  console.log(project);

  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [projectId, dispatch]);

  return (
    <>
      {project && (
        <ProjectLarge
          projectId={project[0]._id}
          projectTitle={project[0].projectName}
          //createdAt={moment(project.createdAt).format('dddd, MMMM Do YYYY')}
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
export default ProjectPage;
