import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import LogInForm from '../components/LogInForm';
import SignUpForm from '../components/SignUpForm';
import DashboardPage from './DashboardPage';
import ProjectPage from './ProjectPage';
import CreateProjectPage from './CreateProjectPage';
import EditProjectPage from './EditProjectPage';
import TemplatePage from './TemplatePage';

const HomePage = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  const accessToken = useSelector(store => store.user.login.accessToken);

  return (
    // <ThemeProvider theme={theme}>
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
          <TemplatePage />
        </Route>
        <Route exact path="/project/:projectId">
          <ProjectPage />
        </Route>
        <Route exact path="/createproject/">
          <CreateProjectPage />
        </Route>
        <Route exact path="/editproject/:projectId">
          <EditProjectPage />
        </Route>
      </Switch>
    </BrowserRouter>
    //</ThemeProvider>
  );
};
export default HomePage;
