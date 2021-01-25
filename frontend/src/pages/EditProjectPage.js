import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditProject from '../components/EditProject';

const EditProjectPage = () => {
  // const project = useSelector(store => store.user.project.singleProject);
  // console.log({ project });

  //const { projectId } = useParams();

  return <EditProject />;
};
export default EditProjectPage;
