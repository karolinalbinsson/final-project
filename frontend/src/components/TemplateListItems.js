import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout, user } from '../reducers/user';
import CreateProject from '../Delete/CreateProject';

const TemplateListItems = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCreate = () => {
    console.log('in handleCreate');
    dispatch(user.actions.toggleCreateDialog());
  };

  const handleLogOut = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <>
      <div>
        <ListItem button onClick={() => history.push('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={() => handleCreate()}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create project" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My profile" />
        </ListItem>

        <ListItem button onClick={() => handleLogOut()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </div>
    </>
  );
};
export default TemplateListItems;
