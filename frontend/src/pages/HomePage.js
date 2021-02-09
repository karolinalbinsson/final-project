import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LogInForm from '../components/LogInForm';
import SignUpForm from '../components/SignUpForm';
import ProjectPage from './ProjectPage';
import DashboardPage from './DashboardPage';
import ProfilePage from './ProfilePage';
import SnackBarComponent from 'lib/SnackBarComponent';

const HomePage = () => {
  const accessToken = useSelector(store => store.user.login.accessToken);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/logIn" />
        </Route>
        <Route exact path="/logIn">
          {accessToken ? <Redirect to="/dashboard/" /> : <LogInForm />}
        </Route>
        <Route exact path="/signUp">
          {accessToken ? <Redirect to="/dashboard/" /> : <SignUpForm />}
        </Route>
        <Route exact path="/dashboard/">
          {!accessToken ? <Redirect to="/logIn" /> : <DashboardPage />}
        </Route>
        <Route exact path="/project/:projectId">
          <ProjectPage />
        </Route>
        <Route exact path="/myProfile/">
          <ProfilePage />
        </Route>
      </Switch>
      <SnackBarComponent />
    </BrowserRouter>
  );
};
export default HomePage;
