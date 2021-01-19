import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { user } from './reducers/user';
import { ui } from './reducers/ui';
import HomePage from './pages/HomePage';
import Dashboard from './components/Dashboard';
import FormPage from './pages/FormPage';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';

const reducer = combineReducers({ user: user.reducer, ui: ui.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/loginForm">
            <FormPage />
          </Route>
          <Route exact path="/login">
            <LogInForm />
          </Route>
          <Route exact path="/signUp">
            <SignUpForm />
          </Route>

          {/* <Route exact path="/error">
					<Error />
				</Route>
				<Redirect to="/error" /> */}
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

//vill vi ha olika routes beroende på login formulär eller signup formulär?
