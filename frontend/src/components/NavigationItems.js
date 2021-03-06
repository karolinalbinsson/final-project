import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout, user } from '../reducers/user';

const NavigationItems = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = history.location.pathname;

  const handleCreate = () => {
    if (location !== '/dashboard') {
      history.push('/dashboard');
    }
    dispatch(user.actions.resetSingleProject());
    dispatch(user.actions.toggleCreateDialog());
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
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

      <ListItem button onClick={() => history.push('/myProfile')}>
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
  );
};
export default NavigationItems;
