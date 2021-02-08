import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user } from '../reducers/user';
import ProjectDialog from '../lib/ProjectDialog';

const ProjectCreateDialog = () => {
  const dispatch = useDispatch();
  const isDialogCreateOpen = useSelector(
    store => store.user.login.isDialogCreateOpen
  );

  const toggleDialog = () => {
    dispatch(user.actions.toggleCreateDialog());
  };

  return (
    <ProjectDialog
      mode="create"
      dialogTitle="Create project"
      toggleDialog={toggleDialog}
      open={isDialogCreateOpen}
    />
  );
};
export default ProjectCreateDialog;
