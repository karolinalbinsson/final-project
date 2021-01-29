import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateProject, user, getSingleProject } from '../reducers/user';
import { useFormProjectStyles } from '../styles/Styles';
import ProjectDialog from '../lib/ProjectDialog';

const ProjectEditDialog = () => {
  const classes = useFormProjectStyles();
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);

  const singleProject = useSelector(store => store.user.project.singleProject);

  const singleProjectId = useSelector(
    store => store.user.project.singleProjectId
  );
  console.log('singId', singleProjectId);

  const isDialogEditOpen = useSelector(
    store => store.user.login.isDialogEditOpen
  );
  console.log(isDialogEditOpen);

  //different dispatch depending on if I click edit or create project
  const toggleDialog = () => {
    dispatch(user.actions.toggleEditDialog());
    dispatch(user.actions.setSingleProjectId(null));
  };

  useEffect(() => {
    dispatch(getSingleProject(singleProjectId));
  }, [singleProjectId]);

  return (
    <>
      {singleProject && (
        <ProjectDialog
          mode="edit"
          dialogTitle="Edit project"
          toggleDialog={toggleDialog}
          open={isDialogEditOpen}
          //singleProject={singleProject}
        />
      )}
    </>
  );
};
export default ProjectEditDialog;
