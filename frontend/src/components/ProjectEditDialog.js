import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user, getSingleProject } from '../reducers/user';
import ProjectDialog from '../lib/ProjectDialog';

const ProjectEditDialog = () => {
  const dispatch = useDispatch();
  const singleProject = useSelector(store => store.user.project.singleProject);

  const singleProjectId = useSelector(
    store => store.user.project.singleProjectId
  );

  const isDialogEditOpen = useSelector(
    store => store.user.login.isDialogEditOpen
  );

  const toggleDialog = () => {
    dispatch(user.actions.toggleEditDialog());
  };

  useEffect(() => {
    if (singleProjectId != null) {
      dispatch(getSingleProject(singleProjectId));
    }
  }, [singleProjectId, dispatch]);

  return (
    <>
      {singleProject && (
        <ProjectDialog
          mode="edit"
          dialogTitle="Edit project"
          toggleDialog={toggleDialog}
          open={isDialogEditOpen}
        />
      )}
    </>
  );
};
export default ProjectEditDialog;
